#!/usr/bin/env sh
set -eu

if [ -z "${SSL_DOMAIN:-}" ]; then
  echo "SSL_DOMAIN is required." >&2
  exit 1
fi

TEMPLATE="/etc/nginx/templates/http.conf.template"
if [ -f "/etc/letsencrypt/live/${SSL_DOMAIN}/fullchain.pem" ] && [ -f "/etc/letsencrypt/live/${SSL_DOMAIN}/privkey.pem" ]; then
  TEMPLATE="/etc/nginx/templates/default.conf.template"
  echo "Using TLS certificate for ${SSL_DOMAIN}"
else
  echo "No Let's Encrypt certificate yet; serving HTTP for ACME"
fi

envsubst '${SSL_DOMAIN}' < "${TEMPLATE}" > /etc/nginx/conf.d/default.conf
exec nginx -g 'daemon off;'
