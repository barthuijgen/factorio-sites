import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const PUBLIC_URL = (publicRuntimeConfig.PUBLIC_URL as string) || "";
export const CF_WEB_ANALYTICS = (publicRuntimeConfig.CF_WEB_ANALYTICS as string) || null;
