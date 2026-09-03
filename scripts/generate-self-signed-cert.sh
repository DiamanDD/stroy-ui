#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CERT_DIR="${CERT_DIR:-${ROOT_DIR}/certs}"
DAYS="${CERT_DAYS:-825}"
CN="${1:-localhost}"

mkdir -p "$CERT_DIR"

if [[ -f "${CERT_DIR}/fullchain.pem" && -f "${CERT_DIR}/privkey.pem" ]]; then
  echo "Certificate already exists in ${CERT_DIR}, skipping."
  exit 0
fi

if ! command -v openssl >/dev/null 2>&1; then
  echo "openssl is required to generate a self-signed certificate." >&2
  exit 1
fi

SAN="DNS:localhost,DNS:${CN}"
if [[ "${CN}" =~ ^[0-9.]+$ ]]; then
  SAN="IP:${CN},${SAN}"
else
  SAN="DNS:${CN},${SAN}"
fi

openssl req -x509 -nodes -days "${DAYS}" -newkey rsa:2048 \
  -keyout "${CERT_DIR}/privkey.pem" \
  -out "${CERT_DIR}/fullchain.pem" \
  -subj "/CN=${CN}/O=StroyMarket/C=RU" \
  -addext "subjectAltName=${SAN}"

chmod 644 "${CERT_DIR}/fullchain.pem"
chmod 600 "${CERT_DIR}/privkey.pem"

echo "Generated self-signed certificate for ${CN} in ${CERT_DIR}"
