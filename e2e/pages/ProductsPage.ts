import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.title = page.locator('[data-test="title"]');
  }

  async addFirstProductToCart() {
    await this.page.getByRole('button', { name: 'Add to cart' }).first().click();
  }

  async openCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  async expectProductsPageVisible() {
    await expect(this.title).toHaveText('Products');
  }
}
