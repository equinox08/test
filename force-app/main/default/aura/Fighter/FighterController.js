({
    openDetails : function (component, event, helper) {
        let toggleDiv =  component.find("tgl");
        $A.util.toggleClass(toggleDiv, 'visible');
    },
    showFighterProfile : function (component, event, helper) {
        component.set("v.showProfile", true);
        console.log(component.get("v.fighter.Id"));
        //Napravi Event da posaljes ID FighterProfile komponenti
    },
})