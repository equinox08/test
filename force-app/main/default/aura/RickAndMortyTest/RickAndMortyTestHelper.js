({
    getAllCharacters : function(component, event, helper) {
        let action = component.get("c.AllCharacters");
        action.setCallback(this,function(response){
            let state = response.getState();
            if (state === "SUCCESS"){
                let retVal = response.getReturnValue();
                if(retVal != null){
                    console.log("EJ ALO EJ")
                    console.log(retVal);
                    let parsedRetVal = JSON.parse( retVal );
                    component.set("v.AllCharacters", parsedRetVal.results);
                    
                    
                } else{
                    console.log('retVal is null');
                }
            } else {
                console.log(state + ' - Unable to submit case');
            }
            
        });
        $A.enqueueAction(action); 
    },
    
    getHSInfo : function(component, event, helper) {
        let action = component.get("c.getInfo");
        action.setCallback(this,function(response){
            let state = response.getState();
            if (state === "SUCCESS"){
                let retVal = response.getReturnValue();
                if(retVal != null){
                    console.log("HS HS HS")
                    console.log(retVal);
                    let retValObj = JSON.parse( retVal );
                    console.table(retValObj.classes);
                    console.log(retValObj.classes[1]);
					component.set("v.AllClasses", retValObj.classes);                   	
                    
                    
                } else{
                    console.log('empty');
                }
            } else {
                console.log( 'not succes');
            }
            
        });
        $A.enqueueAction(action); 
    }
})