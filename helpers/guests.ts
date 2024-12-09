import Guest from '../classes/Guest';

export const generateGuests = (guestCount: number, childrenCount = 1): Guest[] => {
  let guests: Guest[] = [new Guest('Main guest')];
  for (let i = 1; i < guestCount; i++) {
    if (childrenCount > 0) {
      guests.push(new Guest(`Guest ${i + 1}`, false));
    } else {
      guests.push(new Guest(`Guest ${i + 1}`));
    }
    childrenCount--;
  }
  return guests;
};
