sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/matchers/PropertyStrictEquals",
	"sap/ui/test/matchers/AggregationFilled",
	"sap/ui/test/matchers/AggregationLengthEquals",
	"sap/ui/test/matchers/BindingPath",
	"sap/ui/test/matchers/Properties",
	"sap/ui/test/matchers/I18NText",
	"sap/ui/test/actions/Press",
	"sap/base/util/includes"
], function (
	Opa5,
	PropertyStrictEquals,
	AggregationFilled,
	AggregationLengthEquals,
	BindingPath,
	Properties,
	I18NText,
	Press,
	includes
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

				iPressTheBackButton: function () {
					return this.waitFor({
						controlType: "sap.m.Button",
						matchers: new PropertyStrictEquals({name: "type", value: "Back"}),
						actions: new Press(),
						success: function () {
							Opa5.assert.ok(true, "The back button was pressed");
						},
						errorMessage: "The back button could not be pressed"
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
						matchers: new PropertyStrictEquals({ name: "title", value: sCategoryTitle }),
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

				iShouldseeTheProductList: function (aProductIds) {
					this.waitFor({
						id: "productList",
						matchers: new AggregationLengthEquals({ name: "items", length: aProductIds.length }),
						check: function (oProductList) {
							// Check that product ids are unique and matching the list (whatever the order)
							var aUniqueProductIds = [];
							return oProductList.getItems().every(function (oItem) {
								var oProduct = oItem.getBindingContext().getObject();
								var sProductId = oProduct.ProductId;
								if (!includes(aUniqueProductIds, sProductId)) {
									aUniqueProductIds.push(sProductId);
								}
								return includes(aProductIds, sProductId);
							}) && aUniqueProductIds.length === aProductIds.lenght;
						},
						success: function () {
							Opa5.assert.ok(true, "The displayed products correspond to: " + aProductIds.join(","));
						},
						errorMessage: "The displayed products does not correspond to: " + aProductIds.join(",")
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

				iShouldSeeAnAvailabilityAndPriceInfoToolbar: function (iFrom, iTo) {
					this.waitFor({
						id: "categoryInfoToolbarTitle",
						matchers: new PropertyStrictEquals({name: "text", value: "Filtered by Availability, Price (" + iFrom + " - " + iTo + " EUR)"}),
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

				iShouldSeeCompareLinks: function () {
					this.waitFor({
						controlType: "sap.m.ObjectAttribute",
						matchers: new I18NText({ propertyName: "text", key: "CompareWith" }),
						check: function (aObjectAttributes) {
							return aObjectAttributes.length > 1;
						},
						success: function () {
							Opa5.assert.ok(true, "List entry has compare links");
						},
						errorMessage: "List entry has no compare link"
					});
				}
			}
		}
	});
});
