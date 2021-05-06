FROM nginx:1.17.1-alpine as builder
ENV HOST_URL=${HOST_URL}
ENV BACKEND_PORT=${BACKEND_PORT}
EXPOSE 80
COPY default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY /dist/evatool-frontend /usr/share/nginx/html

COPY --from=builder /replace_env_vars.sh /
CMD ["sh", "replace_env_vars.sh"]
