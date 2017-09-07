FROM node:8

RUN mkdir /app
WORKDIR /app

ADD ./ ./

## api
WORKDIR /app/api
RUN yarn install
EXPOSE 3000

## ui
WORKDIR /app/ui
RUN yarn install \
    && yarn build
EXPOSE 8080

## run api and ui
CMD bash /app/docker-entry.sh
