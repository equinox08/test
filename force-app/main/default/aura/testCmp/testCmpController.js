({
    doInit : function(component, event, helper) {
        helper.getFighters(component, event, helper);
        helper.getPicklistValues(component, event, helper);
    },

    filterF : function(component, event, helper) {
        helper.filter(component, event, helper);
    },
})