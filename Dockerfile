FROM node:24-alpine

WORKDIR /app

COPY build ./build
COPY package.json ./
COPY node_modules ./node_modules

EXPOSE 8000

ENV PORT=8000

CMD ["node", "build"]