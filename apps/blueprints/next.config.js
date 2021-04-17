/* eslint-disable @typescript-eslint/no-var-requires */

// To be included in dependencies, chakra-ui depends on it but has it as peer dependency
require("framer-motion");

module.exports = {
  poweredByHeader: false,
  reactStrictMode: true,
  assetPrefix: process.env.ASSET_PREFIX ? process.env.ASSET_PREFIX : "",
  publicRuntimeConfig: {
    PUBLIC_URL: process.env.PUBLIC_URL,
    CF_WEB_ANALYTICS: process.env.CF_WEB_ANALYTICS,
  },
  webpack(config, options) {
    const { dev, isServer } = options;

    // Do not run type checking twice
    if (dev && isServer) {
      const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Permissions-Policy",
            value: "interest-cohort=()",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Content-Security-Policy-Report-Only",
            // 'unsafe-eval' and 'worker-src blob:' are required for wasm
            value:
              "script-src 'self' 'unsafe-eval' https://factorio-blueprints-assets.storage.googleapis.com https://static.cloudflareinsights.com ; worker-src blob: ;",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
};
