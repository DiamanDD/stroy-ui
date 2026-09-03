#!/usr/bin/env sh
set -eu

DOMAIN="${SSL_DOMAIN:-}"
LE_DIR="/etc/letsencrypt/live/${DOMAIN}"

if [ -n "${DOMAIN}" ] && [ -f "${LE_DIR}/fullchain.pem" ] && [ -f "${LE_DIR}/privkey.pem" ]; then
  cp -L "${LE_DIR}/fullchain.pem" /etc/nginx/certs/fullchain.pem
  cp -L "${LE_DIR}/privkey.pem" /etc/nginx/certs/privkey.pem
fi

exec nginx -g 'daemon off;'
