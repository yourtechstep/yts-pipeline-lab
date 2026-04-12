import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  async addTask(description: string) {
    await this.page.fill('[data-testid="task-input"]', description);
    await this.page.click('[data-testid="add-task-button"]');
  }

  async getTasks(): Promise<Locator> {
    return this.page.locator('[data-testid="tasks-list"] li');
  }

  async completeFirstTask() {
    await this.page.locator('[data-testid^="complete-task-button-"]').first().click();
  }

  async logout() {
    await this.page.click('[data-testid="logout-button"]');
  }
}
