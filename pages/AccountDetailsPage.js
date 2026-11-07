export class AccountDetailsPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Account Details', exact: true });
    this.accountId = page.locator('#accountId');
    this.balance = page.locator('#balance');
    this.transactions = page.locator('#transactionTable');
  }
}
