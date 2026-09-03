#!/usr/bin/env sh
set -eu

DOMAIN="${RENEWED_LINEAGE:-${SSL_DOMAIN:-}}"

if [ -z "${DOMAIN}" ]; then
  exit 0
fi

if [ -f "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" ] && [ -f "/etc/letsencrypt/live/${DOMAIN}/privkey.pem" ]; then
  cp -L "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" /certs/fullchain.pem
  cp -L "/etc/letsencrypt/live/${DOMAIN}/privkey.pem" /certs/privkey.pem
  chmod 644 /certs/fullchain.pem
  chmod 600 /certs/privkey.pem
fi
