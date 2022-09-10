import json
import logging
import time
from functools import wraps


logger = logging.getLogger("Route Handler")


def router_handler(func):
    @wraps(func)
    def wrapped_func(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        result = json.dumps(result.__dict__)
        logger.info(f"Response returned in {time.time() - start} seconds.")
        return result
    return wrapped_func
