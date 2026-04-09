@echo off
echo ===============================
echo 🚀 Starting Traffic Project
echo ===============================

REM Activate Python virtual environment
call venv\Scripts\activate

echo.
echo 🔧 Starting Backend...
start cmd /k python -m backend.run

timeout /t 3 > nul

echo.
echo 🎨 Starting Frontend...
cd frontend\traffic-prediction
start cmd /k npm run dev

echo.
echo ✅ Project Running!
pause