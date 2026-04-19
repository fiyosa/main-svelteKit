#!/bin/bash

pnpm build

docker build -t portfolio .
docker stop portfolio 2>/dev/null || true
docker rm portfolio 2>/dev/null || true

docker run -d \
  --name portfolio \
  --restart always \
  -p 8000:8000 \
  --network proxy \
  --env-file /root/docker/portfolio/.env \
  portfolio

docker image prune -f

echo "Deploy success"