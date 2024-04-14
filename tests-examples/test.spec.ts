import { test, expect } from "@playwright/test";

test('Try to create user with wrong symbol lenght or Ukraine symbol', async ({ page }) => {
  await page.goto('https://qauto.forstudy.space/');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.locator('#signupName').click();
  await page.locator('#signupName').fill('s');
  await page.locator('#signupLastName').click();
  await page.locator('#signupLastName').fill('s');
  await page.getByLabel('Name').click();
  await page.getByLabel('Name').fill('koko@gmail.com');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('11111111');
  await page.getByLabel('Re-enter password').click();
  await page.getByLabel('Re-enter password').fill('11111111');
  await expect(page.getByText('Name has to be from 2 to 20 characters long', { exact: true })).toBeVisible();
  await expect(page.getByText('Last name has to be from 2 to')).toBeVisible();
  await page.locator('#signupName').click();
  await page.locator('#signupName').fill('лала');
  await page.locator('#signupLastName').click();
  await page.locator('#signupLastName').fill('дада');
  await expect(page.getByText('Name is invalid', { exact: true })).toBeVisible();
  await expect(page.getByText('Last name is invalid')).toBeVisible();
  await page.locator('#signupName').click();
  await page.locator('#signupName').fill('dddddddddddddddddddddd');
  await page.locator('#signupLastName').click();
  await page.locator('#signupLastName').fill('ddddddddddddddddddddd');
  await expect(page.getByText('Name has to be from 2 to 20 characters long', { exact: true })).toBeVisible();
  await expect(page.getByText('Last name has to be from 2 to')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled()
});