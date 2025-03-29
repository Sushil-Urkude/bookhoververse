from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from .book import BookResponse

class AuthorBase(BaseModel):
    name: str
    bio: str
    image_path: Optional[str] = None

class AuthorCreate(AuthorBase):
    pass

class AuthorResponse(AuthorBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    books: List[BookResponse] = []

    class Config:
        from_attributes = True 