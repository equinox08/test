trigger testTrigger on Account (after insert, after update, before insert, before update) {
    if(trigger.isAfter && trigger.isInsert) {
		triggerTestClass.CreateNewOpportunity(Trigger.new);
    }
}