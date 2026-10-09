# 🚀 Permanent 24/7 Deployment Guide

This guide provides simple, step-by-step instructions to permanently deploy your **Academic Performance Management System** (both Frontend and Backend) online for free.

---

## 🌟 Method 1: Render (Recommended — Full Stack Free Tier)

[Render](https://render.com) can host both your **Backend API** and your **Frontend Web App** permanently.

### Step 1: Deploy the Backend (Node.js & SQLite)

1. Sign up / Log in to [render.com](https://render.com) using your GitHub account.
2. Click **New +** → **Web Service**.
3. Select your repository: **`KornipatiAkash-1969/Academic-Performance-Management-System`**.
4. Configure the service:
   * **Name**: `academic-performance-backend`
   * **Root Directory**: `backend`
   * **Runtime**: `Node`
   * **Build Command**: `npm install`
   * **Start Command**: `node server.js`
   * **Instance Type**: `Free`
5. Click **Advanced** → **Add Environment Variable**:
   * `JWT_SECRET` = `studentperformancejwtsecret_production_key`
   * `NODE_ENV` = `production`
6. Click **Create Web Service**.
7. Once deployed, Render will provide a permanent backend URL, for example:
   ```text
   https://academic-performance-backend.onrender.com
   ```

---

### Step 2: Deploy the Frontend (React Web App)

1. In Render, click **New +** → **Static Site**.
2. Select your repository: **`KornipatiAkash-1969/Academic-Performance-Management-System`**.
3. Configure the static site:
   * **Name**: `academic-performance-app`
   * **Root Directory**: `frontend`
   * **Build Command**: `npm install && npm run build`
   * **Publish Directory**: `build`
4. In **Environment Variables**, add:
   * **Key**: `REACT_APP_API_URL`
   * **Value**: `https://academic-performance-backend.onrender.com/api` *(use your backend URL from Step 1)*
5. Click **Create Static Site**.
6. Render will generate your permanent live website URL, for example:
   ```text
   https://academic-performance-app.onrender.com
   ```

---

## ⚡ Method 2: Vercel (Frontend) + Render (Backend)

Vercel provides ultra-fast global CDN hosting for React.

### Step 1: Deploy Frontend on Vercel
1. Sign up / Log in to [vercel.com](https://vercel.com) with GitHub.
2. Click **Add New…** → **Project**.
3. Import **`Academic-Performance-Management-System`**.
4. In **Root Directory**, click edit and select **`frontend`**.
5. Under **Environment Variables**:
   * **Name**: `REACT_APP_API_URL`
   * **Value**: `https://academic-performance-backend.onrender.com/api` *(your Render backend URL)*
6. Click **Deploy**.
7. Your app will be live at `https://academic-performance-management-system.vercel.app`!

---

## ⚙️ Configuration Files Already Included in the Repository

The repository already includes all necessary configuration files:
- `render.yaml` — Blueprint for 1-click Render setup.
- `frontend/vercel.json` — Pre-configured SPA rewrite rules for Vercel.
- `frontend/public/_redirects` — Pre-configured SPA routing for Netlify.
- `backend/server.js` — Auto-detects port, CORS, and production builds.
- `.gitignore` — Protects dependencies and cache files.
