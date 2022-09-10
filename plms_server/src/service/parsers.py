from abc import ABC, abstractmethod
from typing import Dict

from plms_server.src.routes.dto.user import RegisterRequest
from plms_server.src.routes.exceptions import JsonToDtoParsingError


class JsonToObjectMapper(ABC):
    @staticmethod
    @abstractmethod
    def from_json(json_data: Dict):
        pass


class RegisterUserMapper(JsonToObjectMapper):
    @staticmethod
    def from_json(json_data: dict) -> RegisterRequest:
        try:
            request = RegisterRequest(
                username=json_data["username"],
                first_name=json_data["first_name"],
                last_name=json_data["last_name"],
                email=json_data["email"],
                password=json_data["password"]
            )
            return request
        except KeyError as e:
            raise JsonToDtoParsingError()
