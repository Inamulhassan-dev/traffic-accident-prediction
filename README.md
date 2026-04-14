# 🚗 TrafficAI - Advanced Traffic Accident Prediction System

<div align="center">

![Traffic Prediction](https://img.shields.io/badge/ML-Traffic%20Prediction-blue)
![Python](https://img.shields.io/badge/Python-3.x-green)
![React](https://img.shields.io/badge/React-18-61dafb)
![Flask](https://img.shields.io/badge/Flask-Latest-black)
![License](https://img.shields.io/badge/License-MIT-yellow)

**An intelligent machine learning platform for predicting traffic accident severity with real-time analytics, driver risk profiling, and comprehensive safety recommendations.**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [API](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Model Information](#-model-information)
- [Screenshots](#-screenshots)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## ✨ Features

### 🎯 Core Features
- **🔮 Real-time Accident Prediction** - Predict accident severity based on multiple environmental and driver factors
- **📊 Analytics Dashboard** - Visualize trends, patterns, and feature importance with interactive charts
- **👤 Driver Risk Profiling** - Assess individual driver risk levels based on experience and behavior
- **🌦️ Weather Impact Analysis** - Understand how weather conditions affect accident rates
- **💡 Safety Recommendations** - Get personalized safety tips based on current conditions
- **📦 Batch Predictions** - Process multiple scenarios simultaneously
- **📄 Export Reports** - Download predictions as PDF or CSV files
- **🌓 Dark/Light Theme** - Modern, responsive UI with theme toggle
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

### 🎨 UI/UX Features
- Modern glassmorphism design
- Smooth animations and transitions
- Interactive data visualizations
- Real-time form validation
- Prediction history tracking
- Risk gauge visualization

---

## 🎬 Demo

### Live Application
```
Backend:  http://127.0.0.1:5000
Frontend: http://localhost:5173
```

### Quick Start (Windows)
```bash
# 1. Setup (First time only)
1-setup.bat

# 2. Start application
2-start.bat

# 3. Stop application
3-stop.bat
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| ![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white) | Core language |
| ![Flask](https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white) | Web framework |
| ![Scikit-learn](https://img.shields.io/badge/Scikit--learn-F7931E?style=flat&logo=scikit-learn&logoColor=white) | Machine learning |
| ![Pandas](https://img.shields.io/badge/Pandas-150458?style=flat&logo=pandas&logoColor=white) | Data processing |
| ![NumPy](https://img.shields.io/badge/NumPy-013243?style=flat&logo=numpy&logoColor=white) | Numerical computing |

### Frontend
| Technology | Purpose |
|------------|---------|
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black) | UI framework |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) | Build tool |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | Styling |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white) | HTTP client |

### Machine Learning
- **Algorithm**: Random Forest Classifier
- **Features**: 15+ environmental and driver factors
- **Accuracy**: Optimized for multi-class classification
- **Output**: 4 severity levels (Minor, Moderate, Severe, Fatal)

---

## 📁 Project Structure

```
Traffic-Prediction/
│
├── 📂 backend/                    # Python Flask Backend
│   ├── 📂 app/
│   │   ├── __init__.py           # Flask app factory
│   │   ├── routes.py             # API endpoints
│   │   ├── model.py              # ML model logic
│   │   └── utils.py              # Helper functions
│   ├── 📂 data/
│   │   └── cleaned_accident_dataset.csv
│   ├── 📂 models/
│   │   ├── accident_model.pkl    # Trained model
│   │   └── columns.pkl           # Feature columns
│   ├── config.py                 # Configuration
│   ├── run.py                    # Server entry point
│   ├── train.py                  # Model training
│   ├── requirements.txt          # Python dependencies
│   └── retrain-model.bat         # Retrain script
│
├── 📂 frontend/                   # React Frontend
│   └── 📂 traffic-prediction/
│       ├── 📂 src/
│       │   ├── 📂 components/    # React components
│       │   │   ├── AnalyticsDashboard.jsx
│       │   │   ├── DriverRiskProfile.jsx
│       │   │   ├── ExportReport.jsx
│       │   │   ├── PredictionForm.jsx
│       │   │   ├── PredictionHistory.jsx
│       │   │   ├── ResultCard.jsx
│       │   │   ├── RiskGauge.jsx
│       │   │   ├── SafetyRecommendations.jsx
│       │   │   ├── StatsPanel.jsx
│       │   │   └── ThemeToggle.jsx
│       │   ├── 📂 services/
│       │   │   └── api.js        # API service layer
│       │   ├── App.jsx           # Main application
│       │   ├── App.css           # App styles
│       │   ├── main.jsx          # Entry point
│       │   └── index.css         # Global styles
│       ├── 📂 public/
│       │   ├── favicon.svg
│       │   └── icons.svg
│       ├── package.json          # Dependencies
│       ├── vite.config.js        # Vite config
│       ├── tailwind.config.js    # Tailwind config
│       └── postcss.config.js     # PostCSS config
│
├── 🔧 1-setup.bat                # Setup script
├── ▶️ 2-start.bat                # Start servers
├── ⏹️ 3-stop.bat                 # Stop servers
├── 📄 .gitignore                 # Git ignore rules
├── 📜 LICENSE                    # MIT License
├── 📖 README.md                  # This file
├── 📋 PROJECT_STRUCTURE.txt      # Detailed structure
└── ✅ FINAL_CHECKLIST.txt        # Verification checklist
```

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- ✅ **Python 3.x** - [Download Python](https://www.python.org/downloads/)
- ✅ **Node.js** (v14 or higher) - [Download Node.js](https://nodejs.org/)
- ✅ **Git** - [Download Git](https://git-scm.com/downloads/)

### Method 1: Automated Setup (Windows - Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/Inamulhassan-dev/traffic-accident-prediction.git
cd traffic-accident-prediction

# 2. Run setup (installs everything automatically)
1-setup.bat
```

That's it! The setup script will:
- ✅ Create Python virtual environment
- ✅ Install all Python dependencies
- ✅ Install all Node.js dependencies
- ✅ Train the machine learning model

### Method 2: Manual Setup (All Platforms)

#### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Train the model
python train.py
```

#### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend/traffic-prediction

# Install dependencies
npm install
```

---

## 💻 Usage

### Quick Start (Windows)

#### 1️⃣ Start the Application
```bash
2-start.bat
```

This will:
- ✅ Start backend server on `http://127.0.0.1:5000`
- ✅ Start frontend server on `http://localhost:5173`
- ✅ Open browser automatically

#### 2️⃣ Use the Application
- Fill in the prediction form with accident details
- Click "Predict Severity" to get results
- View analytics dashboard for insights
- Check driver risk profile
- Export reports as needed

#### 3️⃣ Stop the Application
```bash
3-stop.bat
```

### Manual Start (All Platforms)

#### Start Backend
```bash
cd backend
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

python run.py
```

#### Start Frontend
```bash
cd frontend/traffic-prediction
npm run dev
```

---

## 📡 API Documentation

### Base URL
```
http://127.0.0.1:5000
```

### Endpoints

#### 1. Health Check
```http
GET /api/health
```
**Response:**
```json
{
  "status": "healthy",
  "message": "API is running"
}
```

#### 2. Single Prediction
```http
POST /api/predict
```
**Request Body:**
```json
{
  "weather": "Clear",
  "road_condition": "Dry",
  "light_condition": "Daylight",
  "hour": 14,
  "day_of_week": 3,
  "location_type": "Urban",
  "speed_limit": 50,
  "num_vehicles": 2,
  "driver_age": 35,
  "driver_experience": 10
}
```
**Response:**
```json
{
  "severity": "Minor",
  "confidence": 0.85,
  "risk_level": "Low"
}
```

#### 3. Batch Predictions
```http
POST /api/batch-predict
```
**Request Body:**
```json
{
  "predictions": [
    { /* prediction data 1 */ },
    { /* prediction data 2 */ }
  ]
}
```

#### 4. Analytics
```http
GET /api/analytics
```
**Response:**
```json
{
  "total_predictions": 1250,
  "severity_distribution": {...},
  "feature_importance": {...},
  "trends": {...}
}
```

#### 5. Weather Impact
```http
GET /api/weather-impact
```
**Response:**
```json
{
  "weather_conditions": [...],
  "accident_rates": [...],
  "severity_by_weather": {...}
}
```

#### 6. Driver Profile
```http
POST /api/driver-profile
```
**Request Body:**
```json
{
  "age": 35,
  "experience": 10,
  "recent_accidents": 0
}
```
**Response:**
```json
{
  "risk_level": "Low",
  "risk_score": 25,
  "recommendations": [...]
}
```

---

## 🤖 Model Information

### Input Features

| Feature | Type | Description |
|---------|------|-------------|
| Weather Conditions | Categorical | Clear, Rain, Snow, Fog, etc. |
| Road Conditions | Categorical | Dry, Wet, Icy, etc. |
| Light Conditions | Categorical | Daylight, Dark, Dawn/Dusk |
| Hour of Day | Numerical | 0-23 |
| Day of Week | Numerical | 0-6 (Monday-Sunday) |
| Location Type | Categorical | Urban/Rural |
| Speed Limit | Numerical | Road speed limit (km/h) |
| Number of Vehicles | Numerical | Vehicles involved |
| Driver Age | Numerical | Age of driver |
| Driver Experience | Numerical | Years of driving experience |

### Output Classes

| Severity | Description |
|----------|-------------|
| 🟢 **Minor** | Minor damage, no injuries |
| 🟡 **Moderate** | Some injuries, moderate damage |
| 🟠 **Severe** | Serious injuries, significant damage |
| 🔴 **Fatal** | Life-threatening or fatal |

### Model Performance
- **Algorithm**: Random Forest Classifier
- **Training Data**: 10,000+ accident records
- **Features**: 15+ environmental and driver factors
- **Cross-validation**: 5-fold CV
- **Optimization**: Hyperparameter tuning with GridSearchCV

---

## 📸 Screenshots

### Main Dashboard
![Dashboard](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=TrafficAI+Dashboard)

### Prediction Form
![Prediction Form](https://via.placeholder.com/800x400/10B981/FFFFFF?text=Prediction+Form)

### Analytics Dashboard
![Analytics](https://via.placeholder.com/800x400/F59E0B/FFFFFF?text=Analytics+Dashboard)

### Driver Risk Profile
![Risk Profile](https://via.placeholder.com/800x400/EF4444/FFFFFF?text=Driver+Risk+Profile)

---

## 🔧 Troubleshooting

### Common Issues

#### ⚠️ Scikit-learn Version Warning
```
InconsistentVersionWarning: Trying to unpickle estimator...
```
**Solution:**
```bash
cd backend
retrain-model.bat
```

#### ⚠️ Port Already in Use
```
Error: Port 5000 or 5173 is already in use
```
**Solution:**
```bash
3-stop.bat
# Wait 5 seconds
2-start.bat
```

#### ⚠️ Module Not Found Error
```
ModuleNotFoundError: No module named 'flask'
```
**Solution:**
```bash
cd backend
venv\Scripts\activate
pip install -r requirements.txt
```

#### ⚠️ Node Modules Error
```
Error: Cannot find module...
```
**Solution:**
```bash
cd frontend/traffic-prediction
npm install
```

### Getting Help

If you encounter any issues:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Review `PROJECT_STRUCTURE.txt` for detailed information
3. Check `FINAL_CHECKLIST.txt` for verification steps
4. Open an issue on [GitHub](https://github.com/Inamulhassan-dev/traffic-accident-prediction/issues)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### How to Contribute

1. **Fork the repository**
   ```bash
   # Click the 'Fork' button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/traffic-accident-prediction.git
   cd traffic-accident-prediction
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

4. **Make your changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests if applicable

5. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

6. **Push to your branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

7. **Open a Pull Request**
   - Go to the original repository
   - Click 'New Pull Request'
   - Describe your changes

### Contribution Guidelines

- ✅ Follow the existing code style
- ✅ Write clear commit messages
- ✅ Update documentation as needed
- ✅ Test your changes thoroughly
- ✅ Be respectful and constructive

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Inamul Hassan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 📞 Contact

**Inamul Hassan**

- 🐙 GitHub: [@Inamulhassan-dev](https://github.com/Inamulhassan-dev)
- 📧 Email: [Your Email]
- 💼 LinkedIn: [Your LinkedIn]
- 🌐 Portfolio: [Your Portfolio]

---

## 🙏 Acknowledgments

- Dataset: Traffic accident data
- ML Framework: Scikit-learn
- UI Framework: React + Tailwind CSS
- Icons: Lucide Icons
- Charts: Recharts

---

## 🌟 Star History

If you find this project useful, please consider giving it a ⭐!

[![Star History Chart](https://api.star-history.com/svg?repos=Inamulhassan-dev/traffic-accident-prediction&type=Date)](https://star-history.com/#Inamulhassan-dev/traffic-accident-prediction&Date)

---

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/Inamulhassan-dev/traffic-accident-prediction)
![GitHub stars](https://img.shields.io/github/stars/Inamulhassan-dev/traffic-accident-prediction?style=social)
![GitHub forks](https://img.shields.io/github/forks/Inamulhassan-dev/traffic-accident-prediction?style=social)
![GitHub issues](https://img.shields.io/github/issues/Inamulhassan-dev/traffic-accident-prediction)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Inamulhassan-dev/traffic-accident-prediction)

---

<div align="center">

### 🚗 Made with ❤️ for safer roads

**[⬆ Back to Top](#-trafficai---advanced-traffic-accident-prediction-system)**

</div>
