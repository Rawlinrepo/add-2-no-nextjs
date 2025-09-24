FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20-alpine AS client

WORKDIR /app

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

EXPOSE 3000

CMD ["node","server.js"]

FROM nginx:alpine 

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=client /app/.next/static /ust/share/nginx/html/_next/static
COPY --from=client /app/public /ust/share/nginx/html/public

