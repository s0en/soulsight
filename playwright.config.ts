import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:8080'
  },
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  retries: 0,
  timeout: 30000
});

