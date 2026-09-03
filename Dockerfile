FROM node:18.17.0 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_MAX_URL
ENV VITE_MAX_URL=$VITE_MAX_URL

RUN npm run build

FROM nginx:1.21.0-alpine

COPY --from=builder app/dist /user/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]

