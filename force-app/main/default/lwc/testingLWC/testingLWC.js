import { LightningElement, wire, api, track } from 'lwc';
import  fighters  from '@salesforce/apex/testClass.fighters';
import filterFighters from '@salesforce/apex/testClass.filterFighters';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import DIVISION_FIELD from '@salesforce/schema/Fighter__c.Division__c';
import FIGHTER_OBJECT from '@salesforce/schema/Fighter__c'; 

export default class TestingLWC extends LightningElement {
    @track items = [];
    @track value = '';
    @track chosenValue = '';
    @track filteredFightersList;
    @track error;

    @wire (getObjectInfo, {objectApiName: FIGHTER_OBJECT})
    objectInfoFunction({error, data}) {
        console.log(data);
    };

    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: DIVISION_FIELD })
    divisionFieldFunction({error, data}) {
        if (data) {
            this.items = data.values;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.items = undefined;
        }
    };

    get roleOptions() {
        return this.items;
    }

    handleChange(event) {
        this.chosenValue = event.detail.value;
        filterFighters({division : this.chosenValue})
                .then(result => {
                    this.filteredFightersList = result;
                    this.error = undefined;
                })
                .catch(error => {
                    this.error = error;
                    this.filteredFightersList = undefined;
                });
    }

    @wire(fighters) fightersList;
    
}