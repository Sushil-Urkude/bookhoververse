from typing import List, Optional
from ..schemas.book import BookCreate
import uuid

# Temporary in-memory storage - In a real app, this would be a database
books_db = {}

async def get_books() -> List[dict]:
    return list(books_db.values())

async def get_book(book_id: str) -> Optional[dict]:
    return books_db.get(book_id)

async def create_book(book: BookCreate) -> dict:
    book_id = str(uuid.uuid4())
    book_dict = {**book.model_dump(), "id": book_id}
    books_db[book_id] = book_dict
    return book_dict

async def update_book(book_id: str, book: BookCreate) -> Optional[dict]:
    if book_id not in books_db:
        return None
    book_dict = {**book.model_dump(), "id": book_id}
    books_db[book_id] = book_dict
    return book_dict

async def delete_book(book_id: str) -> bool:
    if book_id not in books_db:
        return False
    del books_db[book_id]
    return True 