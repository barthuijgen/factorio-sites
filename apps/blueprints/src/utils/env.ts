import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const PUBLIC_URL = publicRuntimeConfig.PUBLIC_URL as string;
