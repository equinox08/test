({
    doInit : function(component, event, helper) {
		console.log("diinit get called!!");
	},
    handleStartClick : function(component, event, helper) {
		console.log("start button clicked!!");
        helper.setStartTimeOnUI(component);
	},
    handleStopClick : function(component, event, helper) {
		console.log("stop button clicked!!");
        helper.setStopTimeOnUI(component);
	},
    handleResetClick : function(component, event, helper) {
		console.log("Reset button clicked!!");
        helper.setResetTimeOnUI(component);
	} ,
	startTimer : function(component, event, helper) {
		let first = component.get("v.firstFlippedCard");
		let something = component.get("v.something");
		if(first.flipped && something) {
			helper.setStartTimeOnUI(component);
			component.set("v.something", false);
		}
	},
	boardClearedHandler : function (component, event, helper) {
		let cleared = component.get("v.boardCleared");

		if(cleared) {
			helper.setStopTimeOnUI(component);
		}
	}
})