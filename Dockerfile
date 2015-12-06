FROM alpine:latest
MAINTAINER Damien DUPORTAL <damien.duportal@gmail.com>

RUN apk --update add \
        git \
        nodejs \
        ruby \
        ruby-bundler \
        ruby-io-console \
    && npm install -g gulp \
    && rm -rf /var/cache/apk/*

WORKDIR /app
COPY Gemfile* /app/
COPY ./package.json /app/
RUN bundle install \
  && npm install

WORKDIR /app/src

EXPOSE 4000 35729
ENTRYPOINT ["gulp"]
CMD ["default"]
