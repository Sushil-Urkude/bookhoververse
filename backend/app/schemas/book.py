from pydantic import BaseModel
from typing import Optional

class AuthorBase(BaseModel):
    name: str
    image: Optional[str] = None
    bio: Optional[str] = None

class BookBase(BaseModel):
    title: str
    author: AuthorBase
    coverImage: Optional[str] = None
    spineColor: Optional[str] = None
    genre: str

class BookCreate(BookBase):
    pass

class BookResponse(BookBase):
    id: str 