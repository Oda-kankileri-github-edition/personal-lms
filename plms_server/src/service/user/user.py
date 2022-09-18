import logging

from sqlalchemy.orm import Session

from src.database.entity import User, TokenWhiteList
from src.database.utils import get_session
from src.routes.dto.user import (LoginRequest,
                                 LoginResponse,
                                 RegisterRequest,
                                 RenewTokenResponse,
                                 UserDto)
from src.routes.exceptions import UnauthorizedError, UserAlreadyExistsError
from src.service.user.jwt_auth import JwtCreator

from src.routes.dto.user import RenewTokenResponse


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

    def get_user_by_username(self, username):
        return self.session\
                   .query(User)\
                   .filter_by(username=username)\
                   .first()

    def get_user_by_id(self, user_id):
        return self.session\
                   .query(User)\
                   .filter_by(id=user_id)\
                   .first()

    def _raise_inactive_user(self, user: User):
        if not user.is_active:
            raise UnauthorizedError(reason="User is not active")

    def is_user_exists(self, username: str) -> bool:
        user = self.get_user_by_username(username)
        return user is not None

    def login_user(self, login_request: LoginRequest, jwt_creator: JwtCreator) -> LoginResponse:
        user = self.get_user_by_username(login_request.username)
        self._raise_inactive_user(user)
        if login_request.password != user.password:
            raise UnauthorizedError(reason="Invalid password")
        token, expires_in = jwt_creator.generate(user)
        return LoginResponse(
            token=token,
            expiresIn=expires_in,
            user=UserDto(
                id=user.id,
                username=user.username,
                firstName=user.name,
                lastName=user.surname,
                email=user.email,
                avatar=user.avatar_id
            )
        )

    def renew_session(self, token, jwt_creator):
        token_whitelist = self.session\
            .query(TokenWhiteList)\
            .filter_by(token=token)\
            .first()
        if token_whitelist is None:
            raise UnauthorizedError('Invalid Token')
        user = self.get_user_by_id(token_whitelist.user_id)
        self._raise_inactive_user(user)

        token, expires_in = jwt_creator.generate(user)
        return RenewTokenResponse(token, expires_in)


def get_user_service() -> UserService:
    return UserService(db_session=get_session())
