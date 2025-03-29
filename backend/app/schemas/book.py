from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from fastapi import UploadFile, File

class AuthorBase(BaseModel):
    name: str
    image: Optional[str] = None
    bio: Optional[str] = None

class BookBase(BaseModel):
    title: str
    published_date: str
    rating: int
    review: str
    cover_image_path: Optional[str] = None
    genre: Optional[str] = None

class BookCreate(BookBase):
    author_id: Optional[int] = None

class BookResponse(BookBase):
    id: int
    author_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class BookWithAuthor(BookResponse):
    author: 'AuthorBase'

    class Config:
        from_attributes = True 