import streamlit as st

st.set_page_config(page_title="CardioCare AI", layout="wide")

with open("assets/bg.css") as f:
    st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

st.markdown("""
<div class="glass">
    <h1>❤️ CardioCare AI</h1>
    <h3>AI-powered Cardiovascular Risk Prediction</h3>
    <p>
        A smart healthcare assistant that predicts heart disease risk
        using Machine Learning.
    </p>
</div>
""", unsafe_allow_html=True)

st.markdown("### 🚀 Navigate using the sidebar to begin")
