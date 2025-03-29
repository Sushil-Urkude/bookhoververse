from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..database import Base

class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    author_name = Column(String)
    author_bio = Column(Text)
    author_image_path = Column(String)
    published_date = Column(String)
    rating = Column(Integer)
    review = Column(Text)
    cover_image_path = Column(String)
    genre = Column(String, default="General")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Foreign key to authors table
    author_id = Column(Integer, ForeignKey("authors.id"))
    # Relationship with author
    author = relationship("Author", back_populates="books") 