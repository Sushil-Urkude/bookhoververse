from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile, Form
from typing import List
from ..schemas.author import AuthorCreate, AuthorResponse
from ..crud.author import get_authors, get_author, create_author, update_author, delete_author
from ..database import get_db
from sqlalchemy.orm import Session
from .admin import get_current_admin
import shutil
from pathlib import Path
from datetime import datetime

router = APIRouter()

# Public endpoints
@router.get("/authors", response_model=List[AuthorResponse])
async def read_authors(db: Session = Depends(get_db)):
    return get_authors(db)

@router.get("/authors/{author_id}", response_model=AuthorResponse)
async def read_author(author_id: int, db: Session = Depends(get_db)):
    author = get_author(db, author_id)
    if author is None:
        raise HTTPException(status_code=404, detail="Author not found")
    return author

# Protected endpoints - only for admin
@router.post("/authors", response_model=AuthorResponse)
async def create_new_author(
    name: str = Form(...),
    bio: str = Form(...),
    author_image: UploadFile = File(None),
    db: Session = Depends(get_db),
    _=Depends(get_current_admin)
):
    try:
        image_path = None
        if author_image:
            # Create directory if it doesn't exist
            Path("static/upload/authors").mkdir(parents=True, exist_ok=True)

            # Generate unique filename
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            image_filename = f"{timestamp}_author_{author_image.filename}"
            image_path = f"/upload/authors/{image_filename}"

            # Save file
            with open(f"static{image_path}", "wb") as buffer:
                shutil.copyfileobj(author_image.file, buffer)

        # Create author data
        author_data = AuthorCreate(
            name=name,
            bio=bio,
            image_path=image_path
        )

        return create_author(db, author_data)

    except Exception as e:
        print("Error details:", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating author: {str(e)}"
        )

@router.put("/authors/{author_id}", response_model=AuthorResponse)
async def update_existing_author(
    author_id: int,
    author: AuthorCreate,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin)
):
    updated_author = update_author(db, author_id, author)
    if updated_author is None:
        raise HTTPException(status_code=404, detail="Author not found")
    return updated_author

@router.delete("/authors/{author_id}")
async def delete_existing_author(
    author_id: int,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin)
):
    success = delete_author(db, author_id)
    if not success:
        raise HTTPException(status_code=404, detail="Author not found")
    return {"message": "Author deleted successfully"} 