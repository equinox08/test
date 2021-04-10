({
    doInit : function(component, event, helper) {
        console.log("KARTA: " + component.get("v.card"));
    },

    // REFAKTORISI SECOND CARD, TREBA DA PROVERAVA MATCH RANIJE, NE NAKON TIMEOUTA!!!
    flipCard : function(component, event, helper) {
        debugger;
        console.log(component.get("v.isMatch"));
        let firstFlippedCard = component.get("v.firstFlippedCard");
        let secondFlippedCard = component.get("v.secondFlippedCard");
        let card = String(component.get("v.card"));
        
        if (firstFlippedCard.flipped == true && secondFlippedCard.flipped == true) {
            return;
        }

        if(firstFlippedCard.flipped == false) {
            debugger;
            //logic for first card
            firstFlippedCard.value = String(card);
            firstFlippedCard.flipped = true;

            component.set("v.flipped", true);

            setTimeout(function(){
                //check if match = true, before turn card on the back side
                let match = component.get("v.isMatch");
                if(match == true){
                    //if there is match, card will not flip on the back
                    component.set("v.flipped", true);
                    component.set("v.isMatch", false);
                } else {
                    //if there is no match, card will flip on the back
                    component.set("v.flipped", false);
                    component.set("v.isMatch", false);

                    firstFlippedCard.flipped = false;
                    firstFlippedCard.value = '';
                    component.set("v.firstFlippedCard", firstFlippedCard);
                }
            }, 1500);
            component.set("v.firstFlippedCard", firstFlippedCard);

        } else {
            //logic for second card, if first card already has value
            component.set("v.flipped", true);
            secondFlippedCard.value = String(card);
            secondFlippedCard.flipped = true;

            component.set("v.firstFlippedCard", firstFlippedCard);
            component.set("v.secondFlippedCard", secondFlippedCard);

            setTimeout(function(){
                //check if match = true, before turn card on the back side
                let match = component.get("v.isMatch");
                if(match == true){
                    // if there is match, card will not flip on the back
                    component.set("v.flipped", true);
                } else {
                    //if there is no match, card will flip on the back side
                    component.set("v.flipped", false);
                }
                // reset values for new matching
                firstFlippedCard.flipped = false;
                secondFlippedCard.flipped = false;
                firstFlippedCard.value = '';
                secondFlippedCard.value = '';

                component.set("v.isMatch", false);
                component.set("v.firstFlippedCard", firstFlippedCard);
                component.set("v.secondFlippedCard", secondFlippedCard);

            }, 1500);
        }

    },

    checkMatch : function(component, evet, helper) {
        let secondCard = component.get("v.secondFlippedCard.value");
        let firstCard = component.get("v.firstFlippedCard.value")
        let card = component.get("v.card");
        let nom = component.get("v.numberOfMatches");
    
        if(firstCard != '' & secondCard != '' && card === firstCard && card === secondCard && firstCard === secondCard) {
            nom++
            component.set("v.isMatch", true);
            component.set("v.numberOfMatches", nom);
            console.log("MATCH!!!!")
        }
    },

    resetBoardHandler : function (component, event, helper) {
        component.set("v.flipped", false);
        //IGRA NE RADI KAD SE RESETUJE!!!!
    }
})