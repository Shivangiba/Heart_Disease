import streamlit as st
import numpy as np
import pickle
import time

with open("assets/bg.css") as f:
    st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

model = pickle.load(open("cardio_model.pkl", "rb"))
scaler = pickle.load(open("scaler.pkl", "rb"))

st.markdown("<div class='glass'><h2>🩺 Health Assessment</h2></div>", unsafe_allow_html=True)

col1, col2 = st.columns(2)

with col1:
    age = st.number_input("Age", 1, 120)
    height = st.number_input("Height (cm)", min_value=50.0)
    weight = st.number_input("Weight (kg)", min_value=10.0)
    ap_hi = st.number_input("Systolic BP")
    ap_lo = st.number_input("Diastolic BP")

with col2:
    gender = st.selectbox("Gender", [1, 2])
    chol = st.selectbox("Cholesterol", [1, 2, 3])
    gluc = st.selectbox("Glucose", [1, 2, 3])
    smoke = st.selectbox("Smoking", [0, 1])
    alco = st.selectbox("Alcohol", [0, 1])
    active = st.selectbox("Physically Active", [0, 1])

if st.button("🔍 Analyze Risk"):
    with st.spinner("Analyzing your health data..."):
        time.sleep(2)

        bmi = weight / ((height / 100) ** 2)
        bp_diff = ap_hi - ap_lo

        data = np.array([[age, gender, height, weight,
                          ap_hi, ap_lo, chol, gluc,
                          smoke, alco, active, bmi, bp_diff]])

        data_scaled = scaler.transform(data)
        result = model.predict(data_scaled)

    if result[0] == 1:
        st.error("⚠️ High Risk Detected")
        st.progress(85)
    else:
        st.success("✅ Low Risk Detected")
        st.progress(25)
