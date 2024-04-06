import { test, expect } from "@playwright/test";

// test.afterAll(async ({ page }) => {
//   await page.close();

// });

test.describe('all test', () => {
    test.describe.configure({mode: 'serial'})

test("open main page", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(3000);
//   await page.locator('button.header_signin').click();

  const signinButton = page.locator('button.header_signin');
  await signinButton.click();

//   await page.locator("button").click();
//   await page.locator("button.signin").click();
});

test ('usage of getByRole', async ({page}) => {
    await page.goto("/");
    await page.getByRole('button', {name: 'Sign in'}).click();
} )


test ('usage of getByText', async ({page}) => {
    await page.goto("/");
    await expect(page.getByText('Sign in')).toBeVisible()
} )



test ('usage of getByLabel', async ({page}) => {
    await page.goto("/");
    await page.getByRole('button', {name: 'Sign in'}).click();
    await expect(page.getByLabel('Email')).toBeVisible()
    await page.waitForTimeout(3000)
    //Soft assertions
    await expect.soft(page.locator('div.invalid-feedback')).toContainText('Blah-blah')
} )

})

test ('usage a few selectors', async ({page}) => {
    
})









// baseURL: "https://qauto.forstudy.space",
//     httpCredentials: {
//       username: "guest",
//       password: "welcome2qauto",
//     },