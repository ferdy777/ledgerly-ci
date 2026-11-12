export const APP_TITLE = import.meta.env.VITE_APP_TITLE;
export const ENVIRONMENT = import.meta.env.VITE_APP_ENV;
export const IS_DEVELOPMENT = ENVIRONMENT === "development";
export const IS_PRODUCTION = ENVIRONMENT === "production";
export const APP_VERSION = import.meta.env.VITE_APP_VERSION ?? "0.0.0";
