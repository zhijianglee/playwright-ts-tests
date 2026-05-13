import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');

    this.itemQuantity = this.cartItems.locator('[data-test="item-quantity"]');
    this.itemName = this.cartItems.locator('[data-test="inventory-item-name"]');
    this.itemPrice = this.cartItems.locator('[data-test="inventory-item-price"]');
    this.removeButton = this.cartItems.locator('button[data-test^="remove-"]');
    this.itemDescription = this.cartItems.locator('[data-test="inventory-item-desc"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async goto() {
    await this.page.goto('/cart');
  }


  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async getItemQuantity(cartItem: any) {
    return await cartItem.locator('[data-test="item-quantity"]').textContent();
  }

  async getItemName(cartItem: any) {
    return await cartItem.locator('[data-test="inventory-item-name"]').textContent();
  }

  async getItemPrice(cartItem: any) {
    return await cartItem.locator('[data-test="inventory-item-price"]').textContent();
  }

  async getItemDescription(cartItem: any) {
    return await cartItem.locator('[data-test="inventory-item-desc"]').textContent();
  }

  async removeItem(cartItem: any) {
    await cartItem.locator('button[data-test^="remove-"]').click();
  }

  async getItemCount() {
    return await this.cartItems.count();
  }
}
