@RestResource(urlMapping='/Account/*')
global without sharing class TestingWebServices {

    @HttpGet
    global static List<Account> getAccounts() {

        RestRequest request = RestContext.request;
        System.debug('request>>>>>>' + request);
        String accId = request.params.get('accId');
        
        try {
            List<Account> acc = [SELECT Id, Name 
                            FROM Account 
                            LIMIT 10];
            return acc;
        } catch(Exception e) {
            System.debug('EXCEPTION: ' + e.getLineNumber() + ' ' + e.getMessage());
            return null;
        }
    }   

    @HttpPost
    global static String myPostMethod(String s1, Integer i1, Boolean b1, String s2) {

        system.debug('ALO BREEE');
        return 'RADI' + s1 + i1 + b1 + s2;

        // Attachment attachment = new Attachment();
        // attachment.Body = Blob.valueOf(encodedContentsString);
        // attachment.Name = String.valueOf('test.txt');
        // attachment.ParentId = accountId; 
        // insert attachment;
    }
}