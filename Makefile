TAG ?= portfolio
PORT ?= 3000

docker-build:
		docker build -t $(TAG) .
docker-run:
		docker run -p $(PORT):3000 $(TAG)
docker-start:
		docker compose up -d --build
docker-stop:
		docker compose down