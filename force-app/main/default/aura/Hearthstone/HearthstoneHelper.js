({
    getData : function(component, event, helper) {
        let action = component.get("c.getSelectValues");
        action.setCallback(this, function(response){
            let state = response.getState();
            if(state == "SUCCESS") {
                let retVal = response.getReturnValue();
                let info = JSON.parse(retVal);
                let mana = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
                let manaCost = helper.createSelectValues(mana);
                let classes = helper.createSelectValues(info.classes);
                let cardSet = helper.createSelectValues(info.standard)

                component.set("v.classes", classes);
                component.set("v.cardSet", cardSet);
                component.set("v.manaCost", manaCost);
                component.set("v.showFilters", true);
            } else {
                console.log(response.getError());
            }
        });
        $A.enqueueAction(action);
    },
    getSelectedCards : function (component, event, helper) {
        let selectedClass = component.get("v.selectedClass");
        let selectedExpansion = component.get("v.selectedCardSet");
        let selectedManaCost = component.get("v.selectedManaCost");
        let emptyArr = [];

        console.log(selectedManaCost);

        component.set("v.cards", emptyArr );
        
        let action = component.get("c.getFilteredCards");
        action.setParams({
            selectedClass : selectedClass,
            selectedExpansion : selectedExpansion,
            selectedManaCost : selectedManaCost
        })
        action.setCallback(this, function(response) {
            let state = response.getState();
            if(state == "SUCCESS") {
                let retVal = response.getReturnValue();
                console.log(JSON.parse(retVal));
                let parsedRetVal = JSON.parse(retVal);

                let filteredVal = parsedRetVal.filter(function(val) {
                    return val.playerClass == selectedClass && val.img != null && val.img != undefined;
                });
                console.log("FILTERED: " + filteredVal);
                if(filteredVal.length > 0 && filteredVal != null) {
                    component.set("v.cards", filteredVal);
                    component.set("v.showCards", true);
                } else {
                    component.set("v.showCards", false);
                    component.set("v.noCardsMsg", "No Cards for Selected Filter")
                }
                console.log(component.get("v.cards"));
            } else {
                console.log(response.getError()[0].message);
            }
        })
        $A.enqueueAction(action);
    },
    createSelectValues : function (values) {
        let returnValue = [];
        let counter = 0;
        let firstValue = {"Id": 0, "selecter": 'Select Value', "label": 'Select Value'};
        returnValue.push(firstValue);

        if(values != null && values != undefined) {
            values.map(val => {
                val = {
                    "Id": counter + 1,
                    "selecter": val,
                    "label": val
                }
                returnValue.push(val);
                counter ++
            })
        }
        return returnValue;
    },

    validateSelectedValues : function (component, event, helper) {
        let selectedClass = component.get("v.selectedClass");
        let selectedCardSet = component.get("v.selectedCardSet");

        if(selectedClass == '' || selectedClass == 'Select Value' || selectedCardSet == '' || selectedCardSet == 'Select Value') return false
        else return true;
    },

    someTestMethod : function (component, event, helper) {
        let action = component.get("c.testingMethod");
        action.setCallback(this, function(response) {
            debugger;
            let state = response.getState();
            if(state == 'SUCCESS') {
                debugger;
                let retVal = response.getReturnValue();
                console.log("TESTIRANJE: " + retVal);
            } else {
                console.log("ERROR")
            }
        });
        $A.enqueueAction(action);
    }
})