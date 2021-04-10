({
    shuffleCards : function(component, event, helper) {
        console.log("DOINIT")
        let cards = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]
        console.log(cards);
        for(let i = cards.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = cards[i]
            cards[i] = cards[j]
            cards[j] = temp
          }
        console.log('shuffled: ' + cards);
        component.set("v.Cards", cards);
        console.log("CARDS GETTED: " + component.get("v.Cards"))
    },
    resetValues : function (component, event, helper) {
        component.set("v.firstFlippedCard", "{'flipped': false, 'value':''}");
        component.set("v.secondFlippedCard", "{'flipped': false, 'value':''}");
        component.set("v.numberOfMatches", 0);
        component.set("v.boardCleared", false);
        component.set("v.resetBoard", false);
    }
})