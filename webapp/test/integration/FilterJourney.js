sap.ui.define([
	"sap/ui/test/opaQunit"
], function (opaTest) {
	"use strict";

	QUnit.module("Filter Journey");

	var HT_1254 = "HT-1254", // Bending Screen 21HD
		HT_1255 = "HT-1255", // Broad Screen 22HD
		HT_1137 = "HT-1137", // Flat XXL

		aFlatScreenProducts = [HT_1254, HT_1255, HT_1137];

	opaTest("Should start the app and go to the category view I should see a filter button", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();
		// Actions
		When.onHome.iPressOnTheFlatScreensCategory();
		// Assertions
		Then.onTheCategoryProductList.iShouldseeTheProductList(aFlatScreenProducts)
			.and.iShouldSeeAFilterButton();
	});

	opaTest("Should filter the products on availability", function (Given, When, Then) {
		// Actions
		When.onTheCategoryProductList.iPressTheFilterButton();
		When.onTheProductFilterDialog.iSelectTheAvailabilityFilteringOption()
			.and.iSelectTheAvailableFilter()
			.and.iSelectTheDiscontinuedFilter()
			.and.iPressOkButton();
		//Assertions
		Then.onTheCategoryProductList.iShouldseeTheProductList([HT_1254, HT_1137])
			.and.iShouldSeeAnAvailabilityInfoToolbar();
	});

	opaTest("Should remove the availability filters", function (Given, When, Then) {
		// Actions
		When.onTheCategoryProductList.iPressTheFilterButton();
		When.onTheProductFilterDialog..iPressTheAvailableFilter()
			.and.iPressTheDiscontinuedFilter()
			.and.iPressOkButton();
		//Assertions
		Then.onTheCategoryProductList.iShouldseeTheProductList(aFlatScreenProducts)
			.and.iShouldNotSeeAnInfoToolbar();
	});

	opaTest("Should filter on both availability and price", function (Given, When, Then) {
		// Actions
		When.onTheCategoryProductList.iPressTheFilterButton();
		When.onTheProductFilterDialog.iPressTheOutOfStockFilter()
			.and.iPressTheBackButtonInDialog();
			.and.iPressThePriceFilteringOption();
			.and.iSetPriceFilterValues(200, 500);
			.and.iPressOkButton();
		//Assertions
		Then.onTheCategoryProductList.iShouldOnlySeeOutOfStockAndCheapProductsWithInfoToolbar();
	});

	opaTest("Should change the price filter and then cancel the change", function (Given, When, Then) {
		// Actions
		When.onTheCategoryProductList.iPressTheFilterButton();
		When.onTheProductFilterDialog.iSetPriceFilterValues(500, 1000)
			.and.iPressCancelButton();
		//Assertions
		Then.onTheCategoryProductList.iShouldOnlySeeOutOfStockAndCheapProductsWithInfoToolbar();
		// Actions
		When.onTheCategoryProductList.iPressTheFilterButton();
		When.onTheProductFilterDialog.iPressTheBackButtonInDialog();
		//Assertions
		Then.onTheProductFilterDialog.iShouldSeeThePriceFilterCount(1);
	});

	opaTest("Should change the price filter values to the default ones", function (Given, When, Then) {
		// Actions
		When.onTheProductFilterDialog.iPressThePriceFilteringOption()
			.and.iSetPriceFilterValues(0, 5000)
			.and.iPressOkButton();
		//Assertions
		Then.onTheCategoryProductList.iShouldOnlySeeOutOfStockProductsAndAnInfoToolbar();

		//Actions
		When.onTheCategoryProductList.iPressTheFilterButton();
		When.onTheProductFilterDialog.iPressTheBackButtonInDialog();
		//Assertions
		Then.onTheProductFilterDialog.iShouldSeeThePriceFilterCount(0);
	});

	opaTest("Should reset price custom filter", function (Given, When, Then) {
		// Actions
		When.onTheProductFilterDialog.iPressResetButton();
		//Assertions
		Then.onTheProductFilterDialog.iShouldSeeThePriceFilterCount(0);

		// Actions
		When.onTheProductFilterDialog.iPressOkButton();
		//Assertions
		Then.onTheCategoryProductList.iShouldSeeAllProductsAndNoInfoToolbar();
	});

	opaTest("Should filter the products on supplier", function (Given, When, Then) {
		// Actions
		When.onTheCategoryProductList.iPressTheFilterButton();
		When.onTheProductFilterDialog.iPressTheSupplierFilteringOption()
			.and.iPressTheSupplierFilter("Technocom")
			.and.iPressOkButton();

		//Assertions
		Then.onTheCategoryProductList.iShouldOnlySeeTechnoComProductsAndAnInfoToolbar();
	});

	opaTest("Should remove the supplier filter", function (Given, When, Then) {
		// Actions
		When.onTheCategoryProductList.iPressTheFilterButton();
		When.onTheProductFilterDialog.iPressTheSupplierFilter("Technocom")
			.and.iPressOkButton();

		//Assertions
		Then.onTheCategoryProductList.iShouldSeeAllProductsAndNoInfoToolbar();
		// Cleanup
		Then.onTheCategoryProductList.iTeardownMyApp();
	});
});
