FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["pnpm","start"]
