({
    waitingTimeId: null,
	setStartTimeOnUI : function(component) {
        component.set("v.ltngIsDisplayed",true);
        let currTime =component.get("v.ltngCurrTime");
        let ss = currTime.split(":");
        let dt = new Date();
        dt.setHours(ss[0]);
        dt.setMinutes(ss[1]);
        dt.setSeconds(ss[2]);
        
        let dt2 = new Date(dt.valueOf() + 1000);
        let temp = dt2.toTimeString().split(" ");
        let ts = temp[0].split(":");
        
        component.set("v.ltngCurrTime",ts[0] + ":" + ts[1] + ":" + ts[2]);
        this.waitingTimeId =setTimeout($A.getCallback(() => this.setStartTimeOnUI(component)), 1000);
    },
    setStopTimeOnUI : function(component) {
        component.set("v.ltngIsDisplayed",false);
        window.clearTimeout(this.waitingTimeId);
    },
    setResetTimeOnUI : function(component) {
        component.set("v.ltngIsDisplayed",false);
        component.set("v.ltngCurrTime","00:00:00");
        window.clearTimeout(this.waitingTimeId);
        component.set("v.resetBoard", true);
    }

})