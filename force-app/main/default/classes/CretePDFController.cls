public inherited sharing class CretePDFController {
    Account acc;

    public CretePDFController(ApexPages.StandardController stdController) {
        this.acc = (Account)stdController.getRecord();
    }

    public PageReference createPDF() {

        PageReference pdf = Page.TestVFPage;

        pdf.getParameters().put('id', acc.Id);
        String dt = System.Today().format();

        Blob body = pdf.getContent();
        Attachment att = new Attachment(
            Name = 'Account PDF ' + dt,
            ParentId = acc.Id,
            contentType = 'application/pdf',
            Body = body
        );

        try {
            insert att;
        } catch (Exception e) {
            System.debug('ERROR WHILE CREATING ATTACHMENT. Apex Class: CreatePDFController. Message: ' + e.getMessage());
        }

        return new PageReference('/' + acc.Id);
    }
}