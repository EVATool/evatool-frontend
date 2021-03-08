FROM nginx:1.17.1-alpine
EXPOSE 80
COPY ./conf/default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY /dist /usr/share/nginx/html
