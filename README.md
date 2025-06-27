

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

### Run in development mode
```bash
docker compose up
```

## Note:
To remove linting errors due to missing dependencies run
```bash
cd api/ && npm i
```

```bash
cd frontend/ && npm i
```