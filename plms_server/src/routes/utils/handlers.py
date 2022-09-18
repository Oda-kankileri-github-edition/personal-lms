import json
import logging
import time
import uuid
from functools import wraps
from typing import Dict

logger = logging.getLogger("Route Handler")


def _nested_object_parser(input_object) -> Dict:
    result_dict = {}
    for key, value in input_object.__dict__.items():
        if value is None:
            continue
        if type(value) is uuid.UUID:
            value = str(value)
        if not type(value) in (bool, int, str, ):
            value = _nested_object_parser(value)
        result_dict[key] = value
    return result_dict


def router_handler(func):
    @wraps(func)
    def wrapped_func(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        result = json.dumps(_nested_object_parser(result), indent=4)
        logger.info(f"Response returned in {time.time() - start} seconds.")
        return result
    return wrapped_func
