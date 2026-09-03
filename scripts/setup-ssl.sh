#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LE_DIR="${ROOT_DIR}/certs/letsencrypt"
WEBROOT="${ROOT_DIR}/certbot/www"
DOMAIN="$(printf '%s' "${SSL_DOMAIN:-}" | tr -d '\r\n' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
EMAIL="$(printf '%s' "${CERTBOT_EMAIL:-}" | tr -d '\r\n' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"

if [[ -z "${DOMAIN}" || -z "${EMAIL}" ]]; then
  echo "SSL_DOMAIN and CERTBOT_EMAIL are required." >&2
  exit 1
fi

mkdir -p "${WEBROOT}" "${LE_DIR}"

CERT_FILE="${LE_DIR}/live/${DOMAIN}/fullchain.pem"
if [[ -f "${CERT_FILE}" ]]; then
  echo "Let's Encrypt certificate already exists for ${DOMAIN}"
  exit 0
fi

echo ">>> requesting Let's Encrypt certificate for ${DOMAIN}"

cd "${ROOT_DIR}"

reset_stale_account() {
  echo ">>> resetting stale Let's Encrypt account"
  rm -rf "${LE_DIR}/accounts"
}

request_cert() {
  if docker compose ps --status running app >/dev/null 2>&1; then
    docker compose run --rm --entrypoint certbot certbot certonly \
      --webroot -w /var/www/certbot \
      -d "${DOMAIN}" \
      --email "${EMAIL}" \
      --agree-tos \
      --non-interactive \
      --keep-until-expiring \
      --preferred-challenges http
  else
    docker compose run --rm -p 80:80 --entrypoint certbot certbot certonly \
      --standalone \
      -d "${DOMAIN}" \
      --email "${EMAIL}" \
      --agree-tos \
      --non-interactive \
      --keep-until-expiring \
      --preferred-challenges http
  fi
}

if ! request_cert; then
  echo ">>> first Let's Encrypt attempt failed; retrying with a new account"
  reset_stale_account
  request_cert
fi

if [[ ! -f "${CERT_FILE}" ]]; then
  echo "Failed to obtain Let's Encrypt certificate for ${DOMAIN}" >&2
  exit 1
fi

echo ">>> certificate obtained for ${DOMAIN}"
