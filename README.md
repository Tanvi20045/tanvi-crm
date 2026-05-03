# 🏢 Real Estate CRM System

A full-stack **Real Estate CRM (Customer Relationship Management) system** built to manage leads, properties, clients, deals, and analytics in a single dashboard.

---

## 🌐 Live Project Links

### 🚀 Frontend (Website)
https://tanvi-crm.vercel.app/

### ⚙️ Backend (API Server)
https://tanvi-crm.onrender.com/

### 🔗 API Base URL
https://tanvi-crm.onrender.com

---

## 📌 Features

### 🔑 Lead Management
- Capture leads from multiple sources
- Store lead details (name, phone, email, budget, preferences)
- Track lead status (New, Contacted, Qualified, Closed, Lost)
- Assign leads to agents
- Follow-up tracking system

---

### 🏠 Property Management
- Add / Edit / Delete property listings
- Store property details (location, price, size, amenities)
- Upload property images
- Filter and search properties
- Track availability status (Available / Sold / Rented)

---

### 👤 Client Management
- Maintain buyer/seller profiles
- Track interaction history
- Link clients with leads and properties
- Store client preferences

---

### 💰 Deal Management
- Track deals from inquiry to closure
- Pipeline stages: Negotiation → Agreement → Closed
- Commission tracking
- Document storage system

---

### 📊 Analytics Dashboard
- Total properties count
- Total property value calculation
- Charts using Chart.js:
  - Property price distribution (Bar Chart)
  - Location distribution (Pie Chart)

---

### 👨‍💼 Agent Management
- Role-based access control (Admin / Agent)
- Secure authentication (JWT)
- Agent activity tracking

---

## 🛠 Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- Chart.js

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📁 Project Structure
TANVI CRM/
│
├── 📁 server/ (Backend)
│   │
│   ├── 📁 config/
│   │   └── db.js
│   │
│   ├── 📁 middleware/
│   │   └── auth.js
│   │
│   ├── 📁 models/
│   │   ├── Lead.js
│   │   ├── Property.js
│   │   └── User.js
│   │
│   ├── 📁 routes/
│   │   ├── authRoutes.js
│   │   ├── leadRoutes.js
│   │   └── propertyRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
│
├── 📁 frontend/ (Client Side)
│   │
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   │
│   └── assets/
│       ├── images/
│       └── icons/
│
│
└── README.md


⚙️ Backend (server/)

This handles:

API (Express.js)
Database (MongoDB)
Authentication (JWT)
Routes (leads, properties, users)
🌐 Frontend (frontend/)

This handles:

UI (HTML/CSS)
Dashboard
Charts (Chart.js)
API calls to backend

| Part     | Platform      | Link                                                               |
| -------- | ------------- | ------------------------------------------------------------------ |
| Frontend | Vercel        | [https://tanvi-crm.vercel.app/](https://tanvi-crm.vercel.app/)     |
| Backend  | Render        | [https://tanvi-crm.onrender.com/](https://tanvi-crm.onrender.com/) |
| Database | MongoDB Atlas | Cloud DB                                                           |



API WORK FLOW

Frontend (Vercel)
      ↓
Calls API
      ↓
Backend (Render)
      ↓
MongoDB Atlas
      ↓
Returns Data → Frontend Charts/UI
