sap.ui.define([
	"sap/ui/test/opaQunit"
], function (opaTest) {
	"use strict";

	QUnit.module("Welcome Journey");

	opaTest("Should start the app and see the right number of featured products and an avatar button", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();
		// Assertions
		Then.onTheWelcomePage.iShouldSeeTheRightAmountOfProducts()
			.and.iShouldSeeAnAvatarButton();
	});

	opaTest("Should press the product link and navigate to product view", function (Given, When, Then) {
		// Actions
		When.onTheWelcomePage.iPressTheFirstPromotedProduct();
		// Assertions
		Then.onTheProduct.iShouldSeeTheProductPage();
		Then.onTheCategoryProductList.iShouldSeeSomeEntriesInTheProductList();
	});

	opaTest("Should press the image and see the LightBox item", function (Given, When, Then) {
		//Actions
		When.onTheProduct.iPressOnTheProductPicture();
		//Assertions
		Then.onTheProduct.iShouldSeeALightBox();
	});

	opaTest("Should press the close button and see the product view", function (Given, When, Then) {
		//Actions
		When.onTheProduct.iPressTheCloseButtonOfTheLightBox();
		//Assertions
		Then.onTheProduct.iShouldSeeTheProductPage();
	});

	opaTest("Should press back button and navigate to welcome view", function (Given, When, Then) {
		// Actions
		When.onTheCategoryProductList.iPressTheBackButton();
		// Assertions
		Then.onTheWelcomePage.iShouldSeeTheWelcomePage();
	});

	opaTest("Should press cart button and see the product in the cart", function (Given, When, Then) {
		// Actions
		When.onTheCategoryList.iPressOnTheFlatScreensCategory();
		When.onTheWelcomePage.iPressOnTheFirstRecentlyViewedItemCartButton();
		When.onTheWelcomePage.iToggleTheCart();
		// Assertions
		Then.onTheCart.iShouldSeeSomeProductsInMyCart();
		// Cleanup
		Then.iTeardownMyApp();
	});
});
