FROM node:14.21.3-buster-slim

WORKDIR /tmp
RUN apt-get update && apt-get -y upgrade && apt-get -y dist-upgrade && apt-get install -y alien libaio1

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
COPY . .