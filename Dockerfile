FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN apt-get update \ 
    && apt-get install -y default-libmysqlclient-dev build-essential python3 \
    && pip3 install -r requirements.txt
COPY . /code/
