from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from ..schemas.book import BookCreate, BookResponse
from ..crud.book import get_books, get_book, create_book, update_book, delete_book
from .admin import get_current_admin

router = APIRouter()

@router.get("/books", response_model=List[BookResponse])
async def read_books():
    return await get_books()

@router.get("/books/{book_id}", response_model=BookResponse)
async def read_book(book_id: str):
    book = await get_book(book_id)
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

@router.post("/books", response_model=BookResponse)
async def create_new_book(book: BookCreate, _=Depends(get_current_admin)):
    return await create_book(book)

@router.put("/books/{book_id}", response_model=BookResponse)
async def update_existing_book(book_id: str, book: BookCreate, _=Depends(get_current_admin)):
    updated_book = await update_book(book_id, book)
    if updated_book is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return updated_book

@router.delete("/books/{book_id}")
async def delete_existing_book(book_id: str, _=Depends(get_current_admin)):
    success = await delete_book(book_id)
    if not success:
        raise HTTPException(status_code=404, detail="Book not found")
    return {"message": "Book deleted successfully"} 