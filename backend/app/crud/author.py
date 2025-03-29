from sqlalchemy.orm import Session
from ..models.author import Author
from ..schemas.author import AuthorCreate
from typing import List, Optional

def get_authors(db: Session) -> List[Author]:
    return db.query(Author).all()

def get_author(db: Session, author_id: int) -> Optional[Author]:
    return db.query(Author).filter(Author.id == author_id).first()

def create_author(db: Session, author: AuthorCreate) -> Author:
    db_author = Author(
        name=author.name,
        bio=author.bio,
        image_path=author.image_path
    )
    db.add(db_author)
    db.commit()
    db.refresh(db_author)
    return db_author

def update_author(db: Session, author_id: int, author_data: AuthorCreate) -> Optional[Author]:
    db_author = db.query(Author).filter(Author.id == author_id).first()
    if db_author:
        for key, value in author_data.dict().items():
            setattr(db_author, key, value)
        db.commit()
        db.refresh(db_author)
    return db_author

def delete_author(db: Session, author_id: int) -> bool:
    db_author = db.query(Author).filter(Author.id == author_id).first()
    if db_author:
        db.delete(db_author)
        db.commit()
        return True
    return False 