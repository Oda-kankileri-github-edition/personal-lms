import logging

from sqlalchemy.orm import Session

from src.database.entity import User
from src.routes.dto.user import RegisterRequest
from src.routes.exceptions import UserAlreadyExistsError

from src.database.utils import get_session
from src.service.exceptions import JsonToDtoParsingError


class UserService:
    def __init__(self, db_session: Session):
        self.session = db_session
        self.logger = logging.getLogger(self.__class__.__name__)

    def is_user_exists(self, user: User) -> bool:
        return self.session\
                   .query(User.email)\
                   .filter_by(username=user.username)\
                   .first() is not None

    def save_user(self, register_request: RegisterRequest):
        self.logger.debug(f"Saving user: {register_request}")
        try:
            user = User(
                username=register_request.username,
                email=register_request.email,
                name=register_request.first_name,
                surname=register_request.last_name,
                password=register_request.password
            )
        except KeyError as e:
            self.logger.error(e)
            raise JsonToDtoParsingError()
        if self.is_user_exists(user):
            raise UserAlreadyExistsError(user.username)
        self.session.add(user)
        self.session.commit()
        return True


def get_user_service() -> UserService:
    return UserService(db_session=get_session())