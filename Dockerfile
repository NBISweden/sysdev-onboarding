FROM nginx:alpine as BUILDER
COPY ./src /usr/share/nginx/html