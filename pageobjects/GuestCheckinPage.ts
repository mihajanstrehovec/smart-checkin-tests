import { expect, Locator, type Page } from "@playwright/test"
import { Person } from "../types/types"
import Guest from "../classes/Guest"

const submitButtonSelector = 'button[type="submit"]'
const dateInputSelector = 'input[placeholder="MM/DD/YYYY – MM/DD/YYYY"]'
const datePickerSelector = '.MuiDateRangeCalendar-monthContainer div[role="grid"]'
const addGuestSelector = '//button[contains(text(), "Add guest")]'
const cardTitleSelector= '.MuiCardHeader-title'
const guestFormBoxSelector = '.MuiPaper-root'
const firstNameSelector = 'input[id*="first_name"]'
const lastNameSelector = 'input[id*="last_name"]'
const mainGuestEmailSelector = 'input[id="mainGuest.email"]'
const documentTypeSelector = 'div[id*=document_type]'
const docuemntTypeDropDownSelector = '[aria-labelledby*="document_type_label"][role=listbox]'
const documentNumberSelector = 'input[id*=document_number]'
const nationalityPopUpSelector = 'div[role="presentation"]'

class GuestCheckInPage {
    page: Page;
    submitButton: Locator;
    dateInput: Locator
    datePicker: Locator
    addGuestLocator: Locator
    cardTitle: Locator
    guestFormBox: Locator
    documentTypeDropDown: Locator
    nationalityPopUp: Locator
    
    constructor(page: Page){
        this.page = page
        this.submitButton = page.locator(submitButtonSelector)
        this.dateInput = page.locator(dateInputSelector)
        this.datePicker= page.locator(datePickerSelector)
        this.addGuestLocator= page.locator(addGuestSelector)
        this.cardTitle = page.locator(cardTitleSelector)
        this.guestFormBox = page.locator(guestFormBoxSelector)
        this.documentTypeDropDown = page.locator(docuemntTypeDropDownSelector)
        this.nationalityPopUp = page.locator(nationalityPopUpSelector)
        
    }
    async selectCheckInOutDates(start: number, end: number){
        await this.dateInput.click()
        await this.datePicker.nth(0).locator('button').nth(start).click()
        await this.datePicker.nth(0).locator('button').nth(end).click()
        //expect(await this.dateInput.getAttribute('value')).toMatch(`10/0${start+1}/2024 – 10/${end+1}/2024`) // 10/08/2024 – 10/13/2024
    }
    async goTo(url: string){
        await this.page.goto(url)
    }
    async clickSubmit(){
        await this.submitButton.click()
    }
    async addGuest(i: number){
        await this.addGuestLocator.click()
        await expect(this.cardTitle.nth(i)).toBeVisible()
    }
    
    async insertGuestDetails(guest: Locator, guestData: Guest){
        // await this.checkGuestCardTitle(guest, guestData.guestTitle)
        await guest.locator(firstNameSelector).fill(guestData.firstName)
        await guest.locator(lastNameSelector).fill(guestData.lastName)
        if(await guest.locator(mainGuestEmailSelector).isVisible()){
            await guest.locator(mainGuestEmailSelector).fill('miha.strehovec23@gmail.com')
        }   
        await guest.locator(`[type="radio"][value=${guestData.gender}]`).click()
        
        await this.insertDOB(guest, guestData.birthDate)
        await this.insertNationality(guest, guestData.nationality)
        await this.selectDocumentType(guest, guestData.documentType)

        await guest.locator(documentNumberSelector).fill(guestData.documentNumber)
    }

    async checkGuestCardTitle(guest: Locator, title: string){
        let guestTitle: string | null = await guest.locator(this.cardTitle).textContent()
        await expect(guestTitle).toMatch(title)
    }

    async insertDOB(guest: Locator, dateOfBirth: Person['birthDate']){
        await guest.locator('input[id*="date_of_birth\.day"]').fill(`${dateOfBirth.day}`)
        await guest.locator('input[id*="date_of_birth\.month"]').fill(`${dateOfBirth.month}`)
        await guest.locator('input[id*="date_of_birth\.year"]').fill(`${dateOfBirth.year}`)
    }

    async insertNationality(guest: Locator, nationality: string){
        await guest.locator('input[name*=nationality]').pressSequentially(nationality.substring(0,3))
        await this.nationalityPopUp.waitFor()
        const nationalityCount = await this.nationalityPopUp.locator('li').count()
        for(let i = 0; i < nationalityCount; i++){
            const nationality: string | null = await this.nationalityPopUp.locator('li').nth(i).textContent()
            if(nationality?.includes(nationality)){
                await this.nationalityPopUp.locator('li').nth(i).click()
                break
            }
        }
    }

    async selectDocumentType(guest: Locator, documentType: string){
        await guest.locator(documentTypeSelector).click()
        const dropDown = this.documentTypeDropDown
        await dropDown.waitFor()
        const dropDownCount: number = await dropDown.locator('li').count()
        for(let docIndex = 0; docIndex < dropDownCount; docIndex++){
            if(await dropDown.locator('li').nth(docIndex).getAttribute('data-value') == documentType){
                await dropDown.locator('li').nth(docIndex).click()
                break
            }
        }
    }

}

export default GuestCheckInPage
