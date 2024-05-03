import { test, expect, request } from "@playwright/test";
import { PlaywrightDevPage } from "./pages/loginPage";



test('GET request and check response', async ({ page , request}) => {
    const playwrightDev = new PlaywrightDevPage(page);

        
        await playwrightDev.login()
        await expect(page.locator('app-panel-layout')).toContainText('Garage');

        await page.route('/api/users/profile', async route => {
            const json = {
                "status": "ok",
                "data": {
                    "userId": 115296,
                    "photoFilename": "1.jpg" ,
                    "name": "blablabla",
                    "lastName": "WWWWWWWWW",
                    "country": "aaa"
                }
            };
            await route.fulfill({ json });
          });

        
        const  responseDA = page.waitForResponse("**/api/users/profile")
        await page.goto('https://qauto.forstudy.space/panel/profile')
        await page.screenshot({ path: 'profilLogi.png' });
        
        const  response = await responseDA
        const  responseData = await response.json();
        console.log(responseData)

        expect(responseData.data.name).toBe("blablabla" )
        expect(responseData.data.lastName).toBe("WWWWWWWWW" )
        

});

