import { test, expect } from '@playwright/test';

test('home page loads without console errors and has a title', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

  await page.goto('/');

  // Title should exist (your live site has "SoulSight")
  const title = await page.title();
  expect(title?.length).toBeGreaterThan(0);

  // Take a full-page screenshot for visual confirmation
  await page.screenshot({ path: 'test-results/home.png', fullPage: true });

  // No console errors
  expect(errors, `Console errors: \n${errors.join('\n') || '(none)'}`).toHaveLength(0);
});

