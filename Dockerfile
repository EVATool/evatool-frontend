FROM nginx:1.17.1-alpine
EXPOSE 80
COPY default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY /dist/evatool-frontend /usr/share/nginx/html

COPY /replace_env_vars.sh /replace_env_vars.sh
CMD ["sh", "replace_env_vars.sh"]
