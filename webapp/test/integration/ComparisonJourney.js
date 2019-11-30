sap.ui.define([
	"sap/ui/test/opaQunit"
], function (opaTest) {
	"use strict";

	//List of product ids used
	var HT_1254 = "HT-1254", // Bending Screen 21HD
		HT_1255 = "HT-1255", // Broad Screen 22HD
		HT_1137 = "HT-1137"; // Flat XXL

	QUnit.module("Comparison Journey");

	//We are still on the second category
	opaTest("Should see the product list with Compare link", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();

		// Actions
		When.onHome.iPressOnTheFlatScreensCategory();

		// Assertions
		Then.onTheCategoryProductList.iShouldSeeCompareLinks();
	});

	opaTest("Should see comparison view with one product", function (Given, When, Then) {
		// Actions
		When.onTheCategoryProductList.iPressOnCompareLinkOfProduct(HT_1254);

		// Assertions
		Then.onTheComparison.iShouldSeeAProductAndAPlaceholder(HT_1254);
	});

	opaTest("Should add a product to the cart", function (Given, When, Then) {
		// Actions

		When.onTheComparison.iAddTheDisplayedProductsToTheCart();

		When.onTheComparison.iToggleTheCart();

		// Assertions
		Then.onTheCart.iShouldSeeSomeProductsInMyCart()
			.and.iShouldSeeTheTotalPriceUpdated();
	});

		opaTest("Should see comparison view with two products", function (Given, When, Then) {
		// Actions
		When.onTheComparison.iToggleTheCart();
		When.onTheCategoryProductList.iPressOnCompareLinkOfProduct(HT_1255);

		// Assertions
		Then.onTheComparison.iShouldSeeTwoProducts(HT_1254, HT_1255);
	});

	opaTest("Should see comparison view with a different second product", function (Given, When, Then) {
		// Actions
		When.onTheCategoryProductList.iPressOnCompareLinkOfProduct(HT_1137);

		// Assertions
		Then.onTheComparison.iShouldSeeTwoProducts(HT_1254, HT_1137);
	});

	opaTest("Should see comparison view with one product", function (Given, When, Then) {
		// Actions
		When.onTheComparison.iPressProductRemove(HT_1254);

		// Assertions
		Then.onTheComparison.iShouldSeeAProductAndAPlaceholder(HT_1137);

		// Cleanup
		Then.iTeardownMyApp();
	});
});
