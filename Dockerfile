# syntax=docker.io/docker/dockerfile:1

FROM node:lts-alpine AS base

# Stage 1: Install dependencies
FROM base AS deps

WORKDIR /app

COPY package.json package-lock.json*  ./

RUN npm ci

# Stage 2: Build the application
FROM base AS builder

ARG SERVICE_ID
ARG TEMPLATE_ID
ARG PUBLIC_KEY

ENV NEXT_PUBLIC_SERVICE_ID=$SERVICE_ID
ENV NEXT_PUBLIC_TEMPLATE_ID=$TEMPLATE_ID
ENV NEXT_PUBLIC_PUBLIC_KEY=$PUBLIC_KEY


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

ENV PORT=3001

EXPOSE 3001

CMD ["node", "server.js"]