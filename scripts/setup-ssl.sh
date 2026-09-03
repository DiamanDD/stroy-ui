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
cd "${ROOT_DIR}"

CERT_FILE="${LE_DIR}/live/${DOMAIN}/fullchain.pem"
if [[ -f "${CERT_FILE}" ]]; then
  echo "Let's Encrypt certificate already exists for ${DOMAIN}"
  exit 0
fi

is_app_running() {
  docker compose ps --status running --format '{{.Service}}' 2>/dev/null | grep -qx 'app'
}

is_stale_account_error() {
  grep -Eq 'Unable to validate JWS|Account ".*" not found'
}

reset_stale_account() {
  echo ">>> resetting stale Let's Encrypt account"
  rm -rf "${LE_DIR}/accounts"
}

run_certbot() {
  local mode="$1"
  if [[ "${mode}" == "webroot" ]]; then
    docker compose run --rm --no-deps --entrypoint certbot certbot certonly \
      --webroot -w /var/www/certbot \
      -d "${DOMAIN}" \
      --email "${EMAIL}" \
      --agree-tos \
      --non-interactive \
      --keep-until-expiring \
      --preferred-challenges http
    return
  fi

  docker compose run --rm --no-deps --publish 80:80 --entrypoint certbot certbot certonly \
    --standalone \
    -d "${DOMAIN}" \
    --email "${EMAIL}" \
    --agree-tos \
    --non-interactive \
    --keep-until-expiring \
    --preferred-challenges http
}

request_cert() {
  local mode="$1"
  local output=""
  local status=0

  set +e
  output="$(run_certbot "${mode}" 2>&1)"
  status=$?
  set -e
  printf '%s\n' "${output}"

  if [[ "${status}" -eq 0 ]]; then
    return 0
  fi

  if printf '%s\n' "${output}" | is_stale_account_error; then
    reset_stale_account
    run_certbot "${mode}"
    return
  fi

  return "${status}"
}

if is_app_running; then
  echo ">>> requesting Let's Encrypt certificate for ${DOMAIN} via webroot"
  request_cert webroot
else
  echo ">>> requesting Let's Encrypt certificate for ${DOMAIN} via standalone"
  request_cert standalone
fi

if [[ ! -f "${CERT_FILE}" ]]; then
  echo "Failed to obtain Let's Encrypt certificate for ${DOMAIN}." >&2
  echo "Let's Encrypt must reach http://${DOMAIN}/.well-known/acme-challenge/ on port 80." >&2
  exit 1
fi

echo ">>> certificate obtained for ${DOMAIN}"
