# Traffic Accident Prediction Project
# 🚦 Traffic Accident Prediction System

## 📌 Overview
This project is a full-stack machine learning web application that predicts the severity of traffic accidents based on various road and environmental conditions.

It combines a **React frontend**, **Flask backend**, and a **Machine Learning model** to deliver real-time predictions.

---

## 🎯 Features

- 🔮 Predict accident severity (Minor / Serious / Fatal)
- ⚡ Real-time prediction using REST API
- 🎨 Modern dashboard UI with Tailwind CSS
- 🔄 Dynamic UI updates
- 🧠 Machine Learning model (Random Forest)

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios

### Backend
- Flask
- Flask-CORS

### Machine Learning
- Scikit-learn
- Pandas
- Random Forest Classifier

---

## 📊 Input Features

The model uses the following attributes:

- Time of Day
- Weather Conditions
- Road Type
- Road Condition
- Lighting Conditions
- Traffic Control Presence
- Speed Limit (km/h)
- Driver Age
- Alcohol Involvement

---

## 📈 Output

The system predicts:

- 🟢 Minor
- 🟡 Serious
- 🔴 Fatal

---

## 🚀 How to Run the Project

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/traffic-accident-prediction.git
cd traffic-accident-prediction
