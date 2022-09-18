from werkzeug.exceptions import HTTPException

from . import routes
from ..service.exceptions import JsonToDtoParsingError, JwtError


class UserAlreadyExistsError(HTTPException):
    def __init__(self, username):
        self.username = username

    @property
    def code(self):
        return 409

    @property
    def description(self):
        return f"User '{self.username}' already exists"


class InactiveUserError(HTTPException):
    code = 401
    description = "Please activate your user via activation link in your mail"


class UnauthorizedError(HTTPException):
    code = 401
    reason: str

    def __init__(self, reason):
        self.reason = reason

    @property
    def description(self):
        return f"{self.reason}"


@routes.errorhandler(HTTPException)
def common_error_handler(e):
    response_body = {
        "name": e.name,
        "description": e.description,
    }
    return response_body, e.code


routes.register_error_handler(JsonToDtoParsingError, common_error_handler)
routes.register_error_handler(JwtError, common_error_handler)
routes.register_error_handler(UnauthorizedError, common_error_handler)
routes.register_error_handler(UserAlreadyExistsError, common_error_handler)
