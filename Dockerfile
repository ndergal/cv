FROM alpine:latest
MAINTAINER Damien DUPORTAL <damien.duportal@gmail.com>

RUN apk --update add \
        nodejs \
        ruby \
        ruby-bundler \
        ruby-io-console \
    && npm install -g gulp \
    && rm -rf /var/cache/apk/*

WORKDIR /app

COPY Gemfile* /app/
RUN bundle install
COPY app.rb /app/

COPY ./package.json /app/
RUN npm install

COPY ./src /app/src

EXPOSE 4000 35729
CMD ["gulp"]
