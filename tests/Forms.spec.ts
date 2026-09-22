import {test, expect, Page} from '@playwright/test';
import path from 'path';
export async function fillForm(page: Page, manualDate?: string){
  await page.getByPlaceholder('First Name').fill('Jill');
  await page.getByPlaceholder('Last Name').fill('Valentine');
  await page.getByPlaceholder('name@example.com').fill('jillV@gmail.com');
  await page.getByText('Female', {exact: true}).click();
  await page.getByPlaceholder('Mobile Number').fill('0845789632');

  let dateToFill: string;

  if(manualDate){
    dateToFill =manualDate;
  }else {
    const today =new Date();
    const dd=String(today.getDate()).padStart(2,'0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const mm= monthNames[today.getMonth()];
    const yyyy=String(today.getFullYear());

    dateToFill = `${dd} ${mm} ${yyyy}`;
  }
  const dateInput=page.locator('#dateOfBirthInput');
  await dateInput.click();
  await page.keyboard.press('Control+a');
  await dateInput.fill(dateToFill);
  await page.keyboard.press('Enter');

  await page.locator('#subjectsInput').fill('Computer Science');
  await page.keyboard.press('Enter');

  await page.getByText('Sports', {exact: true}).click();
  await page.getByText('Reading', {exact: true}).click();

  await page.locator('#uploadPicture').setInputFiles(path.join(__dirname,'R6 wallpaper.jpg'))

  await page.getByPlaceholder('Current Address').fill('Jl.Biangkara 20');

  await page.locator('#state').click();
  await page.getByText('NCR', {exact: true}).click();

  await page.locator('#city').click();
  await page.getByText('Delhi', {exact: true}).click();

  const submitBtn = page.locator('#submit');
  await submitBtn.scrollIntoViewIfNeeded();
  await submitBtn.click();


}

test('website Demosite project-Form page', async ({ page }) => {
  await page.goto('https://demoqa.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });
  await page.getByRole('link', { name: 'Forms', exact: true }).click();
  await expect(page).toHaveURL('https://demoqa.com/forms');

  await page.getByText('Practice Form').click();

  await expect(page).toHaveURL('https://demoqa.com/automation-practice-form');

  await fillForm(page);
  await page.evaluate(() => {
    document.querySelector('#fixedban')?.remove();
    document.querySelector('footer')?.remove();
  });

  const modal = page.locator('.modal-content');
  await expect(modal).toBeVisible();
  await expect(page.getByText('Thanks for submitting the form')).toBeVisible();

});
