global class testingBatch implements Database.Batchable<sObject> {
    global String str1;
    global String str2;
    global Integer int1;

    global Database.QueryLocator start(Database.BatchableContext BC){

        String query = 'SELECT Id, Name ' 
                     + 'FROM Fighter__c';
        return Database.getQueryLocator(query);
    }

    global void execute(Database.BatchableContext BC, List<Fighter__c> scope){

        List<Fighter__c> lstf = new List<Fighter__c>();
        for(Fighter__c f : scope) {
            lstf.add(f);
            system.debug('Fighter Name : ' + f.Name);
        }
        update lstf;
    }

    global void finish(Database.BatchableContext BC){
        system.debug('FINISH BATCH MESSAGE');
        system.debug(str1);
        system.debug(str2);
        system.debug(int1);
    }
}