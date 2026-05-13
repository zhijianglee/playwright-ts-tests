import { Page, Locator } from '@playwright/test';

export class ProductPage {
  private page: Page;
  readonly inventoryContainer: Locator;
  readonly inventoryList: Locator;
  readonly inventoryItems: Locator;
  readonly inventoryItemName: Locator;
  readonly inventoryItemDesc: Locator;
  readonly inventoryItemPrice: Locator;
  readonly addToCartButtons: Locator;
  readonly removeButtons: Locator;
  readonly sortDropdown: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.inventoryContainer = this.page.locator('.inventory_container');
    this.inventoryList = this.page.locator('.inventory_list');
    this.inventoryItems = this.page.locator('.inventory_item');
    this.inventoryItemName = this.page.locator('.inventory_item_name');
    this.inventoryItemDesc = this.page.locator('.inventory_item_desc');
    this.inventoryItemPrice = this.page.locator('.inventory_item_price');
    this.addToCartButtons = this.page.locator('button[data-test^="add-to-cart-"]');
    this.removeButtons = this.page.locator('button[data-test^="remove-"]');
    this.sortDropdown = this.page.locator('.product_sort_container');
    this.shoppingCartBadge = this.page.locator('.shopping_cart_badge');
    this.shoppingCartLink = this.page.locator('.shopping_cart_link');
  }

  // Methods
  async getProductNames(): Promise<string[]> {
    return await this.inventoryItemName.allTextContents();
  }

  async getProductPrices(): Promise<string[]> {
    return await this.inventoryItemPrice.allTextContents();
  }

  async addProductToCart(productName: string): Promise<void> {
    const item = this.inventoryItems.filter({ hasText: productName });
    await item.locator('button[data-test^="add-to-cart-"]').click();
  }

  async removeProductFromCart(productName: string): Promise<void> {
    const item = this.inventoryItems.filter({ hasText: productName });
    await item.locator('button[data-test^="remove-"]').click();
  }

  async sortProducts(option: string): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getCartItemCount(): Promise<string | null> {
    return await this.shoppingCartBadge.textContent();
  }

  async goToCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }
}