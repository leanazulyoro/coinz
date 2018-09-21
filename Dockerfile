FROM node:8.11.2-alpine
WORKDIR /app
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
ARG PORT
COPY ./package.json ./
RUN apk add --no-cache libpng-dev libjpeg
RUN apk add --no-cache --virtual build-dependencies \
        build-base \
        autoconf \
        automake \
        python \
        libtool \
        icu-dev \
        jpeg-dev \
        nasm \
        pango-dev \
        giflib-dev \
        gd-dev \
        && npm install \
        && apk del build-dependencies
EXPOSE $PORT 9229
CMD npm run start:dev
