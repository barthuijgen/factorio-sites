FROM node:14-slim

RUN apt-get -qy update && apt-get -qy install openssl

WORKDIR /usr/src/app

COPY dist/apps/blueprints/package.json ./package.json
COPY yarn.lock .
COPY yalc.lock .
COPY .yalc ./.yalc/

RUN yarn install --production

COPY node_modules/.prisma ./node_modules/.prisma/
COPY dist/apps/blueprints .

CMD ["yarn", "next", "start"]