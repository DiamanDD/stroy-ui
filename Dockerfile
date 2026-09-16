FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_MAX_URL
ENV VITE_MAX_URL=$VITE_MAX_URL
ARG GITHUB_SHA
ENV GITHUB_SHA=$GITHUB_SHA

RUN npm run build

FROM nginx:1.27-alpine

RUN apk add --no-cache gettext

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY nginx.http.conf.template /etc/nginx/templates/http.conf.template
COPY docker/nginx-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

CMD ["/docker-entrypoint.sh"]
