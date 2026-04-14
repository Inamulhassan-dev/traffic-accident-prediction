@echo off
cd /d "%~dp0"

echo.
echo ========================================================================
echo                   Retraining ML Model
echo ========================================================================
echo.
echo This will retrain the model with the current scikit-learn version
echo to remove version warnings.
echo.
pause

echo.
echo Activating virtual environment...
call venv\Scripts\activate.bat

echo.
echo Training model...
python train.py

echo.
echo ========================================================================
echo                   Model Retrained Successfully!
echo ========================================================================
echo.
echo The warnings should be gone now.
echo Restart the servers (3-stop.bat then 2-start.bat) to see the changes.
echo.
pause
