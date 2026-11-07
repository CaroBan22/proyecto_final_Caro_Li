export class AccountsPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Accounts Overview', exact: true });
    this.table = page.locator('#accountTable');
    this.accountLinks = this.table.locator('tbody a');
  }
  async goto() { await this.page.goto('./overview.htm'); }
  async openAccount(id) {
    await this.table.getByRole('link', { name: String(id), exact: true }).click();
  }
}
