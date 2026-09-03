#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CERT_DIR="${ROOT_DIR}/certs"
LE_DIR="${CERT_DIR}/letsencrypt"
WEBROOT="${ROOT_DIR}/certbot/www"
DOMAIN="$(printf '%s' "${SSL_DOMAIN:-}" | tr -d '\r\n' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
EMAIL="$(printf '%s' "${CERTBOT_EMAIL:-}" | tr -d '\r\n' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
FALLBACK_HOST="$(printf '%s' "${1:-localhost}" | tr -d '\r\n' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//' | sed 's/^\[//;s/\]$//')"

mkdir -p "${CERT_DIR}" "${WEBROOT}" "${LE_DIR}"

copy_letsencrypt_certs() {
  local domain="$1"
  local source="${LE_DIR}/live/${domain}"

  if [[ ! -f "${source}/fullchain.pem" || ! -f "${source}/privkey.pem" ]]; then
    return 1
  fi

  cp -L "${source}/fullchain.pem" "${CERT_DIR}/fullchain.pem"
  cp -L "${source}/privkey.pem" "${CERT_DIR}/privkey.pem"
  chmod 644 "${CERT_DIR}/fullchain.pem"
  chmod 600 "${CERT_DIR}/privkey.pem"
  echo "Using Let's Encrypt certificate for ${domain}"
}

ensure_self_signed() {
  if [[ -f "${CERT_DIR}/fullchain.pem" && -f "${CERT_DIR}/privkey.pem" ]]; then
    return
  fi

  "${ROOT_DIR}/scripts/generate-self-signed-cert.sh" "${FALLBACK_HOST}"
}

if [[ -n "${DOMAIN}" && -n "${EMAIL}" ]]; then
  echo ">>> SSL domain: ${DOMAIN}"

  if [[ -f "${LE_DIR}/live/${DOMAIN}/fullchain.pem" ]]; then
    copy_letsencrypt_certs "${DOMAIN}" || ensure_self_signed
  else
    ensure_self_signed
  fi

  if docker compose ps --status running app >/dev/null 2>&1; then
    echo ">>> requesting Let's Encrypt certificate"
    docker compose run --rm certbot certonly \
      --webroot -w /var/www/certbot \
      -d "${DOMAIN}" \
      --email "${EMAIL}" \
      --agree-tos \
      --non-interactive \
      --keep-until-expiring \
      --preferred-challenges http || {
        echo "Let's Encrypt request failed; keeping fallback certificate." >&2
      }

    if copy_letsencrypt_certs "${DOMAIN}"; then
      docker compose exec -T app nginx -s reload || true
    fi
  else
    echo "App container is not running yet; certificate will be requested after startup."
  fi
else
  echo ">>> SSL_DOMAIN or CERTBOT_EMAIL is not set; using self-signed certificate"
  ensure_self_signed
fi
