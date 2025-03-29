@echo off
echo Starting Backend and Frontend servers...

start cmd /k "start-backend.bat"
timeout /t 5
start cmd /k "start-frontend.bat"

echo Servers are starting...
echo Backend will be available at http://localhost:8002
echo Frontend will be available at http://localhost:5173 