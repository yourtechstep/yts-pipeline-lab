import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('demo@yts.com', 'Password123');
});

test('user can add a task', async ({ page }) => {
  const dashboard = new DashboardPage(page);

  await dashboard.addTask('Learn Playwright');

  //await expect(dashboard.getTasks()).toContain(['Learn Playwright']);
  await expect((await dashboard.getTasks()).first()).toContainText('Learn Playwright');
});

test('user can complete a task', async ({ page }) => {
  const dashboard = new DashboardPage(page);

  await dashboard.addTask('Complete me');
  await dashboard.completeFirstTask();

  // You could check for class change or text
  await expect((await dashboard.getTasks()).first()).toHaveClass(/completed/);
});

test('user can logout', async ({ page }) => {
  const dashboard = new DashboardPage(page);

  await dashboard.logout();

  await expect(page.locator('[data-testid="sign-in-button"]')).toBeVisible();
});