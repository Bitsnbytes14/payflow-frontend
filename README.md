# 💳 PayFlow Frontend (React + Vite)

A modern frontend dashboard for the PayFlow platform.
Allows merchants to register, manage payments, and track orders.

---

## 🏗️ Tech Stack

* **React (Vite)**
* **Axios**
* **Context API (Auth Management)**
* **TailwindCSS / Custom UI**
* **Vercel (Deployment)**

---

## ✨ Features

* 🔐 Authentication (Login/Register)
* 📊 Dashboard Overview
* 💳 Create & Manage Payments
* 📦 Orders Tracking
* 🔗 Webhook Configuration
* ⚡ Fast UI with Vite

---

## 📁 Project Structure

```
src/
 ├── api/          # Axios config & API calls
 ├── context/      # Auth context
 ├── hooks/        # Custom hooks
 ├── pages/        # App pages
 ├── components/   # UI components
 └── App.jsx
```

---

## ⚙️ Environment Variables

Create `.env`:

```
VITE_API_URL=https://your-backend.onrender.com
```

---

## 🚀 Running Locally

```bash
npm install
npm run dev
```

---

## 🌐 API Integration

All requests go to:

```
${VITE_API_URL}/api
```

Example:

```
POST /api/auth/login
```

---

## 🚀 Deployment

* Hosted on **Vercel**
* Connected to backend on **Render**

---

## ⚠️ Routing Fix (Important)

Ensure `vercel.json` exists:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 📈 Future Improvements

* UI animations & polish
* Payment analytics dashboard
* Dark mode
* Mobile optimization

---

## 👨‍💻 Author

Built by **Mohammad Ahmad**

---
