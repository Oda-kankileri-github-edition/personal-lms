from flask import request

from . import routes
from .dto.common import SuccessResponse
from .dto.user import RegisterRequest, UserAvailabilityResponse
from .utils.handlers import router_handler
from ..service.user import get_user_service
from ..service.parsers import RegisterUserMapper
from plms_server.src.routes.utils.validators import validate_content_type


@routes.route('/api/register', methods=["POST"])
@router_handler
def register_user():
    content_type = request.headers.get('Content-Type')
    if not validate_content_type(content_type):
        raise Exception("Only application/json is allowed")
    register_request: RegisterRequest = RegisterUserMapper.from_json(request.get_json())

    get_user_service().save_user(register_request)
    return SuccessResponse("User has been successfully registered")


@routes.route('/api/check-username', methods=["POST"])
@router_handler
def is_user_exist():
    is_username_available = not get_user_service().is_user_exists(request.get_json()['username'])
    message = 'Username is available' if is_username_available else 'Username is already taken'
    return UserAvailabilityResponse(is_username_available, message)
