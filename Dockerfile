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

WORKDIR /install
COPY Gemfile* /install/
COPY ./package.json /install/
RUN bundle install \
  && npm install

EXPOSE 4000 35729
ENTRYPOINT ["gulp"]
CMD ["default"]
