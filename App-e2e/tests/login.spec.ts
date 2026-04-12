import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('successful login redirects to dashboard', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('demo@yts.com', 'Password123');

  await expect(page).toHaveURL(/dashboard/);
});

test('invalid login shows error message', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('wrong@email.com', 'badpassword');

  await (await loginPage.getErrorMessage()).isVisible();
});