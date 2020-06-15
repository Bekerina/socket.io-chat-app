FROM ubuntu:20.04

ENV TZ=UTC
ENV DEBIAN_FRONTEND="noninteractive"

RUN apt update && \
    apt install -y python-pip &&\
    apt clean

RUN mkdir -p /opt/test
COPY . /opt/test

WORKDIR /opt/test
RUN pip install -r requirements.txt

CMD ["/opt/test/test.py"]
