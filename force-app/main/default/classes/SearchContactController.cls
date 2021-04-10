public class SearchContactController {
    @AuraEnabled (cacheable = true)
    public static List<Contact> searchContacts(String searchKey) {
        String key = '%' + searchKey + '%';
        return [
            SELECT Id, FirstName, LastName, Email, Name
            FROM Contact
            WHERE Name LIKE :key
            WITH SECURITY_ENFORCED
            ];
       // throw new AuraHandledException('Forced error');
    }
}