import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { BasePage } from '../../pages/BasePage';


test('login as Standard User', async ({ page }, testInfo) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const basePage = new BasePage(page);


  await homePage.gotoHomePage();
  await homePage.captureScreenshot('homepage-before-login', testInfo);
  await loginPage.loginAs('standardUser');
});

test('complete order flow as Standard User', async ({ page }, testInfo ) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const basePage = new BasePage(page);

  await homePage.gotoHomePage();
  await loginPage.loginAs('standardUser');

  //Verify products are displayed
  await expect(productPage.title).toHaveText('Products');
  await productPage.addProductToCart('Sauce Labs Backpack');
  await productPage.addProductToCart('Sauce Labs Bike Light');

  //Create a list to palce added products, it's price and quantity for later verification
  const addedProducts = [
    { name: 'Sauce Labs Backpack', price: '$29.99', quantity: '1' },
    { name: 'Sauce Labs Bike Light', price: '$9.99', quantity: '1' },
  ];
   

  //Take screenshot after selecting products
  await basePage.captureScreenshot('products-selected', testInfo);


  await productPage.goToCart();

  //Verify correct products, prices and quantities are displayed in cart
  for (const product of addedProducts) {
    for (let i = 0; i < await cartPage.cartItems.count(); i++) {
      const item = cartPage.cartItems.nth(i);
      if (await item.locator('.inventory_item_name').textContent() === product.name) {
        expect(await cartPage.getItemPrice(item)).toBe(product.price);
        expect(await cartPage.getItemQuantity(item)).toBe(product.quantity);
      }
    }
  }

  //Take screenshot of cart page
  await basePage.captureScreenshot('cart-page', testInfo);

  await cartPage.proceedToCheckout();


  await checkoutPage.fillCheckoutInformation('John', 'Doe', '90210');
  await checkoutPage.continueCheckout();

  //Verify checkout overview displays correct products, prices, quantities and totals
  for (const product of addedProducts) {
    expect(await checkoutPage.getCheckOutItemPrice(product.name)).toBe(product.price);
    expect(await checkoutPage.getCheckOutItemQuantity(product.name)).toBe(product.quantity);
  }
  
  //Verify totals are correct by calculating expected totals based on the products added to cart and comparing with the displayed totals
  const expectedSubtotal = addedProducts.reduce((total, product) => total + parseFloat(product.price.slice(1)) * parseInt(product.quantity), 0);
  const taxRate = await basePage.getTaxRate();
  const expectedTax = expectedSubtotal * taxRate;
  const expectedTotal = expectedSubtotal + expectedTax;

  await expect(checkoutPage.itemTotal).toHaveText(`Item total: $${expectedSubtotal.toFixed(2)}`);
  await expect(checkoutPage.tax).toHaveText(`Tax: $${expectedTax.toFixed(2)}`);
  await expect(checkoutPage.total).toHaveText(`Total: $${expectedTotal.toFixed(2)}`);


  //Take screenshot after filling checkout information
  await basePage.captureScreenshot('checkout-page', testInfo);  
  await checkoutPage.finishCheckout();

  //Take screenshot after finishing checkout
  await basePage.captureScreenshot('order-complete', testInfo);
  await checkoutPage.expectOrderComplete();
});

