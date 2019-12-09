sap.ui.define([
	"sap/ui/test/Opa5",
	"./Common",
	"sap/ui/test/actions/Press",
	"sap/ui/test/matchers/BindingPath",
	"sap/ui/test/matchers/AggregationLengthEquals",
	"sap/ui/test/matchers/Properties"
], function (
	Opa5,
	Common,
	Press,
	BindingPath,
	AggregationLengthEquals,
	Properties
) {
	"use strict";

	Opa5.createPageObjects({
		onTheWelcomePage: {
			baseClass: Common,

			viewName: "Welcome",

			actions: {
				iPressTheShowCategoriesButton : function () {
					return this._iPressOnTheButton({
						matchers: new Properties({ icon : "sap-icon://menu2" })
					}, "Show categories");
				},

				iPressTheFirstPromotedProduct: function () {
					return this.waitFor({
						controlType: "sap.m.ObjectIdentifier",
						matchers: new BindingPath({
							modelName: "view",
							path: "/Promoted/0"
						}),
						actions: new Press(),
						success: function () {
							Opa5.assert.ok(true, "The first promoted product was pressed");
						},
						errorMessage: "No promoted product was displayed"
					});
				},

				iPressOnTheFirstRecentlyViewedItemCartButton: function () {
					return this._iPressOnTheButton({
						matchers: new BindingPath({ modelName: "view", path: "/Viewed/0" })
					}, "First viewed item cart");
				},

				iPressOnTheFirstRecentlyViewedProductTitle: function () {
					return this.waitFor({
						controlType: "sap.m.ObjectIdentifier",
						matchers: new BindingPath({ modelName: "view", path: "/Viewed/0" }),
						actions: new Press(),
						success: function () {
							Opa5.assert.ok(true, "The First viewed item title was pressed");
						},
						errorMessage: "The First viewed item title was not found and could not be pressed"
					});
				},

				iPressOnTheFirstRecentlyViewedItemImage: function () {
					return this.waitFor({
						controlType: "sap.m.Image",
						matchers: new BindingPath({ modelName: "view", path: "/Viewed/0" }),
						actions: new Press(),
						success: function () {
							Opa5.assert.ok(true, "First viewed item image was pressed");
						},
						errorMessage: "First viewed item image was not found and could not be pressed"
					});
				},

				iToggleTheCart: function () {
					return this._iPressOnTheButton({
						matchers : new Properties({ icon : "sap-icon://cart" })
					}, "Cart");
				}
			},

			assertions: {
				iShouldSeeTheWelcomePage: function () {
					return this.waitFor({
						id: "panelPromoted",
						success: function () {
							Opa5.assert.ok(true, "The welcome page was successfully displayed");
						},
						errorMessage: "The welcome page was not displayed"
					});
				},

				iShouldSeeAnAvatarButton: function () {
					return this.waitFor({
						controlType: "sap.m.Button",
						matchers: new Properties({icon: "sap-icon://customer"}),
						success: function () {
							Opa5.assert.ok(true, "Avatar button is visible");
						},
						errorMessage: "There is no avatar button"
					});
				},

				iShouldSeeTheRightAmountOfProducts: function() {
					this.waitFor({
						id: "promotedRow",
						matchers: new AggregationLengthEquals({ name: "content", length: 2 }),
						success: function () {
							Opa5.assert.ok(true, "The welcome page has two promoted items");
						},
						errorMessage: "The welcome page did not show two promoted items"
					});
					this.waitFor({
						id: "viewedRow",
						matchers: new AggregationLengthEquals({ name: "content", length: 4 }),
						success: function () {
							Opa5.assert.ok(true, "The welcome page has four viewed items");
						},
						errorMessage: "The welcome page did not show four viewed items"
					});
					return this.waitFor({
						id: "favoriteRow",
						matchers: new AggregationLengthEquals({ name: "content", length: 4 }),
						success: function () {
							Opa5.assert.ok(true, "The welcome page has four favorite items");
						},
						errorMessage: "The welcome page did not show four favorite items"
					});
				}
			}
		}
	});

});
