import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { User } from '../../config/config';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }


  async loginAs(role: keyof typeof this.config.users) {
    const user = this.config.users[role];
    await this.fillUsername(user.username);
    await this.fillPassword(user.password);
    await this.clickLoginButton();
  }

  async fillUsername(username: string) {
    await this.page.fill('[data-test="username"]', username);
  }

  async fillPassword(password: string) {
    await this.page.fill('[data-test="password"]', password);
  }

  async clickLoginButton() {
    await this.page.click('[data-test="login-button"]');
  }

  async getUserCredentials(role: keyof typeof this.config.users): Promise<User> {
    return this.config.users[role];
  }
}