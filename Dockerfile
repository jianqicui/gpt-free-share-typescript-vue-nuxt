FROM node:20-alpine AS builder

WORKDIR /app

COPY src src
COPY nuxt.config.ts .
COPY package-lock.json .
COPY package.json .
COPY tsconfig.json .

RUN npm install
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/.output .output

ENTRYPOINT ["node", ".output/server/index.mjs"]
