({
    doInit : function(component, event, helper) {
        //shuffle numbers
        helper.shuffleCards(component, event, helper);
    },
    checkNumberOfMatches : function (component, event, helper) {
        let nom = component.get("v.numberOfMatches");
        console.log("NUMBER OF MATCHES IN PARENT COMPONENT: " + nom);
        if(nom >= 24) {
            console.log("BOARD CLEARED");
            component.set("v.boardCleared", true);
            // PREBACI TIMER UNUTAR MEMORY BOARD I NAMESTI DA KRENE CIM SE OKRENE JEDAN CARD I DA SE ZAUSTAVI KAD SE RESI 
        }
    },
    resetBoardHandler : function (component, event, helper) {
        console.log("reset")
        helper.shuffleCards(component, event, helper);
        helper.resetValues(component, event, helper);
    }
})