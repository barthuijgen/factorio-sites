# FactorioSites

Mono-repo for [Factorio Blueprints](https://factorioblueprints.tech).

Factorio Blueprints delivers a platform to easily share blueprints and with minimal effort get the most value from them, with advanced search and real-time rendering of blueprints.

# Links

- [Issues & Suggestions](https://github.com/barthuijgen/factorio-sites/issues)
- [Roadmap](https://github.com/barthuijgen/factorio-sites/projects/1)

# Credits

Factorio Blueprints uses a part of the [Factorio blueprint editor](https://github.com/teoxoy/factorio-blueprint-editor) by [Teoxoy](https://github.com/Teoxoy). Lisenced MIT.

This amazing project allows us to render real time high quality images directly when opening any blueprint.

# Want to contribute?

## Prerequisites

- A postgres database (docker-compose.yml provided)
- A Google Cloud Platform project

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
