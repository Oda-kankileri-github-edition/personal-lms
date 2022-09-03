from src.database.entity import create_database
from src.service.utils import app


if __name__ == '__main__':
    create_database()
    app.run(port=8080, debug=True)  # TODO get port from config
