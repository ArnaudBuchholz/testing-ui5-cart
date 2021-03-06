sap.ui.define([
	"sap/ui/test/opaQunit"
], function (opaTest) {
	"use strict";

	QUnit.module("Delete Product Journey");

	opaTest("Should see the product list", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();
		// Actions
		When.onTheCategoryList.iPressOnTheFlatScreensCategory();
		// Assertions
		Then.onTheCategoryProductList.iShouldBeTakenToTheCategory("Flat Screens")
			.and.iShouldSeeTheProductList()
			.and.iShouldSeeSomeEntriesInTheProductList();
	});

	opaTest("Should add a product to the cart and enable the edit button", function (Given, When, Then) {
		// Actions
		When.onTheCategoryProductList.iPressOnTheFirstProduct();
		When.onTheProduct.iAddTheDisplayedProductToTheCart();
		When.onTheProduct.iToggleTheCart();
		// Assertions
		Then.onTheCart.iShouldSeeSomeProductsInMyCart()
			.and.iShouldSeeTheEditButtonEnabled()
			.and.iShouldSeeTheProceedButtonEnabled();
	});

	opaTest("Should see the delete button after pressing the edit button", function (Given, When, Then) {
		// Actions
		When.onTheCart.iPressOnTheEditButton();
		// Assertions
		Then.onTheCart.iShouldSeeTheDeleteButton(0);
	});

	opaTest("Should see the confirmation dialog", function (Given, When, Then) {
		// Actions
		When.onTheCart.iPressOnTheDeleteButtonOfItem(0);
		// Assertions
		Then.onTheDialog.iShouldBeTakenToTheConfirmationDialog();
	});

	opaTest("Should cancel the delete process", function (Given, When, Then) {
		// Actions
		When.onTheDialog.iPressCancelOnTheConfirmationDialog();
		// Assertions
		Then.onTheCart.iShouldBeTakenToTheCart();
	});

	opaTest("Should see the edit button", function (Given, When, Then) {
		// Actions
		When.onTheCart.iPressOnTheSaveChangesButton();
		// Assertions
		Then.onTheCart.iShouldSeeTheEditButtonEnabled();
	});

	opaTest("Should delete the product from the cart", function (Given, When, Then) {
		// Actions
		When.onTheCart.iPressOnTheEditButton()
			.and.iPressOnTheDeleteButtonOfItem(0);
		When.onTheDialog.iPressDeleteButtonOnTheConfirmationDialog();
		// Assertions
		Then.onTheCart.iShouldNotSeeTheDeletedProductInTheCart("HT-1254" /* Bending Screen 21HD */)
			.and.iShouldSeeTheTotalPriceEqualToZero();
	});

	opaTest("Edit button should be disabled", function (Given, When, Then) {
		// Actions
		When.onTheCart.iPressOnTheSaveChangesButton();
		// Assertions
		Then.onTheCart.iShouldSeeTheEditButtonDisabled()
			.and.iShouldSeeTheProceedButtonDisabled();
		// Cleanup
		Then.iTeardownMyApp();
	});

});
