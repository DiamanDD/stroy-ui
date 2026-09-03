#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CERT_DIR="${CERT_DIR:-${ROOT_DIR}/certs}"
DAYS="${CERT_DAYS:-825}"
CN="$(printf '%s' "${1:-localhost}" | tr -d '\r\n' | sed 's/^[[:space:]]*//;s/[[:space:]]*$//' | sed 's/^\[//;s/\]$//')"

mkdir -p "$CERT_DIR"

if [[ -f "${CERT_DIR}/fullchain.pem" && -f "${CERT_DIR}/privkey.pem" ]]; then
  echo "Certificate already exists in ${CERT_DIR}, skipping."
  exit 0
fi

if ! command -v openssl >/dev/null 2>&1; then
  echo "openssl is required to generate a self-signed certificate." >&2
  exit 1
fi

is_valid_ipv4() {
  local ip="$1"
  [[ "$ip" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]] || return 1

  local IFS='.'
  local octet
  for octet in $ip; do
    [[ "$octet" -le 255 ]] || return 1
  done

  return 0
}

is_valid_dns() {
  local name="$1"
  [[ ${#name} -ge 1 && ${#name} -le 253 ]] || return 1
  [[ "$name" =~ ^[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?)*$ ]]
}

if [[ -z "$CN" ]]; then
  CN="localhost"
fi

SAN="DNS:localhost"
if [[ "$CN" =~ ^[0-9.]+$ ]]; then
  if is_valid_ipv4 "$CN"; then
    SAN="IP:${CN},DNS:localhost"
  else
    echo "Warning: '${CN}' looks like an IP address but is invalid; using localhost." >&2
    CN="localhost"
  fi
elif is_valid_dns "$CN"; then
  SAN="DNS:${CN},DNS:localhost"
else
  echo "Warning: '${CN}' is not a valid DNS name; using localhost." >&2
  CN="localhost"
fi

openssl req -x509 -nodes -days "${DAYS}" -newkey rsa:2048 \
  -keyout "${CERT_DIR}/privkey.pem" \
  -out "${CERT_DIR}/fullchain.pem" \
  -subj "/CN=${CN}/O=StroyMarket/C=RU" \
  -addext "subjectAltName=${SAN}"

chmod 644 "${CERT_DIR}/fullchain.pem"
chmod 600 "${CERT_DIR}/privkey.pem"

echo "Generated self-signed certificate for ${CN} in ${CERT_DIR}"
