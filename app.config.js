import fs from 'fs';
import path from 'path';
import 'dotenv/config';

// Force load .env.example
const envPath = path.resolve(__dirname, '.env.example');
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
}

export default ({ config }) => ({
  ...config,
  extra: {
    POSTHOG_KEY: process.env.POSTHOG_KEY,
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    API_MODE: process.env.API_MODE,
    API_URL: process.env.API_URL,
    eas: {
        projectId: process.env.EAS_PROJECT_ID,
    },
  },
});
