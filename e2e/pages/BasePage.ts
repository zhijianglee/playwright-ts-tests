import { Page, TestInfo } from '@playwright/test';
import { Config, config } from '../../config/config';

export class BasePage {
  protected page: Page;
  protected config: Config;

  constructor(page: Page) {
    this.page = page;
    this.config = config;
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async getTitle() {
    return await this.page.title();
  }

  async getTaxRate(){
    return this.config.taxRate;
  }

  async captureScreenshot(name: string, testInfo?: TestInfo) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    if (testInfo) {
      await testInfo.attach(name, {
        body: screenshot,
        contentType: 'image/png',
      });
    }
    return screenshot;
  }
}