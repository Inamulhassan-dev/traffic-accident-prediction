@echo off
cd /d "%~dp0"

echo.
echo ========================================================================
echo                   TrafficAI - Stopping Servers
echo ========================================================================
echo.
pause

echo.
echo Checking for running servers...
netstat -ano | findstr ":5000" | findstr "LISTENING"
netstat -ano | findstr ":5173" | findstr "LISTENING"
pause

echo.
echo Killing processes on port 5000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5000" ^| findstr "LISTENING"') do taskkill /F /PID %%a
pause

echo.
echo Killing processes on port 5173...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5173" ^| findstr "LISTENING"') do taskkill /F /PID %%a
pause

echo.
echo Closing server windows...
taskkill /FI "WindowTitle eq TrafficAI Backend*" /F
taskkill /FI "WindowTitle eq TrafficAI Frontend*" /F
pause

echo.
echo ========================================================================
echo                   SERVERS STOPPED!
echo ========================================================================
echo.
pause
