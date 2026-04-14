@echo off
cd /d "%~dp0"

echo.
echo ========================================================================
echo                   TrafficAI - Setup Starting
echo ========================================================================
echo.
echo Current Directory: %CD%
echo.
pause

echo.
echo [1/6] Checking Python...
python --version
if errorlevel 1 (
    echo ERROR: Python not found!
    pause
    exit
)
echo Python OK!
pause

echo.
echo [2/6] Checking Node.js...
node --version
if errorlevel 1 (
    echo ERROR: Node.js not found!
    pause
    exit
)
echo Node.js OK!
pause

echo.
echo [3/6] Checking backend folder...
if not exist "backend" (
    echo ERROR: backend folder not found!
    echo You are in: %CD%
    pause
    exit
)
echo Backend folder found!
pause

echo.
echo [4/6] Creating Python virtual environment...
cd backend
python -m venv venv
if errorlevel 1 (
    echo ERROR: Failed to create venv
    cd ..
    pause
    exit
)
echo Virtual environment created!
pause

echo.
echo [5/6] Installing Python packages...
call venv\Scripts\activate.bat
python -m pip install --upgrade pip
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install Python packages
    cd ..
    pause
    exit
)
echo Python packages installed!
cd ..
pause

echo.
echo [6/7] Installing Node.js packages...
cd frontend\traffic-prediction
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install Node packages
    cd ..\..
    pause
    exit
)
echo Node packages installed!
cd ..\..
pause

echo.
echo [7/7] Training ML model...
cd backend
call venv\Scripts\activate.bat
python train.py
if errorlevel 1 (
    echo ERROR: Failed to train model
    cd ..
    pause
    exit
)
echo Model trained successfully!
cd ..
pause

echo.
echo ========================================================================
echo                   SETUP COMPLETE!
echo ========================================================================
echo.
echo All dependencies installed and model trained!
echo.
echo Next: Run 2-start.bat to start the application
echo.
pause
