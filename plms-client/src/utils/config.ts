import { Config } from '@interfaces/Config';

/** Configration values from environment. */
const config: Config = {
  API_URL: process.env.API_URL ?? '',
  API_PORT: process.env.API_PORT ?? '',
  NODE_ENV: process.env.NODE_ENV ?? 'test',
};

export default config;
