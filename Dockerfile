# syntax=docker.io/docker/dockerfile:1

FROM node:lts-alpine AS base

# Stage 1: Install dependencies
FROM base AS deps

WORKDIR /app

COPY package.json package-lock.json*  ./

RUN npm ci

# Stage 2: Build the application
FROM base AS builder

ARG MAIL_URL
ARG EMAIL_FROM
ARG EMAIL_TO

ENV MAIL_URL=$MAIL_URL
ENV EMAIL_FROM=$EMAIL_FROM
ENV EMAIL_TO=$EMAIL_TO

RUN --mount=type=secret,id=jwt_token \
    export JWT_TOKEN=$(cat /run/secrets/jwt_token) && \
    echo "JWT_TOKEN=$JWT_TOKEN"

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build

# Stage 3: Production server
FROM base AS runner

WORKDIR /app

COPY --from=builder /app/public ./public

COPY --from=builder /app/messages ./messages

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

CMD ["node", "server.js"]