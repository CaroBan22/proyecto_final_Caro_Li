export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.type = page.locator('#type');
    this.fromAccount = page.locator('#fromAccountId');
    this.submit = page.getByRole('button', { name: 'Open New Account', exact: true });
    this.confirmation = page.getByRole('heading', { name: 'Account Opened!', exact: true });
    this.newAccountId = page.locator('#newAccountId');
  }
  async goto() { await this.page.goto('./openaccount.htm'); }
  async open(from, accountType = 'CHECKING') {
    await this.type.selectOption({ label: accountType });
    await this.fromAccount.selectOption(from);
    await this.submit.click();
  }
}
