FROM python:3.11.3

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1
ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /app

COPY Pipfile Pipfile.lock /app/
RUN pip install --upgrade pip setuptools pipenv
RUN pipenv install --deploy --system --dev
COPY . /app
WORKDIR /app/fit_tracker
CMD python manage.py runserver 0.0.0.0:8000

