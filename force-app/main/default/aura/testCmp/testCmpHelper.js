({
    getFighters : function(component, event, helper) {
            let action = component.get("c.fighters");
            action.setCallback(this,function(response){
                let state = response.getState();
                if (state === "SUCCESS"){
                    let fighters = response.getReturnValue();
                    if(fighters != null){
                        component.set("v.fighters", fighters);
                        component.set("v.fightersLoaded", true);
    
                    } else{
                        console.log('empty');
                    }
                } else {
                    console.log(n.status + ' - Unable to submit case');
                }
    
            });
            $A.enqueueAction(action);
    },

    getPicklistValues : function(component, event, helper) {
        let action = component.get("c.getPicklistValues");
        action.setCallback(this,function(response){
            let state = response.getState();
            if (state === "SUCCESS"){
                let divisions = response.getReturnValue();
                if(divisions != null){
                    let divisionsPck = [{"Id": 0, "selecter": 'All', "label": 'All'}];
                    let divisionsCount = 0;
              
                    divisions.map(item => {
                     item = {
                    "Id": divisionsCount + 1,
                    "selecter": item,
                    "label": item
                };
                divisionsPck.push(item);
                divisionsCount += 1;
                if(item.selected){
                    component.set("v.selectedDivision", item.label);
                }

            })
                    console.log(divisionsPck);
                    component.set("v.divisions", divisionsPck);

                } else{
                    console.log('empty');
                }
            } else {
                console.log(divisions.status);
            }

        });
        $A.enqueueAction(action);
},

    filter : function(component, event, helper) {
        component.set("v.fightersLoaded", false);
        let action = component.get("c.filterFighters");
        action.setParams({
            division: component.get("v.selectedDivision")
        });
            action.setCallback(this,function(response){
                let state = response.getState();
                if (state === "SUCCESS"){
                    let filteredFighters = response.getReturnValue();
                    if(filteredFighters != null){
                        console.log(filteredFighters);
                        component.set("v.fighters", filteredFighters);
                        component.set("v.fightersLoaded", true);
                        component.set("v.showProfile", false);
    
                    } else{
                        console.log('empty');
                    }
                } else {
                    console.log(n.status + ' - Unable to submit case');
                }
    
            });
            $A.enqueueAction(action); 
    }

})