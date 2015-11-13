FROM loicmahieu/alpine-wkhtmltopdf
MAINTAINER Damien DUPORTAL <damien.duportal@gmail.com>

RUN apk --update add \
    nodejs \
    php-phar \
    php-ctype \
    && npm install -g napa gulp

COPY ./package.json /app/
WORKDIR /app
RUN npm install
EXPOSE 4000 35729
CMD ["gulp"]
