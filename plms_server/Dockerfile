FROM python:3.8-slim-buster

COPY . .
RUN apt-get update && apt-get install -y gcc libpq-dev
RUN pip install --upgrade pip && pip install -r requirements.txt
EXPOSE 8080
ENTRYPOINT ["python3", "run.py"]