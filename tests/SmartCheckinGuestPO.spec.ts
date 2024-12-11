import POmanager from '../pageobjects/POmanager.ts';
import test, { Locator } from '@playwright/test';
import { generateGuests } from '../helpers/guests.ts';
import { calculateTaxesAndFees } from '../helpers/tax.ts';
import { faker } from '@faker-js/faker';

const url: string = 'https://qa.guest.checkin.si/en/apartma-vijolica/dates';

test(`@Guest Guest checkin`, async ({ page }) => {
  const taxesAndFees = {
    adult: 3.14,
    child: 1.57,
    minor: 0,
    petFee: 5
  };
  const checkInData = {
    checkIn: 1,
    checkOut: 12,
    numOfNights: 11,
    numOfAdults: faker.number.int({ min: 1, max: 5 }),
    numOfChildren: faker.number.int({ min: 1, max: 3 }),
    numOfMinors: faker.number.int({ min: 1, max: 2 }),
    numberOfPets: faker.number.int({ min: 1, max: 3 })
  };
  const testData = generateGuests(checkInData.numOfAdults, checkInData.numOfChildren, checkInData.numOfMinors);
  const taxAndFees = calculateTaxesAndFees(taxesAndFees, checkInData);
  const poManager = new POmanager(page);
  const guestCheckinPage = poManager.getGuestCheckinPage();
  await guestCheckinPage.goTo(url);
  await guestCheckinPage.selectCheckInOutDates(checkInData.checkIn, checkInData.checkOut);
  await guestCheckinPage.clickSubmit();
  for (let i = 1; i < testData.length; i++) {
    await guestCheckinPage.addGuest(i);
  }
  const guests: Locator = page.locator('.MuiPaper-root');
  const guestCount: number = await guests.count();
  for (let i = 0; i < guestCount; i++) {
    await guestCheckinPage.insertGuestDetails(guests.nth(i), testData[i]);
  }
  await guestCheckinPage.clickSubmit();
  await guestCheckinPage.enterNumberOfPets(checkInData.numberOfPets);
  await guestCheckinPage.clickSubmit();
  await guestCheckinPage.verifyTaxesAndFees(taxAndFees, taxesAndFees.petFee * checkInData.numberOfPets);
  await page.pause();
});
