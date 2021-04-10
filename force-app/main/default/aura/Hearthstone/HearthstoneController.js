({
    doInit : function(component, event, helper) {
        helper.getData(component, event, helper);
        helper.someTestMethod(component, event, helper);
    },
    getCards : function (component, event, helper) {
        let validate = helper.validateSelectedValues(component, event, helper);

        if(validate) {
            helper.getSelectedCards(component, event, helper);
            component.set("v.showErrorMsg", false);
        }
        else {
            component.set("v.showErrorMsg", true);
        }
    }
})