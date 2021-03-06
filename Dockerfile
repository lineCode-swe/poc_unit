FROM node:15-alpine3.12

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY src/index.js src/index.js

RUN ["npm", "install"]

ENTRYPOINT ["npm", "start"]

# Run in shell with:
# docker run --rm --network host --interactive --tty <image_name>