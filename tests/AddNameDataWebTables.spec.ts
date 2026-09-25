import { test, expect, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export async function MoreDataWebTables(page: Page) {
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      #fixedban, footer, iframe, [id^="google_ads"], #close-fixedban { 
        display: none !important; 
        visibility: hidden !important; 
      }
    `;
    document.head.appendChild(style);
  });

  const generatedEmails: string[] = [];

  for (let i = 1; i <= 20; i++) {
    const firstName = `User${i}`;
    const lastName = `Test${i}`;
    const email = `user${i}_${faker.string.alphanumeric(4).toLowerCase()}@gmail.com`;
    const age = (20 + (i % 30)).toString();
    const salary = (10000 + i * 1000).toString();
    const department = 'QA Team';

    generatedEmails.push(email);
    const addButton = page.locator('#addNewRecordButton');
    await addButton.scrollIntoViewIfNeeded();
    await addButton.click();

    const modal = page.locator('.modal-content');
    await expect(modal).toBeVisible({ timeout: 10000 });

    await page.locator('#firstName').fill(firstName);
    await page.locator('#lastName').fill(lastName);
    await page.locator('#userEmail').fill(email);
    await page.locator('#age').fill(age);
    await page.locator('#salary').fill(salary);
    await page.locator('#department').fill(department);

    await page.locator('#submit').click();

    await expect(modal).toBeHidden({ timeout: 10000 });
  }
  return generatedEmails;
}

test('website DemoQA project - Web Tables Pagination Test', async ({ page }) => {
  test.setTimeout(180000);

  await page.route('**/*', route => {
    const url = route.request().url();
    if (
        url.includes('doubleclick') ||
        url.includes('adservice') ||
        url.includes('googlesyndication') ||
        url.includes('google-analytics')
    ) {
      route.abort();
    } else {
      route.continue();
    }
  });

  await page.goto('https://demoqa.com/webtables', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await MoreDataWebTables(page);
});
