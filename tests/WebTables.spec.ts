import {test, expect, Page} from '@playwright/test';

export async function fillWebTables(page:Page){
  await page.locator('#addNewRecordButton').click();

  await page.evaluate(() => {
    const elements = document.querySelectorAll('#fixedban, footer, iframe, [id^="google_ads"]');
    elements.forEach(el => el.remove());
  });

  const modal = page.locator('.modal-content');
  await expect(modal).toBeVisible();
  await expect(page.locator(('#registration-form-modal'))).toHaveText('Registration Form');

  await page.getByPlaceholder('First Name').fill('Jill');
  await page.getByPlaceholder('Last Name').fill('Valentine');
  await page.getByPlaceholder('name@example.com').fill('jillV@gmail.com');
  await page.getByPlaceholder('Age').fill('28');
  await page.getByPlaceholder('Salary').fill('20000');
  await page.getByPlaceholder('Department').fill('Tech QA');
  await page.locator('#submit').click();

  const targetRow = page.locator('.rt-tr-group').filter({ hasText: 'jillV@gmail.com' });

  await expect(targetRow).toBeVisible();
  await expect(targetRow).toContainText('Valentine');
  await expect(targetRow).toContainText('28');
  await expect(targetRow).toContainText('20000');
  await expect(targetRow).toContainText('Tech QA');
}
test('website formy project-Form page', async ({ page }) => {
  await page.goto('https://demoqa.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
  await page.getByRole('link', { name: 'Elements', exact: true }).click();
  await expect(page).toHaveURL('https://demoqa.com/elements');

  await page.getByText('Web Tables').click();

  await expect(page).toHaveURL('https://demoqa.com/webtables');

  await fillWebTables(page);
});
