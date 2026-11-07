export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.submitButton = page.getByRole('button', { name: 'Register', exact: true });
    this.errors = page.locator('[id$=".errors"]');
  }
  async goto() { await this.page.goto('./register.htm'); }
  field(name) { return this.page.locator(`[name="${name}"]`); }
  async fill(data) {
    for (const [name, value] of Object.entries(data)) await this.field(name).fill(value);
  }
  async submit() { await this.submitButton.click(); }
}
