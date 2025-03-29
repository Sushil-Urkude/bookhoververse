from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .database import engine
from .models import book, author
from .api import books, authors, admin
from .core.config import STATIC_DIR

# Create database tables
book.Base.metadata.create_all(bind=engine)
author.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Bookish Review API",
    description="API for Bookish Review - A Modern Book Review Platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files directory
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# Include routers
app.include_router(admin.router, prefix="/api")
app.include_router(books.router, prefix="/api",tags=["books"])
app.include_router(authors.router, prefix="/api",tags=["authors"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to Bookish Review API",
        "docs_url": "/docs",
        "redoc_url": "/redoc"
    } 
