from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile, Form
from typing import List, Optional
from ..schemas.book import BookCreate, BookResponse, BookWithAuthor
from ..crud.book import get_books, get_book, create_book, update_book, delete_book
from ..crud.author import get_author, create_author
from ..schemas.author import AuthorCreate
from ..database import get_db
from sqlalchemy.orm import Session
from .admin import get_current_admin
import shutil
from pathlib import Path
from datetime import datetime

router = APIRouter()

# Public endpoints - no authentication needed
@router.get("/get_books", response_model=List[BookWithAuthor])
async def read_books(
    skip: int = 0,
    limit: int = 12,
    genre: Optional[str] = None,
    db: Session = Depends(get_db)
):
    return get_books(db, skip=skip, limit=limit, genre=genre)

@router.get("/books/{book_id}", response_model=BookWithAuthor)
async def read_book(book_id: int, db: Session = Depends(get_db)):
    book = get_book(db, book_id)
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

# Protected endpoints - only for admin
@router.post("/add_books", response_model=BookWithAuthor)
async def create_new_book(
    title: str = Form(...),
    author_id: int = Form(None),
    author_name: str = Form(None),
    author_bio: str = Form(None),
    published_date: str = Form(...),
    rating: int = Form(...),
    review: str = Form(...),
    genre: str = Form(None),
    cover_image: UploadFile = File(...),
    author_image: UploadFile = File(None),
    db: Session = Depends(get_db),
    _=Depends(get_current_admin)
):
    try:
        print(author_bio, author_name, author_id,title,published_date,rating,review,genre)
        # Handle author
        if author_id:
            # Use existing author
            author = get_author(db, author_id)
            if not author:
                raise HTTPException(status_code=404, detail="Author not found")
        else:
            # Create new author
            author_image_path = None
            if author_image:
                # Create directory if it doesn't exist
                Path("static/upload/authors").mkdir(parents=True, exist_ok=True)

                # Generate unique filename
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                author_image_filename = f"{timestamp}_author_{author_image.filename}"
                author_image_path = f"/upload/authors/{author_image_filename}"

                # Save file
                with open(f"static{author_image_path}", "wb") as buffer:
                    shutil.copyfileobj(author_image.file, buffer)

            author_data = AuthorCreate(
                name=author_name,
                bio=author_bio,
                image_path=author_image_path
            )
            author = create_author(db, author_data)
            author_id = author.id

        # Handle book cover image
        Path("static/upload/books").mkdir(parents=True, exist_ok=True)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        cover_image_filename = f"{timestamp}_cover_{cover_image.filename}"
        cover_image_path = f"/upload/books/{cover_image_filename}"

        with open(f"static{cover_image_path}", "wb") as buffer:
            shutil.copyfileobj(cover_image.file, buffer)

        # Create book
        book_data = BookCreate(
            title=title,
            author_id=author_id,
            published_date=published_date,
            rating=rating,
            review=review,
            cover_image_path=cover_image_path,
            genre=genre or "General"
        )

        return create_book(db, book_data, author_data)

    except Exception as e:
        print("Error details:", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating book: {str(e)}"
        )

@router.put("/books/{book_id}", response_model=BookWithAuthor)
async def update_existing_book(
    book_id: int,
    book: BookCreate,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin)
):
    updated_book = update_book(db, book_id, book)
    if updated_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return updated_book

@router.delete("/books/{book_id}")
async def delete_existing_book(
    book_id: int,
    db: Session = Depends(get_db),
    _=Depends(get_current_admin)
):
    success = delete_book(db, book_id)
    if not success:
        raise HTTPException(status_code=404, detail="Book not found")
    return {"message": "Book deleted successfully"} 