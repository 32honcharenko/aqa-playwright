import { test, expect } from '../util/fixture';

test('test fixture', { tag: ["@fixture"] }, async ({ playwrightDevPage, page }) => {

    await playwrightDevPage.login()

    await expect(page.locator('app-panel-layout')).toContainText('Garage');
    await expect(page.locator('app-panel-layout')).toContainText('Fuel expenses');
    await expect(page.locator('app-panel-layout')).toContainText('Instructions');
    await expect(page.locator('app-panel-layout')).toContainText('Profile');
    await expect(page.locator('app-panel-layout')).toContainText('Settings');
    await page.getByRole('button', { name: 'Add car' }).click();
    await page.getByLabel('Mileage').click();
    await page.getByLabel('Mileage').fill('12');
    await page.getByRole('button', { name: 'Add' }).click();
});