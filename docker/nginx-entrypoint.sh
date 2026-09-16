#!/usr/bin/env sh
set -eu

if [ -z "${SSL_DOMAIN:-}" ]; then
  echo "SSL_DOMAIN is required." >&2
  exit 1
fi

APP_BUILD_ID="dev"
if [ -f /usr/share/nginx/html/version.json ]; then
  APP_BUILD_ID="$(sed -n 's/.*"buildId"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' /usr/share/nginx/html/version.json | head -n1)"
  APP_BUILD_ID="${APP_BUILD_ID:-dev}"
fi
export APP_BUILD_ID
echo "App build id: ${APP_BUILD_ID}"

TEMPLATE="/etc/nginx/templates/http.conf.template"
if [ -f "/etc/letsencrypt/live/${SSL_DOMAIN}/fullchain.pem" ] && [ -f "/etc/letsencrypt/live/${SSL_DOMAIN}/privkey.pem" ]; then
  TEMPLATE="/etc/nginx/templates/default.conf.template"
  echo "Using TLS certificate for ${SSL_DOMAIN}"
else
  echo "No Let's Encrypt certificate yet; serving HTTP for ACME"
fi

envsubst '${SSL_DOMAIN} ${APP_BUILD_ID}' < "${TEMPLATE}" > /etc/nginx/conf.d/default.conf
exec nginx -g 'daemon off;'
