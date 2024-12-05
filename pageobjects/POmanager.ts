import { type Page } from "@playwright/test";
import GuestCheckInPage from "./GuestCheckinPage.ts";

class POmanager {
    page: Page
    guestCheckinPage: GuestCheckInPage

    constructor(page : Page){
        this.page = page
        this.guestCheckinPage = new GuestCheckInPage(this.page)
    }
    getGuestCheckinPage(){
        return this.guestCheckinPage
    }
}

export default POmanager