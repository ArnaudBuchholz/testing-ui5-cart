sap.ui.define([
	"sap/ui/test/Opa5",
	"./Common",
	"sap/ui/test/matchers/PropertyStrictEquals",
	"sap/ui/test/actions/Press",
	"sap/ui/test/matchers/Properties",
	"sap/ui/test/matchers/I18NText",
	"sap/ui/test/matchers/BindingPath"
], function (
	Opa5,
	Common,
	PropertyStrictEquals,
	Press,
	Properties,
	I18NText,
	BindingPath
) {
	"use strict";

	Opa5.createPageObjects({
		onTheProduct: {
			baseClass: Common,

			viewName: "Product",

			actions: {
				iPressTheBackButton: function () {
					return this._iPressOnTheButton({
						matchers: new PropertyStrictEquals({name: "type", value: "Back"})
					}, "Back");
				},

				iAddTheDisplayedProductToTheCart: function () {
					return this._iPressOnTheButton({
						matchers: new I18NText({ propertyName: "text", key: "addToCartShort" })
					}, "Add to cart");
				},

				iPressOnTheProductPicture: function () {
					return this._iPressOnTheButton({
						id: "productImage"
					}, "Product picture");
				},

				iPressTheCloseButtonOfTheLightBox: function () {
					return this._iPressOnTheButton({
						matchers: new PropertyStrictEquals({ name: "text", value: "Close" })
					}, "Close picture");
				},

				iToggleTheCart: function () {
					return this._iPressOnTheButton({
						matchers: new PropertyStrictEquals({ name: "icon", value: "sap-icon://cart" })
					}, "Cart");
				}
			},

			assertions: {
				iShouldSeeALightBox: function () {
					return this.waitFor({
						id: "lightBox",
						success: function () {
							Opa5.assert.ok(true, "Light Box is visible");
						}
					});
				},

				iShouldSeeAnAvatarButton: function () {
					return this.waitFor({
						controlType: "sap.m.Button",
						matchers: new Properties({ icon: "sap-icon://customer" }),
						success: function () {
							Opa5.assert.ok(true, "Avatar button is visible");
						},
						errorMessage: "There is no avatar button"
					});
				},

				iShouldSeeTheProductPage: function () {
					return this.waitFor({
						id: "productImage",
						success: function () {
							Opa5.assert.ok(true, "The product page was successfully displayed");
						},
						errorMessage: "The product page was not displayed"
					});
				},

				iShouldSeeTheProductDetailPage: function (sProductId) {
					return this.waitFor({
						controlType: "sap.m.ObjectHeader",
						matchers: new BindingPath({ path: "/Products('" + sProductId + "')" }),
						success: function () {
							Opa5.assert.ok(true, "The product '" + sProductId + "' is displayed");
						},
						errorMessage: "The product '" + sProductId + "' was not found"
					});
				}
			}
		}
	});
});
