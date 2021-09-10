import {browser, by, element} from 'protractor';

export class AppPage {
  async navigateTo(route?: string): Promise<unknown> {
    return browser.get(browser.baseUrl + route);
  }

  // Login page.
  getSignInFormButton() {
    return element(by.css('sign-in-toggle-button'));
  }

  getSignUpFormButton() {
    return element(by.css('sign-up-toggle-button'));
  }

  getUsernameFormInput() {

  }

  getEmailFormInput() {

  }

  getPasswordFormInput() {

  }

  getRepeatPasswordFormInput() {

  }
}
