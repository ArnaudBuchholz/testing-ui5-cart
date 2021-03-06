sap.ui.define([
	"sap/ui/test/opaQunit"
], function (opaTest) {
	"use strict";

	QUnit.module("Buy Product Journey");

	opaTest("Should see the category list", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();
		// Assertions
		Then.onTheCategoryList.iShouldSeeTheCategoryList()
			.and.iShouldSeeSomeEntriesInTheCategoryList();
	});

	opaTest("Should see the product list", function (Given, When, Then) {
		// Actions
		When.onTheCategoryList.iPressOnTheFlatScreensCategory();
		// Assertions
		Then.onTheCategoryProductList.iShouldBeTakenToTheCategory("Flat Screens")
			.and.iShouldSeeTheProductList()
			.and.iShouldSeeSomeEntriesInTheProductList();
	});

	opaTest("Should see an avatar button on the product page", function (Given, When, Then) {
		// Actions
		When.onTheCategoryProductList.iPressOnTheFirstProduct();
		// Assertions
		Then.onTheProduct.iShouldSeeAnAvatarButton();
	});

	opaTest("Should add a product to the cart", function (Given, When, Then) {
		// Actions
		When.onTheProduct.iAddTheDisplayedProductToTheCart();
		When.onTheProduct.iToggleTheCart();
		// Assertions
		Then.onTheCart.iShouldSeeSomeProductsInMyCart()
			.and.iShouldSeeTheTotalPriceUpdated();
		// Cleanup
		Then.iTeardownMyApp();
	});

	opaTest("Should keep the cart when reloading", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp({
			keepStorage: true
		});
		// Actions
		When.onTheCategoryList.iPressOnTheFlatScreensCategory();
		When.onTheWelcomePage.iToggleTheCart();
		// Assertions
		Then.onTheCart.iShouldSeeSomeProductsInMyCart();
		// Cleanup
		Then.iTeardownMyApp();
	});

	opaTest("Should start the app with a bookmarkable cart product", function (Given, When, Then) {
		//Arrangement
		Given.iStartMyApp({
			keepStorage: true,
			hash: "category/FS/product/HT-1254/cart"
		});
		//Assertions
		Then.onTheProduct.iShouldSeeTheProductDetailPage("HT-1254");
	});

	opaTest("Should navigate to checkout", function (Given, When, Then) {
		// Actions
		When.onTheCart.iPressOnTheProceedButton();
		// Assertions
		Then.onCheckout.iShouldSeeTheWizardStepContentsStep();
	});

	opaTest("Should return to the home", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnTheReturnToShopButton();
		// Assertions
		Then.onTheCategoryList.iShouldSeeTheCategoryList()
			.and.iShouldSeeSomeEntriesInTheCategoryList();
	});

	// Checkout with Credit Card
	opaTest("Should return to checkout", function (Given, When, Then) {
		// Actions
		When.onTheWelcomePage.iToggleTheCart();
		When.onTheCart.iPressOnTheProceedButton();
		// Assertions
		Then.onCheckout.iShouldSeeTheWizardStepContentsStep();
	});

	opaTest("Should navigate to Payment Step", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnTheNextStepButton();
		// Assertions
		Then.onCheckout.iShouldSeeTheWizardStepPaymentTypeStep();
	});

	opaTest("Should navigate to Credit Card Step", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnTheNextStepButton();
		// Assertions
		Then.onCheckout.iShouldNotSeeTheStep4Button();
	});

	opaTest("Should see Step 4 Button", function (Given, When, Then) {
		// Actions
		When.onCheckout.iEnterCreditCardInformation("My name", "1234567891234567", "123", "01/2020");
		// Assertions
		Then.onCheckout.iShouldSeeTheStep4Button();
	});

	opaTest("Should not see Step 4 Button when an information is missing", function (Given, When, Then) {
		// Actions
		When.onCheckout.iEnterCreditCardInformation("My name", "1234567891234567", "13", "01/2020");
		// Assertions
		Then.onCheckout.iShouldNotSeeTheStep4Button().
			and.iShouldSeeTheFooterWithTheErrorButton();
	});

	opaTest("Should see a message popover window", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnTheButtonInTheFooter();
		// Assertions
		Then.onCheckout.iShouldSeeTheMessagePopover();
	});

	opaTest("Should see Step 4 Button", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressTheCloseButton().
			and.iEnterCreditCardInformation("My name", "1234567891234567", "123", "01/2020");
		// Assertions
		Then.onCheckout.iShouldSeeTheStep4Button();
	});

	opaTest("Should navigate to invoice Step", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnTheNextStepButton();
		// Assertions
		Then.onCheckout.iShouldNotSeeTheStep5Button();
	});

	opaTest("Should invalidate Step 5", function (Given, When, Then) {
		// Actions
		When.onCheckout.iEnterInvoiceAddressInformation("MyStr. 2", "1m", "someLetters", "1234");
		// Assertions
		Then.onCheckout.iShouldNotSeeTheStep5Button();
	});

	opaTest("Should activate Step 5 Button", function (Given, When, Then) {
		// Actions
		When.onCheckout.iEnterInvoiceAddressInformation("MyStreet.2", "MyCity", "1234", "DE");
		// Assertions
		Then.onCheckout.iShouldSeeTheStep5Button();
	});

	opaTest("Should navigate to Delivery Type Step", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnTheNextStepButton();
		// Assertions
		Then.onCheckout.iShouldSeeTheDeliveryTypeStep();
	});

	opaTest("Should navigate to order summary", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnTheNextStepButton();
		// Assertions
		Then.onCheckout.iShouldSeeTheOrderSummary();
	});

	// Checkout with Bank Transfer
	opaTest("Should return to checkout", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnTheBackToListButton();
		// Assertions
		Then.onCheckout.iShouldSeeTheWizardStepContentsStep();
	});

	opaTest("Should select Bank Transfer", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnTheBankTransferButton()
			.and.iPressOnTheYesButton();
		// Assertions
		Then.onCheckout.iShouldSeeTheStep3Button();
	});

	opaTest("Should navigate to Bank Transfer", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnTheNextStepButton();
		// Assertions
		Then.onCheckout.iShouldSeeTheStep4Button();
	});

	opaTest("Should navigate to invoice step", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnTheNextStepButton();
		// Assertions
		Then.onCheckout.iShouldSeeTheStep5Button();
	});


	opaTest("Should navigate to Delivery Type Step", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnTheNextStepButton();
		// Assertions
		Then.onCheckout.iShouldSeeTheDeliveryTypeStep();
	});

	opaTest("Should navigate to order summary", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnTheNextStepButton();
		// Assertions
		Then.onCheckout.iShouldSeeTheOrderSummary();
	});

	// Checkout with Cash on Delivery
	opaTest("Should return to checkout", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnTheBackToPaymentTypeButton();
		// Assertions
		Then.onCheckout.iShouldSeeTheWizardStepContentsStep();
	});

	opaTest("Should select Cash On Delivery", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnTheCashOnDeliveryButton()
			.and.iPressOnTheYesButton();
		// Assertions
		Then.onCheckout.iShouldSeeTheStep3Button();
	});

	opaTest("Should navigate to Cash On Delivery", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnTheNextStepButton();
		// Assertions
		Then.onCheckout.iShouldNotSeeTheStep4Button();
	});

	opaTest("Should invalidate Step 4 Button", function (Given, When, Then) {
		// Actions
		When.onCheckout.iEnterCashOnDeliveryInformation("FirstName", "LastName", "+4911111111", "inf");
		// Assertions
		Then.onCheckout.iShouldNotSeeTheStep4Button().
			and.iShouldGetErrorMessageTextDoesNotMatchTypeForEmailField("inf");
	});

	opaTest("Should invalidate Step 4 Button", function (Given, When, Then) {
		// Actions
		When.onCheckout.iEnterCashOnDeliveryInformation("FirstName", "LastName", "+4911111111", "inf.shop.com");
		// Assertions
		Then.onCheckout.iShouldNotSeeTheStep4Button().
			and.iShouldGetErrorMessageTextDoesNotMatchTypeForEmailField("inf.shop.com");
	});

	opaTest("Should activate Step 4 Button", function (Given, When, Then) {
		// Actions
		When.onCheckout.iEnterCashOnDeliveryInformation("FirstName", "LastName", "+4911111111", "inf@shop.com");
		// Assertions
		Then.onCheckout.iShouldSeeTheStep4Button();
	});

	opaTest("Should navigate to invoice Step", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnTheNextStepButton();
		// Assertions
		Then.onCheckout.iShouldSeeTheStep5Button();
	});

	opaTest("Should navigate to Delivery Type Step", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnTheNextStepButton();
		// Assertions
		Then.onCheckout.iShouldSeeTheDeliveryTypeStep();
	});

	opaTest("Should navigate to order summary", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnTheNextStepButton();
		// Assertions
		Then.onCheckout.iShouldSeeTheOrderSummary();
	});

	opaTest("Should return to checkout", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnTheBackToInvoiceAddressButton();
		// Assertions
		Then.onCheckout.iShouldSeeTheWizardStepContentsStep();
	});

	// Checkout with Different Delivery Address
	opaTest("Should navigate to Delivery Address Step", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnDifferentAddressCheckbox()
			.and.iPressOnTheYesButton()
			.and.iPressOnTheNextStepButton();
		// Assertions
		Then.onCheckout.iShouldSeeTheDeliveryAddressStep();
	});

	opaTest("Should activate Step 6 Button", function (Given, When, Then) {
		// Actions
		When.onCheckout.iEnterDeliveryAddressInformation("MyStreet.2", "MyCity", "1234", "MyCountry");
		// Assertions
		Then.onCheckout.iShouldSeeTheDeliveryStepButton();
	});

	opaTest("Should navigate to Delivery Type Step", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnTheNextStepButton();
		// Assertions
		Then.onCheckout.iShouldSeeTheDeliveryTypeStep();
	});

	opaTest("Should navigate to order summary", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnTheNextStepButton();
		// Assertions
		Then.onCheckout.iShouldSeeTheOrderSummary();
	});


	//Checkout with different Delivery Type
	opaTest("Should return to checkout", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnTheBackToDeliveryTypeButton();
		// Assertions
		Then.onCheckout.iShouldSeeTheWizardStepContentsStep();
	});


	opaTest("Should select Express Delivery and navigate to order summary", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnTheExpressDeliveryButton()
			.and.iPressOnTheNextStepButton();
		// Assertions
		Then.onCheckout.iShouldSeeTheOrderSummary()
			.and.iShouldSeeExpressDelivery();
	});


	// submit order
	opaTest("Should submit order and navigate to order completed", function (Given, When, Then) {
		// Actions
		When.onCheckout.iPressOnTheSubmitButton()
			.and.iPressOnTheYesButton();
		// Assertions
		Then.onOrderCompleted.iShouldSeeTheOrderCompletedPage();
	});

	opaTest("Should return to the shop welcome screen", function (Given, When, Then) {
		// Actions
		When.onOrderCompleted.iPressOnTheReturnToShopButton();
		// Assertions
		Then.onTheWelcomePage.iShouldSeeTheWelcomePage();
		// Cleanup
		Then.iTeardownMyApp();
	});
});
