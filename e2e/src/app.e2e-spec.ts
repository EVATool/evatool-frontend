import {browser, logging} from 'protractor';
import {AppPage} from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should register', async () => {
    await page.navigateTo('/login');
    await page.clickSignUpFormButton();
    await page.fillInUsernameFormInput('username');
    await page.fillInEmailFormInput('test@test.test');
    await page.fillInPasswordFormInput('password');
    await page.fillInRepeatPasswordFormInput('password');
    await page.clickSubmitFormButton();
  });

  it('should login', async () => {
    await page.navigateTo('/login');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
