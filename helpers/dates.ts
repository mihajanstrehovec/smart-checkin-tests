export const getMonthNumberFromName = (month: string): number => {
  const nameNumberPairing = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    Oktober: 10,
    November: 11,
    December: 12
  };
  return nameNumberPairing[month];
};

export const getAgeGroup = (birthDate): string => {
  const today = new Date();
  let age = 0;
  if (today.getMonth() > birthDate.month) {
    age = today.getFullYear() - birthDate.year;
  } else if (today.getMonth() == birthDate.month && today.getDay() > birthDate.day) {
    age = today.getFullYear() - birthDate.year;
  } else {
    age = today.getFullYear() - birthDate.year - 1;
  }
  if (age > 18) {
    return 'adult';
  } else if (age > 7) {
    return 'child';
  }
  return 'minor';
};
