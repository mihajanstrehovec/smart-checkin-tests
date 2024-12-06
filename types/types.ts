import { type Locator, type Page } from "@playwright/test";


export interface GuestCheckinPageTypes{
    page: Page;
    submitButton: Locator;
    dateInput: Locator
    datePicker: Locator
    addGuestLocator: Locator
    cardTitle: Locator
    guestFormBox: Locator
    documentTypeDropDown: Locator
    nationalityPopUp: Locator
}

export type Gender = 'M' | 'F'
export type DocumentType = 'I' | 'P' | 'V'

export type NumberRangeUnion<Start extends number, End extends number, Acc extends number[] = [Start]> = 
  Acc['length'] extends End
    ? Acc[number]
    : NumberRangeUnion<Start, End, [...Acc, Acc['length']]>;

export interface Person {
    guestTitle: string
    firstName: string
    lastName: string
    gender: Gender
    birthDate: {
        day: number
        month: number
        year: number
    },
    nationality: string
    documentType: DocumentType
    documentNumber: string
}

export type Guests = Array<Person>