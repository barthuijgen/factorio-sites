/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    domains: ["storage.googleapis.com"],
  },
  webpack(config, options) {
    const { dev, isServer } = options;

    // Do not run type checking twice:
    if (dev && isServer) {
      const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    return config;
  },
};
