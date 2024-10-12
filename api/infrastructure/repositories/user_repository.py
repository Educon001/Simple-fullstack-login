from uuid import UUID

from fastapi import Depends
from sqlmodel import Session, select

from domain.models import User
from domain.repositories import IUserRepository
from infrastructure.db import get_session


class UserRepository(IUserRepository):
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def get_user_by_id(self, user_id: UUID) -> None | User:
        result = self.session.get(User, user_id)
        return result

    def get_user_by_username(self, username: str) -> None | User:
        statement = select(User).where(User.username == username)
        result = self.session.exec(statement).first()
        return result

    def add_user(self, user: User) -> User:
        try:
            self.session.add(user)
            self.session.commit()
            self.session.refresh(user)
            return user
        except:
            return None
