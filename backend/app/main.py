from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .api import books, admin
from .core.config import STATIC_DIR

app = FastAPI(
    title="BookHoververse API",
    description="API for BookHoververse - A Modern Book Review Platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# Include routers
app.include_router(books.router, prefix="/api", tags=["books"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to BookHoververse API",
        "docs_url": "/docs",
        "redoc_url": "/redoc"
    } 