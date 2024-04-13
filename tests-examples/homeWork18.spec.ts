import { test, expect } from "@playwright/test";
import { PlaywrightDevPage } from "./pages/loginPage";


test.describe('all tests', () => {
    test.describe.configure({mode: 'serial'});
  
    test('Positive registration case', async ({ page }) => {
        const playwrightDev = new PlaywrightDevPage(page);

        await playwrightDev.userRegistration()
        await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible();
        await page.screenshot({ path: 'successRegistration.png' });

        // await page.goto('https://qauto.forstudy.space/');
        // await page.getByRole('button', { name: 'Sign up' }).click();
        // await expect(page.getByRole('heading', { name: 'Registration' })).toBeVisible();
        // await page.locator('#signupName').click();
        // await page.locator('#signupName').fill('Serhii');
        // await page.locator('#signupLastName').click();
        // await page.locator('#signupLastName').fill('Honcharenko');
        // await page.getByLabel('Name').click();
        // await page.getByLabel('Name').fill('AQA-koko00112212@gmail.com');
        // await page.getByLabel('Password', { exact: true }).click();
        // await page.getByLabel('Password', { exact: true }).fill('11111111Qq');
        // await page.getByLabel('Re-enter password').click();
        // await page.getByLabel('Re-enter password').fill('11111111Qq');
        // await page.getByRole('button', { name: 'Register' }).click();
        // await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible();
        // await page.screenshot({ path: 'successRegistration.png' });
    });
  
    test('Checking error for the empty field', async ({ page }) => {
        const playwrightDev = new PlaywrightDevPage(page);


        await playwrightDev.goto();
        await playwrightDev.signUpButton.click()
        await playwrightDev.signupName.click()
        await playwrightDev.signupLastName.click()
        await playwrightDev.email.click()
        await playwrightDev.password.click()
        await playwrightDev.reEnterPassword.click()
        await playwrightDev.password.click()
        await playwrightDev.textErrorCheck()

        //used this code before POM
        // await page.goto('https://qauto.forstudy.space/');
        // await page.getByRole('button', { name: 'Sign up' }).click();
        // await page.locator('#signupName').click();
        // await page.locator('#signupLastName').click();
        // await page.getByLabel('Name').click();
        // await page.getByLabel('Password', { exact: true }).click();
        // await page.getByLabel('Re-enter password').click();
        // await page.getByLabel('Password', { exact: true }).click();
        // await expect(page.getByText('Name required', { exact: true })).toBeVisible();
        // await expect(page.getByText('Last name required')).toBeVisible();
        // await expect(page.getByText('Email required')).toBeVisible();
        // await expect(page.getByText('Password required', { exact: true })).toBeVisible();
        // await expect(page.getByText('Re-enter password required')).toBeVisible();
        // await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled()

    });

    test.skip('Checking error for the wrongData', async ({ page }) => {
        await page.goto('https://qauto.forstudy.space/');
        await page.getByRole('button', { name: 'Sign up' }).click();
        await page.locator('#signupName').click();
        await page.locator('#signupName').fill('12');
        await page.locator('#signupLastName').click();
        await page.locator('#signupLastName').fill('12');
        await page.getByLabel('Name').click();
        await page.getByLabel('Name').fill('12');
        await page.getByLabel('Password', { exact: true }).click();
        await page.getByLabel('Password', { exact: true }).fill('12');
        await page.getByLabel('Re-enter password').click();
        await page.getByLabel('Re-enter password').click();
        await page.getByLabel('Re-enter password').fill('12');
        await page.locator('div').filter({ hasText: /^Register$/ }).click();
        await expect(page.getByText('Name is invalid', { exact: true })).toBeVisible();
        await expect(page.getByText('Last name is invalid')).toBeVisible();
        await expect(page.getByText('Email is incorrect')).toBeVisible();
        await expect(page.getByText('Password has to be from 8 to').first()).toBeVisible();
        await expect(page.locator('form div').filter({ hasText: 'Re-enter passwordPassword has' }).getByRole('paragraph')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled()

    });

    test.skip('Try to create user with wrong symbol lenght or Ukraine symbol', async ({ page }) => {
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

    test.skip('Try to create user when password do not match', { tag: ["@qauto"] }, async( {page} ) => {
        await page.goto('https://qauto.forstudy.space/');
        await page.getByRole('button', { name: 'Sign up' }).click();
        await page.locator('#signupName').click();
        await page.locator('#signupName').fill('aaaa');
        await page.locator('#signupLastName').click();
        await page.locator('#signupLastName').fill('ssss');
        await page.getByLabel('Name').click();
        await page.getByLabel('Name').fill('eeeee@ssss.sss');
        await page.getByLabel('Password', { exact: true }).click();
        await page.getByLabel('Password', { exact: true }).fill('22222222Qq');
        await page.getByLabel('Re-enter password').click();
        await page.getByLabel('Re-enter password').fill('22222222Www');
        await page.locator('div').filter({ hasText: /^Register$/ }).click();
        await expect(page.getByText('Passwords do not match')).toBeVisible();
        await page.getByLabel('Re-enter password').click();
        await page.getByLabel('Re-enter password').fill('22222222Ww');
        await page.locator('div').filter({ hasText: /^Register$/ }).click();
        await page.getByRole('dialog').click();
        await page.getByLabel('Re-enter password').click();
        await page.getByLabel('Re-enter password').fill('22222222Www');
        await page.locator('div').filter({ hasText: /^Register$/ }).click();
        await page.getByLabel('Password', { exact: true }).click();
        await page.getByLabel('Password', { exact: true }).fill('22222222Ww');
        await page.getByLabel('Re-enter password').click();
        await page.getByLabel('Re-enter password').fill('22222222Ww');
        await page.getByRole('button', { name: 'Register' }).click();
        await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible();
    
  });

    test('Check that border color is red', { tag: ["@qauto", '@regression', '@add_car'] }, async( {page} ) => {
        const playwrightDev = new PlaywrightDevPage(page);

        //used this code before POM
        //await playwrightDev.goto()   //await page.goto('https://qauto.forstudy.space/');
        // await page.getByRole('button', { name: 'Sign up' }).click();
        // await page.locator('#signupName').click();
        // await page.locator('#signupLastName').click();
        // await page.getByLabel('Name').click();
        // await page.getByLabel('Password', { exact: true }).click();
        // await page.getByLabel('Re-enter password').click();
        // await page.locator('div').filter({ hasText: /^Register$/ }).click();
        // await expect(page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        // await expect(page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        // await expect(page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        // await expect(page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)')
        // await expect(page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)')


        await playwrightDev.goto();
        await playwrightDev.signUpButton.click()
        await playwrightDev.signupName.click()
        await playwrightDev.signupLastName.click()
        await playwrightDev.email.click()
        await playwrightDev.password.click()
        await playwrightDev.reEnterPassword.click()
        await playwrightDev.password.click()
        await playwrightDev.checkCSS()
       
});

})