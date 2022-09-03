from flask import Flask

app = Flask("PLMS-App")


def validate_content_type(content_type: str):
    return content_type == "application/json"
