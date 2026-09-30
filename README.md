# Load Efficiency PWA - Docker Deployment

A mobile-friendly PWA for calculating the total hours needed to maintain a target load efficiency of 0.67.

Formula:

`Hours = (Runs + Diversions) / 0.67 + (0.5 x Backhauls)`

## Start with Docker Compose

From this folder run:

```bash
docker compose up -d --build
```

Then open:

`http://SERVER-IP:8080`

## Stop

```bash
docker compose down
```

## View logs

```bash
docker compose logs -f
```

## Rebuild after changing the app

```bash
docker compose up -d --build
```

## Change the external port

Edit `docker-compose.yml`:

```yaml
ports:
  - "8080:80"
```

For example, to use port 8082:

```yaml
ports:
  - "8082:80"
```

## Reverse proxy example

If your public hostname is `efficiency.example.com`, your host Nginx server block can proxy to the Docker container like this:

```nginx
server {
    server_name efficiency.example.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

For full PWA installation/service-worker support on a public domain, serve the site over HTTPS.
# LOXopps
