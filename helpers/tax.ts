import Guest from '../classes/Guest';
import { checkInData, taxesAndFees } from '../types/types';
import { getAgeGroup } from './dates';

export const calculateTaxesAndFees = (taxesAndFees: taxesAndFees, checkinData: checkInData): number => {
  let taxesAndFeesSum = 0;
  taxesAndFeesSum += taxesAndFees.adult * checkinData.numOfAdults * checkinData.numOfNights;
  taxesAndFeesSum += taxesAndFees.child * checkinData.numOfChildren * checkinData.numOfNights;
  taxesAndFeesSum += taxesAndFees.petFee * checkinData.numberOfPets * checkinData.numOfNights;
  return taxesAndFeesSum;
};
