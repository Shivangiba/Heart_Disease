# Deploying to Render Guide

Follow these steps to deploy your Heart Disease Prediction app.

## 1. Push Code to GitHub
Ensure all your files (including the new `requirements.txt`) are pushed to a GitHub repository.

## 2. Deploy Backend (FastAPI)
1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New+** > **Web Service**.
2. Connect your GitHub repository.
3. Configure the service:
   - **Name**: `cardio-backend` (or your choice)
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn server:app --host 0.0.0.0 --port $PORT`
4. Click **Create Web Service**.
5. Once deployed, **copy the URL** (e.g., `https://cardio-backend.onrender.com`).

## 3. Deploy Frontend (React/Vite)
1. In Render Dashboard, click **New+** > **Static Site**.
2. Connect the same GitHub repository.
3. Configure the site:
   - **Name**: `cardio-frontend` (or your choice)
   - **Build Command**: `npm install && npm run build` (Run this in the `web-ui` directory or set **Root Directory** to `web-ui`)
   - **Publish Directory**: `dist` (if Root Directory is `web-ui`) or `web-ui/dist`
4. **Environment Variables**:
   - Add a variable: `VITE_API_URL`
   - Value: The Backend URL you copied (e.g., `https://cardio-backend.onrender.com`)
5. Click **Create Static Site**.

## 4. Final Polish
Wait for both to deploy. Your frontend will now communicate with your backend automatically!
