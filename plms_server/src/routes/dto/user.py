from dataclasses import dataclass


@dataclass(frozen=True)
class RegisterRequest:
    username: str
    first_name: str
    last_name: str
    email: str
    password: str
