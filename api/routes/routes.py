from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session

from auth.jwt import create_access_token
from auth.services import get_current_user_id, verify_password, get_password_hash
from domain.models import UserPublic, UserCreate, User, Token
from infrastructure.db import get_session
from infrastructure.repositories.user_repository import UserRepository

router = APIRouter()


def get_user_repository(session: Session = Depends(get_session)):
    return UserRepository(session)


@router.post("/register", response_model=UserPublic, status_code=status.HTTP_201_CREATED,
             responses={409: {"description": "Username already exists"}})
async def register_user(user: UserCreate, user_repository: UserRepository = Depends(get_user_repository)):
    new_user = User(username=user.username, email=user.email, full_name=user.full_name,
                    hashed_password=get_password_hash(user.password))
    response = user_repository.add_user(new_user)
    if not response:
        raise HTTPException(status_code=409, detail="Username already exists")
    return response


@router.get("/users/me", response_model=UserPublic, status_code=status.HTTP_200_OK)
async def get_user_information(current_user_id: Annotated[UUID, Depends(get_current_user_id)],
                               user_repository: UserRepository = Depends(get_user_repository)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    user_id = current_user_id
    if user_id is None:
        raise HTTPException(status_code=401, detail="Invalid user")
    user = user_repository.get_user_by_id(user_id)
    if user is None:
        raise credentials_exception
    return user


@router.post("/login")
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
                                 user_repository: UserRepository = Depends(get_user_repository)) -> Token:
    user = user_repository.get_user_by_username(form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.id.hex})
    return Token(access_token=access_token, token_type="bearer")
