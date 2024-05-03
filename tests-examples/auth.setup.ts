import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/admin.json';

import { PlaywrightDevPage } from "./pages/loginPage";

setup('authenticate as admin', async ({ page }) => {
    const playwrightDevPage = new PlaywrightDevPage(page)

    await page.goto('/');
    await playwrightDevPage.login()

    await page.context().storageState({path: authFile})
})