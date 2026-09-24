import { test, expect, Page } from '@playwright/test';

interface EditFormData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  salary: string;
  department: string;
}

export async function searchBarWebTables(
    page: Page, keyword: string
) {
  await page.evaluate(() => {
    document.querySelectorAll('#fixedban, footer, iframe, [id^="google_ads"]').forEach(el => el.remove());
  });

  const searchBox = page.getByPlaceholder('Type to search');
  await expect(searchBox).toBeVisible();

  await searchBox.clear();
  await searchBox.fill(keyword);

  const matchedRow= page.getByRole('row').filter({hasText: keyword});
  await expect(matchedRow).toBeVisible();

}

test('website DemoQA project - Search Bar', async ({ page }) => {
  await page.goto('https://demoqa.com/webtables', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  await searchBarWebTables(page,'Kierra');

  await searchBarWebTables(page,'Alden');

  const searchBox = page.getByPlaceholder('Type to search');
  await searchBox.clear();
  await searchBox.fill('NameNotFound');
});