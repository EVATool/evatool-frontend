find '/usr/share/nginx/html' -name '*.js' -exec sed -i -e 's,BACKEND_URL,'"$BACKEND_URL"',g' {} \;
find '/usr/share/nginx/html' -name '*.js' -exec sed -i -e 's,BACKEND_PORT,'"$BACKEND_PORT"',g' {} \;
nginx -g "daemon off;"
