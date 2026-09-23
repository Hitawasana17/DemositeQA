import { test, expect, Page } from '@playwright/test';

interface EditFormData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  salary: string;
  department: string;
}

export async function editWebTable(
    page: Page,
    emailTarget: string,
    newData: EditFormData
) {
  await page.evaluate(() => {
    document.querySelectorAll('#fixedban, footer, iframe, [id^="google_ads"]').forEach(el => el.remove());
  });

  const targetRow = page.getByRole('row').filter({ hasText: emailTarget });

  await targetRow.locator('[id^="edit-record-"]').click();

  const modal = page.locator('.modal-content');
  await expect(modal).toBeVisible();
  await expect(page.locator('#registration-form-modal')).toHaveText('Registration Form');

  await page.getByPlaceholder('First Name').fill(newData.firstName);
  await page.getByPlaceholder('Last Name').fill(newData.lastName);
  await page.getByPlaceholder('name@example.com').fill(newData.email);
  await page.getByPlaceholder('Age').fill(newData.age);
  await page.getByPlaceholder('Salary').fill(newData.salary);
  await page.getByPlaceholder('Department').fill(newData.department);

  await page.locator('#submit').click();

  await expect(modal).not.toBeVisible();

  const updatedRow = page.getByRole('row').filter({ hasText: newData.email });
  await expect(updatedRow).toBeVisible();
  await expect(updatedRow).toContainText(newData.firstName);
  await expect(updatedRow).toContainText(newData.lastName);
  await expect(updatedRow).toContainText(newData.department);
}

test('website DemoQA project - Edit Registration Form', async ({ page }) => {
  await page.goto('https://demoqa.com/webtables', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await editWebTable(page, 'kierra@example.com', {
    firstName: 'Leon',
    lastName: 'Kennedy',
    email: 'leon.k@gmail.com',
    age: '30',
    salary: '55000',
    department: 'Security QA'
  });
});