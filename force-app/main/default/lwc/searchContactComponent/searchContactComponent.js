import { LightningElement, wire } from 'lwc';
import searchContacts from '@salesforce/apex/SearchContactController.searchContacts';

const DELAY = 300;

export default class SearchContactComponent extends LightningElement {
    searchKey = '';

    @wire(searchContacts, {searchKey : '$searchKey'})
    contacts;

    handleKeyChange(event) {
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        this.delayTimeout = setTimeout(() => {
            this.searchKey = searchKey;
        }, DELAY)
    }
}