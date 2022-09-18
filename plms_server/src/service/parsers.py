from src.routes.dto.user import RegisterRequest, LoginRequest
from src.routes.exceptions import JsonToDtoParsingError


class UserServiceMapper:
    @staticmethod
    def map_register_request(json_data: dict) -> RegisterRequest:
        try:
            request = RegisterRequest(
                username=json_data["username"],
                first_name=json_data["first_name"],
                last_name=json_data["last_name"],
                email=json_data["email"],
                password=json_data["password"]
            )
            return request
        except KeyError:
            raise JsonToDtoParsingError()

    @staticmethod
    def map_login_request(json_data: dict) -> LoginRequest:
        try:
            request = LoginRequest(
                username=json_data["username"],
                password=json_data["password"]
            )
            return request
        except KeyError:
            raise JsonToDtoParsingError()

