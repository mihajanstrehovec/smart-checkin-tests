import POmanager from '../pageobjects/POmanager.ts';
import test, { Locator } from '@playwright/test';
import { generateGuests } from '../helpers/guests.ts';

const url: string = 'https://qa.guest.checkin.si/en/apartma-vijolica/dates';

test(`@Guest Guest checkin`, async ({ page }) => {
  const testData = generateGuests(5, 4);
  const poManager = new POmanager(page);
  const guestCheckinPage = poManager.getGuestCheckinPage();
  await guestCheckinPage.goTo(url);
  await guestCheckinPage.selectCheckInOutDates(1, 23);
  await guestCheckinPage.clickSubmit();
  for (let i = 1; i < testData.length; i++) {
    await guestCheckinPage.addGuest(i);
  }
  const guests: Locator = page.locator('.MuiPaper-root');
  const guestCount: number = await guests.count();
  for (let i = 0; i < guestCount; i++) {
    await guestCheckinPage.insertGuestDetails(guests.nth(i), testData[i]);
  }
  await page.pause();
  await guestCheckinPage.clickSubmit();
  await guestCheckinPage.clickSubmit();
  await page.pause();
});
