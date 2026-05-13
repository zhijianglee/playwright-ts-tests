import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.ItemTotal= page.locator('[data-test="subtotal-label"]');
    this.tax = page.locator('[data-test="tax-label"]');
    this.total = page.locator('[data-test="total-label"]');
    this.cartItems= page.locator('[data-test="inventory-item"]');

  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill('[data-test="firstName"]', firstName);
    await this.page.fill('[data-test="lastName"]', lastName);
    await this.page.fill('[data-test="postalCode"]', postalCode);
  }

  async continueCheckout() {
    await this.page.getByRole('button', { name: 'Continue' }).click();
  }

  async getCheckOutItemName(productName: string) {
    const item = this.cartItems.filter({ hasText: productName });
    return await item.locator('[data-test="inventory-item-name"]').textContent();
  }

  async getCheckOutItemPrice(productName: string) {
    const item = this.cartItems.filter({ hasText: productName });
    return await item.locator('[data-test="inventory-item-price"]').textContent();
  }

  async getCheckOutItemDescription(productName: string) {
    const item = this.cartItems.filter({ hasText: productName });
    return await item.locator('[data-test="inventory-item-desc"]').textContent();
  }

  async getCheckOutItemQuantity(productName: string) {
    const item = this.cartItems.filter({ hasText: productName });
    return await item.locator('[data-test="item-quantity"]').textContent()  ;
  }


  async finishCheckout() {
    await this.page.getByRole('button', { name: 'Finish' }).click();
  }

  async expectOrderComplete() {
    await expect(this.page.getByText('THANK YOU FOR YOUR ORDER')).toBeVisible();
  }
}
