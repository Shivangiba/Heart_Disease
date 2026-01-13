import streamlit as st

with open("assets/bg.css") as f:
    st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

st.markdown("""
<div class="glass">
<h2>📘 About This Project</h2>

<b>Problem:</b> Cardiovascular Disease Prediction  
<b>Model:</b> Logistic Regression  
<b>Accuracy:</b> ~72%  
<b>Tech Stack:</b> Python, Scikit-learn, Streamlit  

<h3>Why Logistic Regression?</h3>
<ul>
<li>Interpretable for medical use</li>
<li>Stable & fast</li>
<li>Well-suited for binary classification</li>
</ul>

<h3>Deployment</h3>
<p>
The trained ML model is deployed using Streamlit to provide
real-time predictions through an interactive UI.
</p>
</div>
""", unsafe_allow_html=True)
