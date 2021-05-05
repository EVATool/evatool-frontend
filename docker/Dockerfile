FROM nginx:1.17.1-alpine
ENV HOST_URL
ENV BACKEND_PORT
EXPOSE 80
COPY default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY /dist/evatool-frontend /usr/share/nginx/html
