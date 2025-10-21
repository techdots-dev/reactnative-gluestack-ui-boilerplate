import fs from 'fs';
import path from 'path';
import 'dotenv/config';

// Force load .env explicitly
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  require('dotenv').config({ path: envPath });
} else {
  console.warn('.env file not found at:', envPath);
}

export default ({ config }) => ({
  ...config,
  name: "gluestack-ui-boilerplate",
  slug: "gluestack-ui-boilerplate", 
  ...(process.env?.EAS_PROJECT_ID && { updates: {
    url: `https://u.expo.dev/${process.env.EAS_PROJECT_ID}`,
  }}),
  runtimeVersion: {
    policy: 'appVersion',
  },
  extra: {
    POSTHOG_KEY: process.env.POSTHOG_KEY ?? "",
    SENTRY_DSN: process.env.SENTRY_DSN ?? "",
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN ?? "",
    API_MODE: process.env.API_MODE ?? 'mock',
    API_URL: process.env.API_URL ?? "",
    eas: {
        projectId: process.env.EAS_PROJECT_ID ?? "",
    },
  },
  plugins: [
    ...(config.plugins || []),
    [
      'expo-build-properties',
      {
        android: {
          gradlePluginVersion: '8.2.2',
        },
      },
    ],
  ],
});
