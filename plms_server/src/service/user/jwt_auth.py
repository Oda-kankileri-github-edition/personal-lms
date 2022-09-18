import logging
import os
import time
import uuid

from abc import ABC
from typing import Tuple, Dict

import jwt
from flask import request
from jwt import DecodeError
from sqlalchemy.orm import Session

from src.database.entity import TokenWhiteList, User
from src.database.utils import get_session
from src.service.exceptions import JwtError
from src.routes.exceptions import UnauthorizedError


class JwtAbstract(ABC):
    db_session: Session
    logger = logging.getLogger('JWT Manager')
    EXPIRY_HOURS = 6
    ALGORITHM = 'HS256'

    def __init__(self, db_session: Session):
        self.db_session = db_session

    def _get_secret_key(self) -> str:
        return os.environ.get('SECRET_KEY', 'development_key')

    def _get_user_tokens_from_db(self, user_id) -> TokenWhiteList:
        tokens = self.db_session \
            .query(TokenWhiteList) \
            .filter_by(user_id=str(user_id))
        return tokens


class JwtCreator(JwtAbstract):
    def generate(self, user: User) -> Tuple[str, int]:
        token = self._encode_auth_token(user.id)
        self._whitelist_token(token, user)
        return token, self.EXPIRY_HOURS

    def _encode_auth_token(self, user_id: uuid.UUID):
        self.logger.info('Generating token')
        try:
            payload = {
                'expiry': int(time.time() + self.EXPIRY_HOURS * 60 * 60),
                'start': int(time.time()),
                'user_id': str(user_id)
            }
            return jwt.encode(
                payload,
                self._get_secret_key(),
                algorithm=self.ALGORITHM
            )
        except Exception as e:
            self.logger.exception(f'An error occurred during token creation: {e}')
            raise JwtError()

    def _whitelist_token(self, token: str, user: User):
        self.delete_user_token(user)
        token = TokenWhiteList(
            user_id=str(user.id),
            token=token
        )
        self.db_session.add(token)
        self.db_session.commit()

    def delete_user_token(self, user: User):
        for token_whitelist in self._get_user_tokens_from_db(user.id):
            self.db_session\
                .query(TokenWhiteList)\
                .filter_by(id=str(token_whitelist.id))\
                .delete()
            self.db_session.commit()


class JwtValidator(JwtAbstract):
    def validate(self, jwt_token: str):
        if not jwt_token:
            raise UnauthorizedError('Missing Token')
        decoded_data = self._decode_auth_token(jwt_token)
        token = self._get_user_tokens_from_db(decoded_data['user_id'])[0]
        self._raise_on_invalidity(token, decoded_data)

    def _decode_auth_token(self, token) -> Dict:
        try:
            decoded_data = jwt.decode(jwt=token, key=self._get_secret_key(), algorithms=[self.ALGORITHM])
        except DecodeError:
            raise UnauthorizedError('Invalid Token')
        return decoded_data

    # TODO: Refactor and use validators
    def _raise_on_invalidity(self, token: TokenWhiteList, decoded_data: dict):
        message = ''
        if token is None:
            message = 'Invalid Token'
        if decoded_data['expiry'] < int(time.time()):
            message = 'Token is expired'
        if self.db_session \
                .query(User) \
                .filter_by(id=decoded_data['user_id']) \
                .first() is None:
            message = 'Invalid User'
        if message:
            self.logger.info(message)
            raise UnauthorizedError(message)


class JwtRequired:
    def __init__(self, func):
        self._func = func

    @staticmethod
    def parse_token_from_header(headers):
        try:
            assert 'Authorization' in headers
            token = headers['Authorization'].split('Bearer')[1].strip()
            return token
        except Exception:
            raise UnauthorizedError('Missing authentication data')

    @staticmethod
    def validate(token):
        validator = JwtValidator(get_session())
        validator.validate(token)

    def __call__(self, *args, **kwargs):
        token = JwtRequired.parse_token_from_header(request.headers)
        JwtRequired.validate(token)
        return self._func(*args, **kwargs)


def get_jwt_creator() -> JwtCreator:
    return JwtCreator(db_session=get_session())
