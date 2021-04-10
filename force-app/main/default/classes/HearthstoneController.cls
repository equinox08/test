public class HearthstoneController {

    final public static String RAPID_KEY = System.label.Rapid_API_HS_KEY;
    final public static String RAPID_HOST = System.label.Rapid_API_HS_Host;
    final public static String HS_BASE_URL = 'https://omgvamp-hearthstone-v1.p.rapidapi.com/';

    public class Info {
        public String patch;
        public List<String> classes;
        public List<String> sets;
        public List<String> standard;
        public List<String> wild;
        public List<String> types;
        public List<String> factions;
        public List<String> qualities;
        public List<String> races;
        public List<String> locales;
    }

    public static HttpRequest createRequestForHS (String url) {
        HttpRequest request =new HttpRequest();
        request.setEndpoint(url);
        request.setMethod('GET');
        request.setHeader('x-rapidapi-host', RAPID_HOST);
        request.setHeader('x-rapidapi-key', RAPID_KEY);
        return request;
    }

    @AuraEnabled
    public static String getSelectValues(){
        Http http = new Http();
        HttpRequest request = createRequestForHS(HS_BASE_URL + 'info');
        Info info = new Info();

        HttpResponse response = http.send(request);
        
        if(response.getStatusCode() == 200 ) {
            info = (Info) System.JSON.deserialize(response.getBody(), Info.class);
            System.debug(info);
            return JSON.Serialize(info);
        } else {
            System.debug('RESPONSE ERROR');
            System.debug(response.getStatus());
            return JSON.Serialize(info);
        }
    }

    @AuraEnabled
    public static String getFilteredCards(String selectedClass, String selectedExpansion, String selectedManaCost ){

        selectedManaCost = selectedManaCost == 'Select Value' ? '' : selectedManaCost;

        String[] lstString = selectedExpansion.split(' ');
        String cardSet = String.join(lstString, '%2520'); 
        String url = selectedManaCost.equals('') ? HS_BASE_URL + 'cards/sets/' + cardSet : HS_BASE_URL + 'cards/sets/' + cardSet + '?cost=' + selectedManaCost;       
        HttpRequest request = createRequestForHS(url);

        Http http = new Http();
        HttpResponse response = http.send(request);

        System.debug(response.getBody());

        return response.getBody();
    }

    @AuraEnabled
    public static string testingMethod(){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        String caseId = '5002o00002Cc8s2AAB';

        request.setEndpoint('https://resourceful-otter-edxu2a-dev-ed.lightning.force.com/services/apexrest/Cases/' + caseId);
        request.setMethod('GET');
        System.debug('PRE RESPONSE');

        try {
            HttpResponse response = http.send(request);
            if(response.getStatusCode() == 200 ) {
                return response.getBody();
            } else{
                return response.getStatus();
            }
        } catch(CalloutException e) {
            System.debug('catch');
            System.debug('exception: ' + e.getMessage());
            return e.getMessage();
        }
    }
}