@echo off
echo Starting BookHoververse setup...

:: Create virtual environment for backend if it doesn't exist
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)

:: Activate virtual environment and install backend dependencies
echo Installing backend dependencies...
call .\venv\Scripts\activate.bat
cd backend
python -m pip install -r requirements.txt
cd ..

:: Install frontend dependencies
echo Installing frontend dependencies...
cd frontend
call npm install
cd ..

:: Start both servers in parallel
echo Starting servers...
start cmd /k "cd %CD%\backend && python -m uvicorn app.main:app --reload --port 8001"
start cmd /k "cd %CD%\frontend && npm run dev"

echo Setup complete! The application should be running at:
echo Backend: http://localhost:8001
echo Frontend: http://localhost:5173 