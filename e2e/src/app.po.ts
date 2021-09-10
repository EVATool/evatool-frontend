import {browser, by, element, ExpectedConditions} from 'protractor';

export class AppPage {
  async navigateTo(route?: string): Promise<unknown> {
    return browser.get(browser.baseUrl + route);
  }

  // Login page.
  async clickSignInFormButton(): Promise<void> {
    await element(by.css('.sign-in-toggle-button')).click();
  }

  async clickSignUpFormButton(): Promise<void> {
    const signUpFormButton = element(by.className('sign-up-toggle-button'));
    browser.wait(
      ExpectedConditions.presenceOf(signUpFormButton),
      5000,
      'Sign up button not found'
    );
    await signUpFormButton.click();
  }

  async fillInUsernameFormInput(username: string): Promise<void> {
    const usernameFormInput = element(by.binding('username'));
    await usernameFormInput.clear();
    await usernameFormInput.sendKeys(username);
  }

  async fillInEmailFormInput(email: string): Promise<void> {
    const usernameFormInput = element(by.binding('email'));
    await usernameFormInput.clear();
    await usernameFormInput.sendKeys(email);
  }

  async fillInPasswordFormInput(password: string): Promise<void> {
    const usernameFormInput = element(by.binding('password'));
    await usernameFormInput.clear();
    await usernameFormInput.sendKeys(password);
  }

  async fillInRepeatPasswordFormInput(repeatPassword: string): Promise<void> {
    const usernameFormInput = element(by.binding('passwordRepeat'));
    await usernameFormInput.clear();
    await usernameFormInput.sendKeys(repeatPassword);
  }

  async clickSubmitFormButton(): Promise<void> {
    await element(by.css('.submit-button')).click();
  }
}
