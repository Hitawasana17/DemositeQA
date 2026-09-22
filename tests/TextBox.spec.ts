import {test, expect, Page} from '@playwright/test';

export async function fillTextBox(page:Page){
  await page.evaluate(() => {
    const elements = document.querySelectorAll('#fixedban, footer, iframe, [id^="google_ads"]');
    elements.forEach(el => el.remove());
  });

  await page.locator('#userName').fill('Jill Valentine');
  await page.locator('#userEmail').fill('jillV@gmail.com');
  await page.locator('#currentAddress').fill('Jl. Semesta');
  await page.locator('#permanentAddress').fill('Jl. Sentosa 2');

  const submitBtn = page.locator('#submit');
  await submitBtn.scrollIntoViewIfNeeded();
  await submitBtn.click();

  const output = page.locator('#output');
  await expect(output).toBeVisible();
  await expect(output.locator('#name')).toContainText('Jill Valentine');
  await expect(output.locator('#email')).toContainText('jillV@gmail.com');
  await expect(output.locator('#currentAddress')).toContainText('Jl. Semesta');
  await expect(output.locator('#permanentAddress')).toContainText('Jl. Sentosa 2');
}
test('website formy project-Form page', async ({ page }) => {
  await page.goto('https://demoqa.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
  await page.getByRole('link', { name: 'Elements', exact: true }).click();
  await expect(page).toHaveURL('https://demoqa.com/elements');

  await page.getByText('Text Box').click();

  await expect(page).toHaveURL('https://demoqa.com/text-box');

  await fillTextBox(page);
});
