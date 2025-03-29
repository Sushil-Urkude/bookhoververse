from sqlalchemy.orm import Session
from ..models.book import Book
from sqlalchemy.orm import joinedload
from ..schemas.book import BookCreate
from ..schemas.author import AuthorBase
from typing import List, Optional

def get_books(db: Session) -> List[Book]:
    try:
        # Use joinedload to eagerly load the author relationship
        books = db.query(Book).options(joinedload(Book.author)).all()
        
        # Filter out books without author_id or author relationship
        valid_books = [book for book in books if book.author_id is not None and book.author is not None]
        
        return valid_books
    except Exception as e:
        print(f"Error fetching books: {str(e)}")
        return []

def get_book(db: Session, book_id: int) -> Optional[Book]:
    return db.query(Book).filter(Book.id == book_id).first()

def create_book(db: Session, book: BookCreate, author: AuthorBase) -> Book:
    db_book = Book(
        title=book.title,
        author_id=book.author_id,
        author_name=author.name,
        author_bio=author.bio,
        author_image_path=author.image_path,
        published_date=book.published_date,
        rating=book.rating,
        review=book.review,
        cover_image_path=book.cover_image_path,
        genre=book.genre
    )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

def update_book(db: Session, book_id: int, book_data: BookCreate) -> Optional[Book]:
    db_book = db.query(Book).filter(Book.id == book_id).first()
    if db_book:
        for key, value in book_data.dict().items():
            setattr(db_book, key, value)
        db.commit()
        db.refresh(db_book)
    return db_book

def delete_book(db: Session, book_id: int) -> bool:
    db_book = db.query(Book).filter(Book.id == book_id).first()
    if db_book:
        db.delete(db_book)
        db.commit()
        return True
    return False 