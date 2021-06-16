find '/usr/share/nginx/html' -name '*.js' -exec sed -i -e 's,BACKEND_URL,'"$BACKEND_URL"',g' {} \;
find '/usr/share/nginx/html' -name '*.js' -exec sed -i -e 's,BACKEND_PORT,'"$BACKEND_PORT"',g' {} \;
find '/usr/share/nginx/html' -name '*.js' -exec sed -i -e 's,DEFAULT_LANGUAGE,'"$DEFAULT_LANGUAGE"',g' {} \;
find '/usr/share/nginx/html' -name '*.js' -exec sed -i -e 's,USE_DEFAULT_OVER_BROWSER_LANGUAGE,'"$USE_DEFAULT_OVER_BROWSER_LANGUAGE"',g' {} \;
nginx -g "daemon off;"
