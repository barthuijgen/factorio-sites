import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const config = publicRuntimeConfig || {};

export const PUBLIC_URL = (config.PUBLIC_URL as string) || "";
export const CF_WEB_ANALYTICS = (config.CF_WEB_ANALYTICS as string) || null;
