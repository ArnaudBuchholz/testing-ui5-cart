sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/matchers/PropertyStrictEquals",
	"sap/ui/test/matchers/AggregationFilled",
	"sap/ui/test/matchers/AggregationLengthEquals",
	"sap/ui/test/matchers/BindingPath",
	"sap/ui/test/matchers/Properties",
	"sap/ui/test/matchers/I18NText",
	"sap/ui/test/actions/Press"
], function (
	Opa5,
	PropertyStrictEquals,
	AggregationFilled,
	AggregationLengthEquals,
	BindingPath,
	Properties,
	I18NText,
	Press
) {
	"use strict";

	Opa5.createPageObjects({
		onTheCategoryProductList: {
			viewName: "Category",

			actions: {
				iPressOnTheFirstProduct: function () {
					return this.waitFor({
						id: "productList",
						matchers: function (oList) {
							return oList.getItems()[0];
						},
						actions: new Press(),
						success: function () {
							Opa5.assert.ok(true, "First product of the list was pressed");
						},
						errorMessage: "The product list does not contain required selection"
					});
				},

				iPressTheFilterButton: function () {
					return this.waitFor({
						controlType: "sap.m.Button",
						matchers: new PropertyStrictEquals({name: "icon", value: "sap-icon://filter"}),
						actions: new Press(),
						success: function () {
							Opa5.assert.ok(true, "The filter button was pressed");
						},
						errorMessage: "The filter button could not be pressed"
					});
				},

				iPressOnTheProduct: function (sProductId) {
					return this.waitFor({
						controlType: "sap.m.ObjectListItem",
						matchers: new BindingPath({ path: "/Products('" + ProductId + "')" }),
						actions: new Press(),
						success: function () {
							Opa5.assert.ok(true, "The product '" + sProductId + "' was pressed");
						},
						errorMessage: "The product ''" + sProductId + "' was not found and could not be pressed"
					});
				},

				iPressOnCompareLinkOfProduct: function (sProductId) {
					return this.waitFor({
						controlType: "sap.m.ObjectAttribute",
						matchers: [
							new BindingPath({ path: "/Products('" + ProductId + "')" }),
							new Properties({ text: "Compare" })
						],
						actions: new Press(),
						success: function () {
							Opa5.assert.ok(true, "The compare link of product '" + sProductId + "' was pressed");
						},
						errorMessage: "The compare link of product '" + sProductId + "' was not found and could not be pressed"
					});
				}
			},

			assertions: {
				iShouldSeeTheProductList: function () {
					return this.waitFor({
						id: "productList",
						success: function () {
							Opa5.assert.ok(true, "The product list was found");
						},
						errorMessage: "The product list was not found"
					});
				},

				iShouldBeTakenToTheCategory: function (sCategoryTitle) {
					return this.waitFor({
						controlType: "sap.m.Page",
						matchers: new PropertyStrictEquals({ name: "title", value: sCatergoryTitle }),
						success: function () {
							Opa5.assert.ok(true, "The " + sCategoryTitle + " category product list was found");
						},
						errorMessage: "The " + sCategoryTitle + " category product list was not found"
					});
				},

				iShouldSeeSomeEntriesInTheProductList: function () {
					return this.waitFor({
						id: "productList",
						matchers: new AggregationFilled({ name: "items" }),
						success: function () {
							Opa5.assert.ok(true, "The product list has entries");
						},
						errorMessage: "The product list does not contain any entries"
					});
				},

				iShouldSeeAFilterButton: function () {
					this.waitFor({
						id: "masterListFilterButton",
						success: function () {
							Opa5.assert.ok(true, "The Master list page has a filter button");
						},
						errorMessage: "The Master list page has no filter button"
					});
				},

				iShouldseeTheExactProductcount: function (iCount) {
					this.waitFor({
						id: "productList",
						matchers: new AggregationLengthEquals({ name: "items", length: iCount }),
						success: function () {
							Opa5.assert.ok(true, "The number of displayed products was " + iCount);
						},
						errorMessage: "The number of displayed products was not " + iCount
					});
				},

				iShouldOnlySeeTheAvailableAndDiscontinuedProducts: function () {
					this.waitFor({
						id: "productList",
						matchers: new AggregationLengthEquals({name: "items", length: 2}),
						success: function (oList) {
							Opa5.assert.ok(oList, "The category list shows just the available and discontinued products");
						},
						errorMessage: "The category list shows products other than available or discontinued"
					});
				},

				iShouldOnlySeeTheOutOfStockProducts: function () {
					this.waitFor({
						id: "productList",
						matchers: new AggregationLengthEquals({name: "items", length: 1}),
						success: function (oList) {
							Opa5.assert.ok(oList, "The category list shows just the out of stock products");
						},
						errorMessage: "The category list shows products other than out of stock"
					});
				},

				iShouldOnlySeeTheTechnoComProducts: function () {
					this.waitFor({
						id: "productList",
						matchers: new AggregationLengthEquals({name: "items", length: 1}),
						success: function (oList) {
							Opa5.assert.ok(oList, "The category list shows just the TechnoCom products");
						},
						errorMessage: "The category list shows products from supplier other than TechnoCom "
					});
				},

				iShouldOnlySeeOutOfStockAndCheapProducts: function () {
					this.waitFor({
						id: "productList",
						matchers: new AggregationLengthEquals({name: "items", length: 1}),
						success: function (oList) {
							Opa5.assert.ok(oList, "The category list shows only cheap and out of stock products");
						},
						errorMessage: "The category list did not show cheap and out of stock products"
					});
				},

				iShouldSeeAnAvailabilityInfoToolbar: function () {
					this.waitFor({
						id: "categoryInfoToolbarTitle",
						matchers: new PropertyStrictEquals({name: "text", value: "Filtered by Availability"}),
						success: function () {
							Opa5.assert.ok(true, "The category list has an info toolbar");
						},
						errorMessage: "The info toolbar of the category list was not found"
					});
				},

				iShouldSeeAnAvailabilityAndPriceInfoToolbar: function () {
					this.waitFor({
						id: "categoryInfoToolbarTitle",
						matchers: new PropertyStrictEquals({name: "text", value: "Filtered by Availability, Price (200 - 500 EUR)"}),
						success: function () {
							Opa5.assert.ok(true, "The category list has info toolbar");
						},
						errorMessage: "The info toolbar of the category list was not found"
					});
				},

				iShouldSeeASupplierInfoToolbar: function () {
					this.waitFor({
						id: "categoryInfoToolbarTitle",
						matchers: new PropertyStrictEquals({name: "text", value: "Filtered by Supplier"}),
						success: function () {
							Opa5.assert.ok(true, "The category list has an info toolbar");
						},
						errorMessage: "The info toolbar of the category list was not found"
					});
				},

				iShouldNotSeeAnInfoToolbar: function () {
					this.waitFor({
						id: "productList",
						success: function (oList) {
							var oInfoToolbar = oList.getAggregation("infoToolbar");
							var sTitleText = oInfoToolbar.getAggregation("content")[0].getText();
							Opa5.assert.ok(oInfoToolbar.getVisible() === false &&
								sTitleText === "",
								"The category list has no info toolbar");
						},
						errorMessage: "The category list has an info toolbar"
					});
				},

				iShouldTestTheFilterCount: function (iCountNumber) {
					var sSuccessMessage = "The price filter count is correctly set up";
					var sErrorMessage = "The price filter count doesn't correctly set up";

					this.waitFor({
						controlType: "sap.m.StandardListItem",
						matchers: new PropertyStrictEquals({name: "title", value: "Price"}),
						success: function(oItem) {
							Opa5.assert.ok(oItem[0].getCounter() === iCountNumber, sSuccessMessage);
						},
						errorMessage: sErrorMessage
					});
				},

				iShouldOnlySeeAvailableAndDiscontinuedProductsWithInfoToolbar: function () {
					this.iShouldseeTheExactProductcount(2);
					// this.iShouldOnlySeeTheAvailableAndDiscontinuedProducts();
					this.iShouldSeeAnAvailabilityInfoToolbar();
				},

				iShouldOnlySeeTechnoComProductsAndAnInfoToolbar: function () {
					this.iShouldOnlySeeTheTechnoComProducts();
					this.iShouldSeeASupplierInfoToolbar();
				},

				iShouldOnlySeeOutOfStockProductsAndAnInfoToolbar: function () {
					this.iShouldOnlySeeTheOutOfStockProducts();
					this.iShouldSeeAnAvailabilityInfoToolbar();
				},

				iShouldOnlySeeOutOfStockAndCheapProductsWithInfoToolbar: function () {
					this.iShouldOnlySeeOutOfStockAndCheapProducts();
					this.iShouldSeeAnAvailabilityAndPriceInfoToolbar();
				},

				iShouldSeeAllProductsAndNoInfoToolbar: function () {
					this.iShouldseeTheExactProductcount(3);
					this.iShouldNotSeeAnInfoToolbar();
				},

				// TODO name
				iShouldSeeCompareLinkOnListEntry: function () {
					this.waitFor({
						controlType: "sap.m.ObjectAttribute",
						matchers: new Properties({text : "Compare"}),
						success: function () {
							Opa5.assert.ok(true, "List entry has an compare link");
						},
						errorMessage: "List entry has no compare link"
					});
				}
			}
		}
	});
});
