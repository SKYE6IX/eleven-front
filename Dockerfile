# syntax=docker.io/docker/dockerfile:1

FROM node:lts-alpine AS base

# Gather all files
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

COPY package.json package-lock.json*  ./

RUN npm ci

COPY src ./src

COPY messages ./messages

COPY public ./public

COPY next.config.ts .

COPY env.d.ts .

COPY tsconfig.json .

RUN npm run build

# Production image, copy all the files
FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs

RUN adduser --system --uid 1001 nextjs

USER nextjs

COPY --from=builder /app/public ./public

COPY --from=builder /app/messages ./messages

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

CMD ["node", "server.js"]