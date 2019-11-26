sap.ui.define([
	"sap/ui/test/opaQunit"
], function (opaTest) {
	"use strict";

	QUnit.module("Filter Journey");

	opaTest("Should start the app and go to the category view I should see a filter button", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();
		// Actions
		When.onHome.iPressOnTheFlatScreensCategory();
		// Assertions
		Then.onTheCategoryProductList.iShouldSeeAFilterButton();
	});

	opaTest("Should filter the products on availability", function (Given, When, Then) {
		// Actions
		When.onTheCategoryProductList.iFilterOnAvailability();
		//Assertions
		Then.onTheCategoryProductList.iShouldOnlySeeAvailableAndDiscontinuedProductsWithInfoToolbar();
	});

	opaTest("Should remove the availability filters", function (Given, When, Then) {
		// Actions
		When.onTheCategoryProductList.iRemoveTheAvailabilityFilters();
		//Assertions
		Then.onTheCategoryProductList.iShouldSeeAllProductsAndNoInfoToolbar();
	});

	opaTest("Should filter on both availability and price", function (Given, When, Then) {
		// Actions
		When.onTheCategoryProductList.iFilterOnAvailabilityAndPrice();
		//Assertions
		Then.onTheCategoryProductList.iShouldOnlySeeOutOfStockAndCheapProductsWithInfoToolbar();
	});

	opaTest("Should change the price filter and then cancel the change", function (Given, When, Then) {
		// Actions
		When.onTheCategoryProductList.iCancelAPriceFilterChange();
		//Assertions
		Then.onTheCategoryProductList.iShouldOnlySeeOutOfStockAndCheapProductsWithInfoToolbar();
		// Actions
		When.onTheCategoryProductList.iPressTheFilterButton();
		When.onTheCategoryProductList.iPressTheBackButtonInDialog();
		//Assertions
		Then.onTheCategoryProductList.iShouldTestTheFilterCount(1);
	});

	opaTest("Should change the price filter values to the default ones", function (Given, When, Then) {
		// Actions
		When.onTheCategoryProductList.iChangeToTheDefaultFilterPriceValues();
		//Assertions
		Then.onTheCategoryProductList.iShouldOnlySeeOutOfStockProductsAndAnInfoToolbar();
		//Actions
		When.onTheCategoryProductList.iPressTheFilterButton();
		When.onTheCategoryProductList.iPressTheBackButtonInDialog();
		Then.onTheCategoryProductList.iShouldTestTheFilterCount(0);
	});

	opaTest("Should reset price custom filter", function (Given, When, Then) {
		// Actions
		When.onTheCategoryProductList.iPressResetButton();
		//Assertions
		Then.onTheCategoryProductList.iShouldTestTheFilterCount(0);
		When.onTheCategoryProductList.iPressOkButton();
		//Assertions
		Then.onTheCategoryProductList.iShouldSeeAllProductsAndNoInfoToolbar();
	});

	opaTest("Should filter the products on supplier", function (Given, When, Then) {
		// Actions
		When.onTheCategoryProductList.iFilterOnSupplier();
		//Assertions
		Then.onTheCategoryProductList.iShouldOnlySeeTechnoComProductsAndAnInfoToolbar();
	});

	opaTest("Should remove the supplier filter", function (Given, When, Then) {
		// Actions
		When.onTheCategoryProductList.iRemoveTheSupplierFilter();
		//Assertions
		Then.onTheCategoryProductList.iShouldSeeAllProductsAndNoInfoToolbar();
		// Cleanup
		Then.onTheCategoryProductList.iTeardownMyApp();
	});
});
