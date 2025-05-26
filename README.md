# 🌤️ Weather App

A full-stack weather application built with **React** and **Express**, integrated with **OpenWeather API** to fetch real-time and historical weather data. All weather details are stored in a **MongoDB** database and can be filtered by city and date range.

---

## 🛠 Tech Stack

### 🌐 Frontend
- **React** — UI library
- **Redux Toolkit** — state management
- **Axios** — for API requests
- **Tailwind CSS** — for styling
- **Clear Folder Structure**:
  - `components/` — reusable UI components
  - `redux/` — slices & store configuration
  - `services/` — API logic
  - `utils/` — utility helpers

### 🌍 Backend
- **Node.js** with **Express** — REST API server
- **MongoDB** — database for storing weather data
- **Mongoose** — MongoDB ODM
- **OpenWeather API** — for fetching weather details

#### Backend Structure:
- `controllers/` — business logic
- `services/` — external API and DB interaction
- `routes/` — all route definitions
- `middlewares/` — error handling and validation
- `utils/` — helper functions
- `global error handler` — consistent error responses
- **Modular & Scalable File Structure**

---

## 💾 Features

- 🌤 **Real-time Weather Fetching** by city
- 🗂 **Stores Weather Data** in MongoDB
- 📆 **Weather History Table** with:
  - City-based filter
  - From-To date filter (max **30 days** range)
- 🧠 **Smart Data Insertion** to avoid duplicates
- 📉 **Responsive UI** for desktop & mobile

---


## 🔧 Setup Instructions

### 📦 Backend
cd server
npm install
node server.js

### 📦 Frontend
cd client
npm install
npm run dev
