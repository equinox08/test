import { LightningElement, api } from 'lwc';

export default class Tooltip extends LightningElement {
    @api text;

    showHideHelpText() {
        const element = this.template.querySelector('[data-id="overview"]');
        element.classList.toggle("slds-hide");
    }
}