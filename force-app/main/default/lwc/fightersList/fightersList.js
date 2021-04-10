import { LightningElement, wire, track, api } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import filterFighters from '@salesforce/apex/testClass.filterFighters';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import FIGHTER from '@salesforce/schema/Fighter__c';
import DIVISION_FIELD from '@salesforce/schema/Fighter__c.Division__c';

export default class FightersList extends LightningElement {
    @track error;
    @track options;
    selectedOption;
    filteredFighters;
    fighterRecordTypeId;
    @api recordId;

    @wire(getContacts)
    contacts;

    @wire(getObjectInfo, {objectApiName: FIGHTER})
    getObjectData({data, error}) {
        if(data) {
            this.fighterRecordTypeId = data.defaultRecordTypeId;
        }
        else if(error) {
            this.error = error;
        }
    }
    
    @wire(getPicklistValues, {recordTypeId: '$fighterRecordTypeId', fieldApiName: DIVISION_FIELD})
    setPicklistOptions({data, error}) {
        if(data) {
            this.options = data.values;
            this.error = undefined;
        }
        else if(error) {
            this.error = error;
        }
    }

    handleChange(event){
        this.selectedOption = event.detail.value;
    }

    useFilter() {
        filterFighters({division: this.selectedOption})
            .then(result=> {
                console.log(result);
                this.filteredFighters = result;
            })
            .catch(error => {
                this.error = error;
            })
    }
}