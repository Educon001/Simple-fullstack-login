from abc import ABC, abstractmethod
from uuid import UUID

from domain.models import User


class IUserRepository(ABC):

    @abstractmethod
    def get_user_by_id(self, user_id: UUID) -> None | User:
        pass

    @abstractmethod
    def get_user_by_username(self, username: str) -> None | User:
        pass

    @abstractmethod
    def add_user(self, user: User) -> User:
        pass