import streamlit as st
import numpy as np
import pickle

# ===================== Load Model & Scaler =====================
model = pickle.load(open("cardio_model.pkl", "rb"))
scaler = pickle.load(open("scaler.pkl", "rb"))

# ===================== App UI =====================
st.title("❤️ Cardiovascular Disease Prediction")
st.write("Enter patient details to predict heart disease risk")

age = st.number_input("Age", 1, 120)
gender = st.selectbox("Gender (1: Male, 2: Female)", [1, 2])
height = st.number_input("Height (cm)", min_value=50.0)
weight = st.number_input("Weight (kg)", min_value=10.0)
ap_hi = st.number_input("Systolic Blood Pressure")
ap_lo = st.number_input("Diastolic Blood Pressure")

chol = st.selectbox(
    "Cholesterol (1: Normal, 2: Above Normal, 3: High)",
    [1, 2, 3]
)
gluc = st.selectbox(
    "Glucose (1: Normal, 2: Above Normal, 3: High)",
    [1, 2, 3]
)
smoke = st.selectbox("Smoking", [0, 1])
alco = st.selectbox("Alcohol Intake", [0, 1])
active = st.selectbox("Physically Active", [0, 1])

# ===================== Prediction =====================
if st.button("Predict"):
    # Feature engineering (MUST match training)
    bmi = weight / ((height / 100) ** 2)
    bp_diff = ap_hi - ap_lo

    # Order MUST be same as training
    input_data = np.array([[
        age,
        gender,
        height,
        weight,
        ap_hi,
        ap_lo,
        chol,
        gluc,
        smoke,
        alco,
        active,
        bmi,
        bp_diff
    ]])

    # Scale and predict
    input_scaled = scaler.transform(input_data)
    prediction = model.predict(input_scaled)

    if prediction[0] == 1:
        st.error("⚠️ High risk of cardiovascular disease")
    else:
        st.success("✅ Low risk of cardiovascular disease")
