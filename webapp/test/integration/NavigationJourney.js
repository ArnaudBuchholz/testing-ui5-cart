sap.ui.define([
	"sap/ui/test/opaQunit"
], function (opaTest) {
	"use strict";

	QUnit.module("Navigation Journey");

	opaTest("Should start the app and go to the speaker category view", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();
		// Actions
		When.onHome.iPressOnTheSpeakerCategory();
		// Assertions
		Then.onTheCategoryProductList.iShouldBeTakenToTheCategory("Speakers");
	});

	opaTest("Should see the product Blaster Extreme", function (Given, When, Then) {
		// Actions
		When.onTheCategoryProductList.iPressOnTheProduct("HT-1091" /* Blaster Extreme */);
		// Assertions
		Then.onTheProduct.iShouldSeeTheBlasterExtremeDetailPage();
	});

	opaTest("Should navigate back to home", function (Given, When, Then) {
		// Actions
		When.onTheCategoryProductList.iPressTheBackButton();
		// Assertions
		Then.onHome.iShouldSeeTheCategoryList();
		Then.onTheWelcomePage.iShouldSeeTheWelcomePage();
	});

	opaTest("Should navigate to cart", function (Given, When, Then) {
		// Actions
		When.onTheWelcomePage.iToggleTheCart();
		// Assertions
		Then.onTheCart.iShouldSeeTheCart();
		Then.onTheWelcomePage.iShouldSeeTheWelcomePage();
	});

	opaTest("Should navigate from welcome to product view", function (Given, When, Then) {
		// Actions
		When.onTheWelcomePage.iToggleTheCart();
		When.onTheWelcomePage.iPressOnTheProductSmartphoneAlphaTitle();
		// Assertions
		Then.onTheProduct.iShouldSeeTheSmartphoneAlphaDetailPage();
	});

	opaTest("Should navigate back to home", function (Given, When, Then) {
		// Actions
		When.onTheCategoryProductList.iPressTheBackButton();
		// Assertions
		Then.onHome.iShouldSeeTheCategoryList();
		Then.onTheWelcomePage.iShouldSeeTheWelcomePage();
	});

	opaTest("Should navigate to product view via pressing product image", function (Given, When, Then) {
		// Actions
		When.onTheWelcomePage.iPressTheProductImage();
		// Assertions
		Then.onTheProduct.iShouldSeeTheProductPage();
		Then.onTheCategoryProductList.iShouldSeeSomeEntriesInTheProductList();
		// Cleanup
		Then.iTeardownMyApp();
	});
});
