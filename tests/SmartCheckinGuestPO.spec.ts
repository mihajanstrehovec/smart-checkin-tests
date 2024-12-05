import POmanager from '../pageobjects/POmanager.ts'
import test, { Locator } from '@playwright/test'
import { Guests } from '../types/types'

const testData: Guests = [
  {
    guestTitle: 'Main guest',
    firstName: 'John',
    lastName: 'Doe',
    gender: 'M',
    birthDate: {
      day: '12',
      month: '5',
      year: '1985'
    },
    nationality: 'Slovenia',
    documentType: 'P',
    documentNumber: 'A12345678'
  },
  {
    guestTitle: 'Guest 2',
    firstName: 'Jane',
    lastName: 'Smith',
    gender: 'F',
    birthDate: {
      day: '23',
      month: '8',
      year: '1990'
    },
    nationality: 'Austria',
    documentType: 'P',
    documentNumber: 'B87654321'
  },
  {
    guestTitle: 'Guest 3',
    firstName: 'Emily',
    lastName: 'Johnson',
    gender: 'F',
    birthDate: {
      day: '3',
      month: '12',
      year: '1975'
    },
    nationality: 'Germany',
    documentType: 'I',
    documentNumber: 'C98765432'
  },
  {
    guestTitle: 'Guest 4',
    firstName: 'Michael',
    lastName: 'Brown',
    gender: 'M',
    birthDate: {
      day: '15',
      month: '1',
      year: '1983'
    },
    nationality: 'France',
    documentType: 'V',
    documentNumber: 'D65432109'
  },
  {
    guestTitle: 'Guest 5',
    firstName: 'Olivia',
    lastName: 'Davis',
    gender: 'F',
    birthDate: {
      day: '30',
      month: '6',
      year: '1995'
    },
    nationality: 'Italy',
    documentType: 'P',
    documentNumber: 'E43210987'
  },
  {
    guestTitle: 'Guest 6',
    firstName: 'William',
    lastName: 'Miller',
    gender: 'M',
    birthDate: {
      day: '17',
      month: '9',
      year: '1988'
    },
    nationality: 'Slovenia',
    documentType: 'I',
    documentNumber: 'F98712345'
  },
  {
    guestTitle: 'Guest 7',
    firstName: 'Sophia',
    lastName: 'Wilson',
    gender: 'F',
    birthDate: {
      day: '11',
      month: '2',
      year: '1992'
    },
    nationality: 'Croatia',
    documentType: 'V',
    documentNumber: 'G19283746'
  },
  {
    guestTitle: 'Guest 8',
    firstName: 'James',
    lastName: 'Taylor',
    gender: 'M',
    birthDate: {
      day: '9',
      month: '11',
      year: '1981'
    },
    nationality: 'Hungary',
    documentType: 'P',
    documentNumber: 'H56789012'
  },
  {
    guestTitle: 'Guest 9',
    firstName: 'Isabella',
    lastName: 'Anderson',
    gender: 'F',
    birthDate: {
      day: '5',
      month: '3',
      year: '1987'
    },
    nationality: 'Slovenia',
    documentType: 'I',
    documentNumber: 'I23456789'
  },
  {
    guestTitle: 'Guest 10',
    firstName: 'David',
    lastName: 'Thomas',
    gender: 'M',
    birthDate: {
      day: '28',
      month: '4',
      year: '1993'
    },
    nationality: 'Austria',
    documentType: 'P',
    documentNumber: 'J34567890'
  }
];
const url: string = 'https://qa.guest.checkin.si/en/apartma-vijolica/dates'

test(`@Guest Guest checkin`, async ({page}) => {
  const poManager = new POmanager(page)
  const guestCheckinPage = poManager.getGuestCheckinPage()
  await guestCheckinPage.goTo(url)
  await guestCheckinPage.selectCheckInOutDates(7,12)
  await guestCheckinPage.clickSubmit()
  for(let i = 1; i < testData.length; i++){
    await guestCheckinPage.addGuest(i)
  }
  const guests: Locator = page.locator('.MuiPaper-root')
  const guestCount: number = await guests.count()
  for(let i = 0; i < guestCount; i++){
      await guestCheckinPage.insertGuestDetails(guests.nth(i), testData[i])
  }
  await guestCheckinPage.clickSubmit()
  await guestCheckinPage.clickSubmit()
  await page.pause()
})

  



