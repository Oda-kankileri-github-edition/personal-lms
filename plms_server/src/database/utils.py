from enum import auto, Enum
import os
import logging

from sqlalchemy import create_engine
from sqlalchemy.orm import Session

logger = logging.getLogger(__file__)


DEFAULT_USERNAME = "postgres"
DEFAULT_PASSWORD = "admin"
DEFAULT_URL = "localhost"
DEFAULT_PORT = "5432"
DEFAULT_DATABASE = "plms"


def get_env_variable(variable_name, default="") -> str:
    logger.debug(f"Retrieving environment variable: {variable_name}")
    return os.environ.get(variable_name, default)


def get_connection_string() -> str:
    username = get_env_variable("POSTGRES_USER", DEFAULT_USERNAME)
    password = get_env_variable("POSTGRES_PASSWORD", DEFAULT_PASSWORD)
    url = get_env_variable("DB_URL", DEFAULT_URL)
    port = get_env_variable("DB_PORT", DEFAULT_PORT)
    database = get_env_variable("POSTGRES_DB", DEFAULT_DATABASE)

    return f"postgresql://{username}:{password}@{url}:{port}/{database}"


def get_engine():
    logger.info("Creating database engine")
    conn_string = get_connection_string()
    print(f"Connection String: {conn_string}")
    return create_engine(conn_string, echo=True, future=True)


engine = get_engine()


class StatusEnum(Enum):
    WANT_TO_READ = auto()
    READING = auto()
    READ = auto()


def get_session():
    return Session(engine)
