console.log("POST BUILD SCRIPT", __dirname);

/*

yarn nx build blueprint-image-function

1. Add to package.json

  "scripts": {
    "postinstall": "yarn prisma generate"
  },

2. Add to dependencies

  "prisma": "3.6.0",

2. Replace prisma generate header

generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "debian-openssl-1.1.x"]
}

*/
