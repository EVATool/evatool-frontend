find '/usr/share/nginx/html' -name '*.js' -exec sed -i -e 's,SERVER_PROTOCOL,'"$SERVER_PROTOCOL"',g' {} \;
find '/usr/share/nginx/html' -name '*.js' -exec sed -i -e 's,SERVER_DOMAIN,'"$SERVER_DOMAIN"',g' {} \;
find '/usr/share/nginx/html' -name '*.js' -exec sed -i -e 's,BACKEND_PORT,'"$BACKEND_PORT"',g' {} \;
find '/usr/share/nginx/html' -name '*.js' -exec sed -i -e 's,DEFAULT_LANGUAGE,'"$DEFAULT_LANGUAGE"',g' {} \;
find '/usr/share/nginx/html' -name '*.js' -exec sed -i -e 's,USE_DEFAULT_OVER_BROWSER_LANGUAGE,'"$USE_DEFAULT_OVER_BROWSER_LANGUAGE"',g' {} \;
find '/usr/share/nginx/html' -name '*.js' -exec sed -i -e 's,AUTH_ENABLED,'"$AUTH_ENABLED"',g' {} \;
find '/usr/share/nginx/html' -name '*.js' -exec sed -i -e 's,AUTH_MULTI_TENANCY_ENABLED,'"$AUTH_MULTI_TENANCY_ENABLED"',g' {} \;
find '/usr/share/nginx/html' -name '*.js' -exec sed -i -e 's,AUTH_REGISTRATION_ENABLED,'"$AUTH_REGISTRATION_ENABLED"',g' {} \;
find '/usr/share/nginx/html' -name '*.js' -exec sed -i -e 's,AUTH_PORT,'"$AUTH_PORT"',g' {} \;
find '/usr/share/nginx/html' -name '*.js' -exec sed -i -e 's,LOG_LEVEL,'"$LOG_LEVEL"',g' {} \;
nginx -g "daemon off;"
