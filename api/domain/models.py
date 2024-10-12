from typing import Optional
from uuid import UUID, uuid4

from pydantic import BaseModel
from sqlmodel import SQLModel, Field


class UserBase(SQLModel):
    username: str = Field(unique=True)
    email: str | None = None
    full_name: str | None = None


class User(UserBase, table=True):
    id: Optional[UUID] = Field(default_factory=uuid4, primary_key=True)
    hashed_password: str


class UserCreate(UserBase):
    password: str


class UserPublic(UserBase):
    id: UUID


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    user_id: UUID | None = None
