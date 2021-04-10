public class triggerTestClass {
    public static void CreateNewOpportunity(List<Account> accts) {
        for (Account a : accts) {
			Opportunity opp = new Opportunity();
			opp.Name = a.Name;
			opp.AccountId = a.Id;
			opp.CloseDate = System.Today().addMonths(1);
			opp.StageName = 'Prospecting';
			
			insert opp;
		}
	}
}