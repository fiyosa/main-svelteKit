#!/bin/bash

pnpm build

docker build -t portfolio_image .
docker stop portfolio
docker rm portfolio

docker run -d \
  --name portfolio \
  --restart always \
  -p 8000:8000 \
  --env-file /root/docker/portfolio/.env \
  portfolio_image

docker image prune -f

echo "Deploy success"