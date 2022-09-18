import datetime
import logging
import os
import uuid
from typing import Tuple

import jwt
from sqlalchemy.orm import Session

from src.database.entity import TokenWhiteList, User
from src.database.utils import get_session
from src.service.exceptions import JwtError


class JwtCreator:
    db_session: Session
    logger = logging.getLogger('JWT Manager')
    EXPIRY_HOURS = 6

    def __init__(self, db_session: Session):
        self.db_session = db_session

    def generate(self, user: User) -> Tuple[str, int]:
        token = self._encode_auth_token(user.id)
        self._whitelist_token(token, user)
        return token, self.EXPIRY_HOURS

    def _encode_auth_token(self, user_id: uuid.UUID):
        self.logger.info('Generating token')
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, hours=self.EXPIRY_HOURS),
                'iat': datetime.datetime.utcnow(),
                'sub': str(user_id)
            }
            return jwt.encode(
                payload,
                os.environ.get('SECRET_KEY', 'development_key'),
                algorithm='HS256'
            )
        except Exception as e:
            self.logger.exception(f'An error occurred during token creation: {e}')
            raise JwtError()

    def _whitelist_token(self, token: str, user: User):
        token = TokenWhiteList(
            user_id=str(user.id),
            token=token
        )
        self.db_session.add(token)
        self.db_session.commit()


def get_jwt_creator() -> JwtCreator:
    return JwtCreator(db_session=get_session())
