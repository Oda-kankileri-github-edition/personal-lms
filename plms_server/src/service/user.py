import logging

from sqlalchemy.orm import Session

from src.database.entity import User
from src.routes.dto.user import RegisterRequest
from src.routes.exceptions import UserAlreadyExistsError

from src.database.utils import get_session


class UserService:
    def __init__(self, db_session: Session):
        self.session = db_session
        self.logger = logging.getLogger(self.__class__.__name__)

    def save_user(self, register_request: RegisterRequest):
        self.logger.debug(f"Saving user: {register_request}")
        if self.is_user_exists(register_request.username):
            raise UserAlreadyExistsError(register_request.username)
        user = User(
            username=register_request.username,
            email=register_request.email,
            name=register_request.first_name,
            surname=register_request.last_name,
            password=register_request.password
        )
        self.session.add(user)
        self.session.commit()

    def is_user_exists(self, username: str) -> bool:
        return self.session\
                   .query(User.username)\
                   .filter_by(username=username)\
                   .first() is not None


def get_user_service() -> UserService:
    return UserService(db_session=get_session())
