import { readFileSync } from 'fs';
import dotenv from 'dotenv';

export const envFile = 'env/.env';

const envConfig = dotenv.parse(readFileSync(envFile));
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}
