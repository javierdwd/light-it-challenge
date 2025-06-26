

## Set up environment variables

## Project (DB)
```bash
cp .env.example .env
# Edit ROOT_FOLDER/.env with your configuration
```

## Api
```bash
cp api/.env.example api/.env
# Edit api/.env with your configuration
```

## Front
```bash
cp frontend/.env.example frontend/.env
# Edit frontend/.env with your configuration
```

### Run on development mode
```bash
docker compose up
```

### Run on production mode
```bash
docker compose -f docker-compose.prod.yml up
```