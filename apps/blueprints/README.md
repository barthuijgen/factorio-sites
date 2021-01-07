## Before deploying

Make sure `prod.package.json` is up to date on packages from the root `package.json`

## Deploying

`docker build -t eu.gcr.io/factorio-sites/blueprints --file blueprints.Dockerfile .`
`docker push eu.gcr.io/factorio-sites/blueprints`

## Testing deployment locally

`docker run --rm -p 3000:3000 eu.gcr.io/factorio-sites/blueprints`

### windows env

create a `.env.local` with

```
GOOGLE_APPLICATION_CREDENTIALS="D:\git\factorio-sites\credentials\factorio-sites.json"
```
