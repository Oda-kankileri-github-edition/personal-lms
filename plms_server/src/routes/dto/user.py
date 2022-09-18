from dataclasses import dataclass


@dataclass(frozen=True)
class RegisterRequest:
    username: str
    first_name: str
    last_name: str
    email: str
    password: str


@dataclass(frozen=True)
class UserDto:
    id: str
    username: str
    firstName: str
    lastName: str
    email: str
    avatar: str


@dataclass(frozen=True)
class LoginRequest:
    username: str
    password: str


@dataclass(frozen=True)
class LoginResponse:
    token: str
    expiresIn: int
    user: UserDto


@dataclass(frozen=True)
class RenewTokenResponse:
    token: str
    expiresIn: int


@dataclass(frozen=True)
class UserAvailabilityResponse:
    available: bool
    message: str
