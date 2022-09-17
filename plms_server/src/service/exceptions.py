from werkzeug.exceptions import HTTPException


class JsonToDtoParsingError(HTTPException):
    code = 400
    description = "Request has missing fields"
    name = "Bad Request"
