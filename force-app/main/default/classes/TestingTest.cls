@isTest
public class TestingTest {

    private HearthstoneController hearthstoneController;

    public TestingTest(HearthstoneController hearthstoneController) {
        this.hearthstoneController = hearthstoneController;
    }

    @isTest
    public static void testingMethodTest() {

        Boolean b = hearthstoneController.testingMethod(1);
        System.Assert(b == true);
    }
}