public  class testClass {

    @AuraEnabled(cacheable=true)
    public static List<Fighter__c> fighters(){
        List<Fighter__c> fightersLst = [SELECT Id, Name, Age__c, Division__c, Fight_Record__c, Small_image__c, Champion__c, Nickname__c, Weight__c, Height__c, Country__c 
                                        FROM Fighter__c];
                                        
        return fightersLst != null ? fightersLst : new List<Fighter__c>();
    }

    @AuraEnabled(cacheable=true)
    public static List<Fighter__c> filterFighters(String division){
        System.debug(division);
        return division == 'All' ? [SELECT Name, Age__c, Division__c, Fight_Record__c, Small_image__c, Champion__c, Nickname__c, Weight__c, Height__c,  Country__c 
                                    FROM Fighter__c]
                                 : [SELECT Name, Age__c, Division__c, Fight_Record__c, Small_image__c, Champion__c, Nickname__c, Weight__c, Height__c,  Country__c 
                                    FROM Fighter__c 
                                    WHERE Division__c =: division];

    }

    //get picklist values
    @AuraEnabled
    public static List<String> getPicklistValues(){ 
        
        
        // List<String> lstPickvals=new List<String>();
        // Schema.SObjectType targetType = Schema.getGlobalDescribe().get('Fighter__c');
        // Sobject Object_name = targetType.newSObject();
        // Schema.sObjectType sobject_type = Object_name.getSObjectType(); 
        // Schema.DescribeSObjectResult sobject_describe = sobject_type.getDescribe(); 
        // Map<String, Schema.SObjectField> field_map = sobject_describe.fields.getMap(); 
        // List<Schema.PicklistEntry> pick_list_values = field_map.get('Division__c').getDescribe().getPickListValues(); 
        // for (Schema.PicklistEntry a : pick_list_values) { 
        //     lstPickvals.add(a.getValue());
        // }
              // List<String> lstPickvals=new List<String>();
        // Schema.SObjectType targetType = Schema.getGlobalDescribe().get('Fighter__c');
        // Sobject Object_name = targetType.newSObject();
        // Schema.sObjectType sobject_type = Object_name.getSObjectType(); 
        // Schema.DescribeSObjectResult sobject_describe = sobject_type.getDescribe(); 
        // Map<String, Schema.SObjectField> field_map = sobject_describe.fields.getMap(); 
        // List<Schema.PicklistEntry> pick_list_values = field_map.get('Division__c').getDescribe().getPickListValues(); 
        // for (Schema.PicklistEntry a : pick_list_values) { 
        //     lstPickvals.add(a.getValue());
        // }
        
        // return lstPickvals;
        ////////////////

            List<String> options = new List<String>();
            Schema.DescribeFieldResult fieldResult = Fighter__c.Division__c.getDescribe();
            List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();

            for(Schema.PicklistEntry f : ple) {
                options.add(f.getValue());
            }
            return options;

    }
}