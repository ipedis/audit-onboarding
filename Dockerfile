# syntax=docker/dockerfile:1.7

FROM node:26-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
RUN corepack enable && yarn install --immutable

COPY vite.config.js ./
COPY scripts/city-stars-layout.mjs ./scripts/city-stars-layout.mjs
COPY src/ ./src/

RUN yarn vite build

FROM nginx:1.31.9-alpine-slim AS runtime

USER root

# Run the official image unprivileged: no "user" directive, pid and temp paths under /tmp,
# and /etc/nginx + cache owned by uid 101 (same setup as nginxinc/nginx-unprivileged).
RUN rm -rf /usr/share/nginx/html \
    && sed -i '/user  nginx;/d' /etc/nginx/nginx.conf \
    && sed -i 's,\(/var\)\{0\,1\}/run/nginx.pid,/tmp/nginx.pid,' /etc/nginx/nginx.conf \
    && sed -i "/^http {/a \    proxy_temp_path /tmp/proxy_temp;\n    client_body_temp_path /tmp/client_temp;\n    fastcgi_temp_path /tmp/fastcgi_temp;\n    uwsgi_temp_path /tmp/uwsgi_temp;\n    scgi_temp_path /tmp/scgi_temp;\n" /etc/nginx/nginx.conf \
    && chown -R 101:0 /var/cache/nginx /etc/nginx \
    && chmod -R g+w /var/cache/nginx /etc/nginx

COPY --chown=101:0 --chmod=664 docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/ /usr/share/nginx/html/

USER 101:101

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:8080/_infra/healthcheck || exit 1
