#!/usr/bin/env sh
set -eu

if [ -z "${SSL_DOMAIN:-}" ]; then
  echo "SSL_DOMAIN is required." >&2
  exit 1
fi

if [ ! -f "/etc/letsencrypt/live/${SSL_DOMAIN}/fullchain.pem" ] || [ ! -f "/etc/letsencrypt/live/${SSL_DOMAIN}/privkey.pem" ]; then
  echo "Let's Encrypt certificate not found for ${SSL_DOMAIN}." >&2
  exit 1
fi

envsubst '${SSL_DOMAIN}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf
exec nginx -g 'daemon off;'
