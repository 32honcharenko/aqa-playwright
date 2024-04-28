import { expect, type Locator, type Page } from '@playwright/test';
import { randomBytes } from 'crypto';

export class PlaywrightDevPage {
  readonly page: Page;
  readonly signUpButton: Locator;
  readonly signupName: Locator;
  readonly signupLastName: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly reEnterPassword: Locator;
  readonly signInButton: Locator;

  readonly loginButton: Locator;
  readonly loginEmail: Locator;
  readonly loginPassword: Locator;
  
  readonly error1: Locator;
  readonly error2: Locator;
  readonly error3: Locator;
  readonly error4: Locator;
  readonly error5: Locator;

  readonly registerButton: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.signupName = page.locator('#signupName');
    this.signupLastName = page.locator('#signupLastName');
    this.email = page.getByLabel('Name'); //getByLabel
    this.password = page.getByLabel('Password', { exact: true });
    this.reEnterPassword = page.getByLabel('Re-enter password');

    this.loginButton = page.getByRole('button', { name: 'Login' })
    this.loginEmail = page.getByLabel('Email');
    this.loginPassword = page.getByLabel('Password')

    this.error1 = page.getByText('Name required', { exact: true })
    this.error2 = page.getByText('Last name required')
    this.error3 = page.getByText('Email required')
    this.error4 = page.getByText('Password required', { exact: true })
    this.error5 = page.getByText('Re-enter password required')

    this.registerButton = page.getByRole('button', { name: 'Register' })
  }

  async goto() {
    await this.page.goto('https://qauto.forstudy.space/');
  }

  async checkCSS() {

      await expect(this.signupName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
      await expect(this.signupLastName).toHaveCSS('border-color', 'rgb(220, 53, 69)')
      await expect(this.email).toHaveCSS('border-color', 'rgb(220, 53, 69)')
      await expect(this.password).toHaveCSS('border-color', 'rgb(220, 53, 69)')
      await expect(this.reEnterPassword).toHaveCSS('border-color', 'rgb(220, 53, 69)')
  }

  async textErrorCheck() {
    await expect(this.error1).toBeVisible()
    await expect(this.error2).toBeVisible()
    await expect(this.error3).toBeVisible()
    await expect(this.error4).toBeVisible()
    await expect(this.error5).toBeVisible()
    await expect(this.registerButton).toBeDisabled()
  }

  async userRegistration() {
    const randomEmail = `test${randomBytes(5).toString('hex')}@example.com`;
        
    await this.goto();
    await this.signUpButton.click()
    await this.signupName.click()
    await this.signupName.fill("Serhii")
    await this.signupLastName.click()
    await this.signupLastName.fill("Honcharenko")
    await this.email.click()
    await this.email.fill(randomEmail)
    await this.password.click()
    await this.password.fill("11111111Qq")
    await this.reEnterPassword.click()
    await this.reEnterPassword.fill("11111111Qq")
    await this.registerButton.click()
  }

  async login() {
    
    await this.goto()
    await this.signInButton.click()
    await this.loginEmail.click()
    await this.loginEmail.fill('koko1111@gmail.com')
    await this.loginPassword.click()
    await this.loginPassword.fill("22222222Qq")
    await this.loginButton.click()
}

}