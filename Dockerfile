# syntax=docker/dockerfile:1.7

FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
RUN corepack enable && yarn install --immutable

COPY vite.config.js ./
COPY scripts/city-stars-layout.mjs ./scripts/city-stars-layout.mjs
COPY src/ ./src/

RUN yarn vite build

FROM nginxinc/nginx-unprivileged:1.30.4-alpine-slim AS runtime

USER root

RUN rm -rf /usr/share/nginx/html

COPY --chown=101:0 --chmod=664 docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/ /usr/share/nginx/html/

USER 101:101

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:8080/_infra/healthcheck || exit 1
