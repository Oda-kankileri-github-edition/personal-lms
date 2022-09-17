from werkzeug.exceptions import HTTPException

from . import routes
from ..service.exceptions import JsonToDtoParsingError


class UserAlreadyExistsError(HTTPException):
    def __init__(self, username):
        self.username = username

    @property
    def code(self):
        return 409

    @property
    def description(self):
        return f"User '{self.username}' already exists"


@routes.errorhandler(HTTPException)
def handle_409(e):
    response_body = {
        "name": e.name,
        "description": e.description,
    }
    return response_body, e.code


@routes.errorhandler(HTTPException)
def handle_400(e):
    response_body = {
        "name": e.name,
        "description": e.description,
    }
    return response_body, e.code


routes.register_error_handler(UserAlreadyExistsError, handle_409)
routes.register_error_handler(JsonToDtoParsingError, handle_400)
