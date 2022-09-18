import uuid

from sqlalchemy import (BIGINT,
                        Boolean,
                        Column,
                        Enum,
                        ForeignKey,
                        Integer,
                        String)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base, relationship

from .utils import engine, StatusEnum


Base = declarative_base()


# TODO Add is_active, created_date and modified_date columns to every table
class Avatar(Base):
    __tablename__ = "avatars"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    user_id = Column(UUID, ForeignKey("users.id"), nullable=False)

    avatar_path = Column(String)


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    username = Column(String, unique=True)
    email = Column(String)
    name = Column(String, nullable=True)
    surname = Column(String, nullable=True)
    avatar_id = Column(UUID, ForeignKey("avatars.id"), nullable=True)
    password = Column(String)
    is_active = Column(Boolean, default=False)


class Book(Base):
    __tablename__ = "books"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    remote_id = Column(String, unique=True)
    name = Column(String)
    author = Column(String)
    publisher = Column(String)
    published_date = Column(String)  # TODO: Convert to Date field
    description = Column(String)
    cover_image_url = Column(String)
    isbn = Column(BIGINT)
    language_code = Column(String)  # TODO Later create a table for codes
    page_count = Column(Integer)

    tags = relationship("Tag", secondary="book_tags", back_populates="books")


class Author(Base):
    __tablename__ = "authors"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    name = Column(String, nullable=True)
    surname = Column(String, nullable=True)


class Rack(Base):
    __tablename__ = "racks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    name = Column(String, unique=True)
    description = Column(String, nullable=True)
    is_available = Column(Boolean, default=True)

    # Relations
    user_id = Column(UUID, ForeignKey("users.id"), nullable=False)


class Shelf(Base):
    __tablename__ = "shelves"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    name = Column(String, unique=True)
    description = Column(String, nullable=True)
    is_available = Column(Boolean, default=True)

    # Relations
    rack_id = Column(UUID, ForeignKey("racks.id"), nullable=False)
    user_books = relationship("UserBookRelation")


class Tag(Base):
    __tablename__ = "tags"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    name = Column(String, nullable=False)

    # Relationships
    books = relationship("Book", secondary="book_tags", back_populates="tags")


class BookTagRelation(Base):
    __tablename__ = "book_tags"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    book_id = Column("book_id", ForeignKey("books.id"), primary_key=True)
    tag_id = Column("tag_id", ForeignKey("tags.id"), primary_key=True)


class AuthorBookRelation(Base):
    __tablename__ = "author_books"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    author_id = Column(UUID, ForeignKey("authors.id"), primary_key=True)
    book_id = Column(UUID, ForeignKey("books.id"), primary_key=True)


class UserBookRelation(Base):
    __tablename__ = "user_books"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    user_id = Column(UUID, ForeignKey("users.id"), primary_key=True)
    book_id = Column(UUID, ForeignKey("books.id"), primary_key=True)
    shelf_id = Column(UUID, ForeignKey("shelves.id"), nullable=True)
    status = Column(Enum(StatusEnum), nullable=True)
    read_page = Column(Integer, nullable=True)
    rating = Column(Integer, nullable=True)
    is_favourite = Column(Boolean, default=False)
    notes = Column(String, nullable=True)


class ActivationLink(Base):
    __tablename__ = "activation_links"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    user_id = Column(UUID, ForeignKey("users.id"), primary_key=True)
    link = Column(String, nullable=True)


class TokenWhiteList(Base):
    __tablename__ = "tokens"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4())
    user_id = Column(UUID, ForeignKey("users.id"), primary_key=True)
    token = Column(String, nullable=False)


def create_database():
    Base.metadata.create_all(engine)
