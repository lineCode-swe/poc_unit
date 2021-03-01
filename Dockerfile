FROM node:lts-alpine3.12

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY src/index.js src/index.js

RUN ["npm", "install"]

ENTRYPOINT ["npm", "start"]