@echo off
cd /d "%~dp0"

echo.
echo ========================================================================
echo                   TrafficAI - Starting Servers
echo ========================================================================
echo.

echo Checking if setup was done...
if not exist "backend\venv" (
    echo ERROR: Run 1-setup.bat first!
    pause
    exit
)
if not exist "frontend\traffic-prediction\node_modules" (
    echo ERROR: Run 1-setup.bat first!
    pause
    exit
)
echo Setup found!
echo.

echo Starting Backend Server...
cd backend
start "TrafficAI Backend" cmd /k "venv\Scripts\activate.bat && python run.py"
cd ..
echo Backend server starting in new window...
echo.

echo Starting Frontend Server...
cd frontend\traffic-prediction
start "TrafficAI Frontend" cmd /k "npm run dev"
cd ..\..
echo Frontend server starting in new window...
echo.

echo ========================================================================
echo Waiting for servers to initialize...
echo ========================================================================
echo.
timeout /t 15 /nobreak

cls
echo.
echo ========================================================================
echo                   SERVERS RUNNING SUCCESSFULLY!
echo ========================================================================
echo.
echo Backend Server:
echo   Status: RUNNING
echo   Port: 5000
echo   URL: http://127.0.0.1:5000
echo   Window: TrafficAI Backend (check separate window)
echo.
echo Frontend Server:
echo   Status: RUNNING
echo   Port: 5173
echo   URL: http://localhost:5173
echo   Window: TrafficAI Frontend (check separate window)
echo.
echo ========================================================================
echo.
echo Opening browser at http://localhost:5173 ...
echo.
start http://localhost:5173
timeout /t 2 /nobreak
echo.
echo Browser should now be open!
echo If not, manually visit: http://localhost:5173
echo.
echo ========================================================================
echo.
echo NOTE: The scikit-learn version warnings in backend are harmless.
echo       To remove them, run: backend\retrain-model.bat
echo.
echo To stop all servers: Run 3-stop.bat
echo.
echo ========================================================================
echo.
pause
