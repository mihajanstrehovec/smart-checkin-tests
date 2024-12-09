import { faker } from '@faker-js/faker';

class Guest {
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: {
    day: number;
    month: number;
    year: number;
  };
  nationality: string;
  documentType: string;
  documentNumber: string;

  constructor(title: string, isAdult = true) {
    const currentYear = new Date().getFullYear();
    this.title = title;
    this.firstName = faker.person.firstName();
    this.lastName = faker.person.lastName();
    this.gender = faker.string.fromCharacters(['F', 'M']);
    this.birthDate = {
      month: faker.number.int({ min: 1, max: 12 }),
      year: faker.number.int({ min: isAdult ? 1920 : currentYear - 17, max: isAdult ? currentYear - 18 : currentYear }),
      day: 0
    };
    this.birthDate.day = this.generateBirthDateDay();
    this.nationality = faker.location.country();
    this.documentType = faker.string.fromCharacters(['I', 'P', 'V']);
    this.documentNumber = faker.string.alphanumeric(8);
  }

  generateBirthDateDay() {
    const { year, month } = this.birthDate;
    const daysInMonth = {
      1: 31, // January
      2: year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28, // February
      3: 31, // March
      4: 30, // April
      5: 31, // May
      6: 30, // June
      7: 31, // July
      8: 31, // August
      9: 30, // September
      10: 31, // October
      11: 30, // November
      12: 31 // December
    };
    return faker.number.int({ min: 1, max: daysInMonth[month] });
  }
}

export default Guest;
