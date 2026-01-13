import os
import pickle
import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Load local environment variables
load_dotenv()

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Model & Scaler
model = pickle.load(open("cardio_model.pkl", "rb"))
scaler = pickle.load(open("scaler.pkl", "rb"))

class PatientData(BaseModel):
    age: float
    gender: int
    height: float
    weight: float
    ap_hi: float
    ap_lo: float
    cholesterol: int
    gluc: int
    smoke: int
    alco: int
    active: int

@app.post("/predict")
async def predict(data: PatientData):
    # Derived features
    bmi = data.weight / ((data.height / 100) ** 2)
    bp_diff = data.ap_hi - data.ap_lo
    
    # Format input for model
    input_data = np.array([[
        data.age,
        data.gender,
        data.height,
        data.weight,
        data.ap_hi,
        data.ap_lo,
        data.cholesterol,
        data.gluc,
        data.smoke,
        data.alco,
        data.active,
        bmi,
        bp_diff
    ]])
    
    # Scale and predict
    input_scaled = scaler.transform(input_data)
    prediction = int(model.predict(input_scaled)[0])
    
    # Get probability if model supports it
    try:
        probability = model.predict_proba(input_scaled)[0][1]
    except AttributeError:
        # Fallback if no predict_proba (like some SVAs)
        # Note: LogisticRegression has predict_proba
        decision = model.decision_function(input_scaled)[0]
        probability = 1 / (1 + np.exp(-decision)) # Sigmoid

    # Simplified feature importance for the UI chart
    # We'll use the model coefficients (since it's Logistic Regression)
    # This is a bit of a hack but works well for UI visualization
    coeffs = model.coef_[0]
    features = [
        "Age", "Gender", "Height", "Weight", "Ap_Hi", "Ap_Lo",
        "Chol", "Gluc", "Smoke", "Alco", "Active", "BMI", "BP_Diff"
    ]
    
    # Calculate contribution (coeff * scaled_value)
    contributions = coeffs * input_scaled[0]
    
    # Normalize contributions for a "nice" chart (percentage of total absolute contribution)
    abs_contributions = np.abs(contributions)
    total_abs = np.sum(abs_contributions)
    normalized_importance = [
        {"feature": feat, "importance": round((abs_cont / total_abs) * 100, 2), "impact": "Positive" if cont > 0 else "Negative"}
        for feat, abs_cont, cont in zip(features, abs_contributions, contributions)
    ]
    
    # Sort by importance
    normalized_importance = sorted(normalized_importance, key=lambda x: x["importance"], reverse=True)[:5]

    return {
        "prediction": prediction,
        "probability": round(float(probability) * 100, 2),
        "importance": normalized_importance
    }

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
