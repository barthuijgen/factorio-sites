FROM node:14-slim as builder

RUN apt-get -qy update && apt-get -qy install openssl

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
COPY yalc.lock .
COPY .yalc ./.yalc/

RUN yarn

COPY . .

RUN yarn nx build blueprints --prod

FROM node:14-slim

RUN apt-get -qy update && apt-get -qy install openssl

WORKDIR /usr/src/app

COPY --from=builder  /usr/src/app/dist/apps/blueprints/package.json ./package.json
COPY yarn.lock .
COPY yalc.lock .
COPY .yalc ./.yalc/

RUN yarn install --production

COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma/
COPY --from=builder /usr/src/app/dist/apps/blueprints .

CMD ["yarn", "next", "start"]