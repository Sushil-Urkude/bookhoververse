import os
import sys
import uvicorn
from app.main import app

# Add the current directory to the Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8002) 