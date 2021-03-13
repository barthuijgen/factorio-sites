# Blueprints application

## Setting up the project

- Add a `.env.local` file to apps/blueprints/ with the following values

```
POSTGRES_DB=factorio-blueprints
POSTGRES_USER=factorio-blueprints
#POSTGRES_HOST=127.0.0.1
#POSTGRES_PASSWORD=local
STEAM_WEB_API_KEY=(optional, for steam login)
GOOGLE_APPLICATION_CREDENTIALS="full/path/to/json-key-file.json"
GCP_BLUEPRINT_STRINGS_BUCKET=blueprint-strings
GCP_BLUEPRINT_IMAGES_BUCKET=blueprint-images
```

- Add a `.env` file to apps/blueprints/prisma with a database connection url like

```
DATABASE_URL="postgresql://factorio-blueprints:local@127.0.0.1:5432/factorio-blueprints"
```

- Run DB migration

```
cd apps/blueprints && npx prisma migrate deploy --preview-feature
```

- Run local app

```
nx serve
```

## Deploying

- `docker build -t eu.gcr.io/factorio-sites/blueprints --file blueprints.Dockerfile .`
- `docker tag eu.gcr.io/factorio-sites/blueprints eu.gcr.io/factorio-sites/blueprints:dev`
- `docker push eu.gcr.io/factorio-sites/blueprints`
