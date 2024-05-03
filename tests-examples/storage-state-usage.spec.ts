import { test, expect , request} from "@playwright/test";

test('check garage page', async ({page , request}) => {
    
    // page.on('request', request => console.log('>>', request.method(), request.url()));
    // page.on('response', response => console.log('<<', response.status(), response.url()));

    await page.goto('https://qauto.forstudy.space')
    //await expect(page.locator("div.panel-page_heading h1")).toHaveText("Garage")

    const cars = await request.get('/api/cars')
    expect(cars.ok()).toBeTruthy()

})

