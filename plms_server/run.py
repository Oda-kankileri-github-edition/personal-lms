from flask import Flask

from src.database.entity import create_database
from src.routes import *


app = Flask("PLMS-App")
app.register_blueprint(routes)


if __name__ == '__main__':
    create_database()
    app.run(port=8080, debug=True)  # TODO get port from config
