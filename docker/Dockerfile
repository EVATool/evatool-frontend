FROM nginx:1.17.1-alpine
ENV HOST_URL='0.0.0.0'
ENV BACKEND_PORT='443'
EXPOSE 80
COPY default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY /dist/evatool-frontend /usr/share/nginx/html
