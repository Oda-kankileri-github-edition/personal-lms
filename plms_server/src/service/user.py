from flask import request

from .utils import app, validate_content_type


@app.route('/api/register', methods=["POST"])
def register_user():
    content_type = request.headers.get('Content-Type')
    if not validate_content_type(content_type):
        raise Exception("Only application/json is allowed")
    return request.get_json()




