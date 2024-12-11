import Guest from '../classes/Guest';

export const generateGuests = (adults: number, children: number, minors: number): Guest[] => {
  let guests: Guest[] = [new Guest('Main guest', 'adult')];
  for (let index = 1; index < adults; index++) {
    guests.push(new Guest(`Guest ${guests.length + 1}`, 'adult'));
  }

  for (let index = 0; index < children; index++) {
    guests.push(new Guest(`Guest ${guests.length + 1}`, 'child'));
  }

  for (let index = 0; index < minors; index++) {
    guests.push(new Guest(`Guest ${guests.length + 1}`, 'minor'));
  }
  // for (let i = 1; i < guestCount; i++) {
  //   if (childrenCount > 0) {
  //     guests.push(new Guest(`Guest ${i + 1}`, false));
  //   } else {
  //     guests.push(new Guest(`Guest ${i + 1}`));
  //   }
  //   childrenCount--;
  // }
  return guests;
};
