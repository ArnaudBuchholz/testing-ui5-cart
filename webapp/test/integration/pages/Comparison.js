sap.ui.define([
	"sap/ui/test/Opa5",
	"./Common",
	"sap/ui/test/matchers/PropertyStrictEquals",
	"sap/ui/test/actions/Press",
	"sap/ui/test/matchers/Properties",
	"sap/ui/test/matchers/BindingPath",
	"sap/ui/test/matchers/I18NText"
], function (
	Opa5,
	Common,
	PropertyStrictEquals,
	Press,
	Properties,
	BindingPath,
	I18NText
) {
	"use strict";

	Opa5.createPageObjects({
		onTheComparison: {
			baseClass: Common,

			viewName: "Comparison",

			actions: {
				iPressProductRemove: function (sProductId) {
					return this._iPressOnTheButton({
						matchers: [
							new BindingPath({path: "/Products('" + sProductId + "')"}),
							new Properties({icon: "sap-icon://sys-cancel"})
						]
					}, "Product '" + sProductId + "' remove");
				},

				iAddTheDisplayedProductsToTheCart: function () {
					// NOTE if two products are displayed, they will both added to the cart
					return this._iPressOnTheButton({
						matchers: new I18NText({ propertyName: "text", key: "addToCartShort" })
					}, "Add product to the cart");
				},

				iToggleTheCart: function () {
					return this._iPressOnTheButton({
						matchers: new PropertyStrictEquals({ name: "icon", value: "sap-icon://cart" })
					}, "Cart");
				}
			},
			assertions: {
				iShouldSeeAProduct: function (sProductId) {
					return this.waitFor({
						controlType: "sap.m.Panel",
						matchers: new BindingPath({path: "/Products('" + sProductId + "')"}),
						success: function () {
							Opa5.assert.ok(true, "Product is displayed");
						},
						errorMessage: "There is no product displayed"
					});
				},

				_iShouldSeeTheLabel: function (sKey, mState) {
					return this.waitFor({
						controlType: "sap.m.Label",
						matchers: new I18NText({ propertyName: "text", key: sKey }),
						errorMessage: "Placeholder is displayed incorrectly"
					});
				},

				iShouldSeeAPlaceholder: function () {
					this._iShouldSeeTheLabel("HowTo1Label", mState);
					this._iShouldSeeTheLabel("HowTo2Label", mState);
					this._iShouldSeeTheLabel("HowTo3Label", mState);
					return this.waitFor({
						success: function () {
							Opa5.assert.ok(true, "Placeholder is visible");
						}
					});
				},

				iShouldSeeTwoProducts: function (sProductIdA, sProductIdB) {
					this.iShouldSeeAProduct(sProductIdA);
					return this.iShouldSeeAProduct(sProductIdB);
				},

				iShouldSeeAProductAndAPlaceholder: function (sProductId) {
					this.iShouldSeeAProduct(sProductId);
					return this.iShouldSeeAPlaceholder();
				}
			}
		}
	});
});
