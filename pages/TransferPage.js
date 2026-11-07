export class TransferPage {
  constructor(page) {
    this.page = page;
    this.amount = page.locator('#amount');
    this.fromAccount = page.locator('#fromAccountId');
    this.toAccount = page.locator('#toAccountId');
    this.submitButton = page.getByRole('button', { name: 'Transfer', exact: true });
    this.confirmation = page.getByRole('heading', { name: 'Transfer Complete!', exact: true });
    this.resultAmount = page.locator('#amountResult');
    this.resultFrom = page.locator('#fromAccountIdResult');
    this.resultTo = page.locator('#toAccountIdResult');
  }
  async goto() { await this.page.goto('./transfer.htm'); }
  async fill({ amount, from, to }) {
    await this.amount.fill(amount);
    await this.fromAccount.selectOption(from);
    await this.toAccount.selectOption(to);
  }
  async submit() { await this.submitButton.click(); }
}
