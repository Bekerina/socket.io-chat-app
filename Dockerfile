FROM ubuntu:20.04

ENV TZ=UTC
ENV DEBIAN_FRONTEND="noninteractive"

RUN apt update && \
    apt install -y nodejs npm &&\
    apt clean

RUN mkdir -p /opt/chat
COPY . /opt/chat
WORKDIR /opt/chat
RUN npm install
CMD ["/usr/bin/node","/opt/chat/index.js"]
