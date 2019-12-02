sap.ui.define([
	"sap/ui/test/Opa5",
	"./Common",
	"sap/ui/test/matchers/AggregationFilled",
	"sap/ui/test/matchers/AggregationEmpty",
	"sap/ui/test/matchers/Properties",
	"sap/ui/test/matchers/PropertyStrictEquals",
	"sap/ui/test/matchers/AggregationLengthEquals",
	"sap/ui/test/matchers/BindingPath",
	"sap/ui/test/matchers/Ancestor",
	"sap/ui/test/matchers/I18NText",
	"sap/ui/test/actions/Press"
], function (
	Opa5,
	Common,
	AggregationFilled,
	AggregationEmpty,
	Properties,
	PropertyStrictEquals,
	AggregationLengthEquals,
	BindingPath,
	Ancestor,
	I18NText,
	Press
) {
	"use strict";

	Opa5.createPageObjects({
		onTheCart: {
			baseClass: Common,

			viewName: "Cart",

			actions: {
				iPressOnTheEditButton: function () {
					return this._iPressOnTheButton({
						matchers: new Properties({ icon: "sap-icon://edit" })
					}, "Edit");
				},

				iPressOnTheDeleteButtonOfItem: function (iIndex) {
					return this.waitFor({
						id: "entryList",
						matchers: [
							new Properties({ mode: "Delete" }),
							function (oList) {
								return oList.getItems()[iIndex];
							}
						],
						actions: new Press({ idSuffix: "imgDel" }),
						success: function () {
							Opa5.assert.ok(true, "The delete button was pressed on cart item #" + iIndex);
						},
						errorMessage: "The delete button could not be pressed"
					});
				},

				iPressOnTheSaveChangesButton: function () {
					return this._iPressOnTheButton({
						matchers: new I18NText({ propertyName: "text", key: "cartDoneButtonText" })
					}, "Save changes");
				},

				iPressOnTheProceedButton: function () {
					return this._iPressOnTheButton({
						id: "proceedButton"
					}, "Proceed");
				},

				iPressOnSaveForLaterOfItem: function (iIndex) {
					return this.waitFor({
						id: "entryList",
						matchers: [
							function (oList) {
								return oList.getItems()[iIndex];
							}
						],
						success: function (oItem) {
							return this.waitFor({
								controlType: "sap.m.ObjectAttribute",
								matchers: [
									new Ancestor(oItem),
									new I18NText({ propertyName: "text", key: "cartSaveForLaterLinkText" })
								],
								actions: new Press(),
								success: function () {
									Opa5.assert.ok(true, "The item #" + iIndex + " was saved for later");
								},
								errorMessage: "The item #" + iIndex + " saved for later was not found or could not be pressed"
							})
						},
						errorMessage: "The item #" + iIndex + " not found"
					});
				},

				iPressOnAddBackToCartOfSavedItem: function (iIndex) {
					return this.waitFor({
						id: "saveForLaterList",
						matchers: [
							function (oList) {
								return oList.getItems()[iIndex];
							}
						],
						success: function (oItem) {
							return this.waitFor({
								controlType: "sap.m.ObjectAttribute",
								matchers: [
									new Ancestor(oItem),
									new I18NText({ propertyName: "text", key: "cartAddToCartLinkText" })
								],
								actions: new Press(),
								success: function () {
									Opa5.assert.ok(true, "The saved item #" + iIndex + " was put back to cart");
								},
								errorMessage: "The saved item #" + iIndex + " was not found or could not be put back to cart"
							})
						},
						errorMessage: "The saved item #" + iIndex + " not found"
					});
				},

				iPressTheBackButton: function () {
					return this._iPressOnTheButton({
						matchers: new Properties({type: "Back"})
					}, "Back");
				}
			},

			assertions: {
				iShouldSeeSomeProductsInMyCart: function () {
					return this.waitFor({
						id: "entryList",
						matchers: new AggregationFilled({ name: "items" }),
						success: function () {
							Opa5.assert.ok(true, "The cart has entries");
						},
						errorMessage: "The cart does not contain any entries"
					});
				},

				iShouldSeeTheCart: function () {
					return this.waitFor({
						success: function () {
							Opa5.assert.ok(true, "The cart was successfully displayed");
						},
						errorMessage: "The cart was not displayed"
					});
				},

				iShouldNotSeeASaveForLaterFooter: function () {
					return this.waitFor({
						id: "entryList",
						check: function (oList) {
							return oList.getFooterText() === "";
						},
						success: function () {
							Opa5.assert.ok(true, "The footer is not visible");
						},
						errorMessage: "The footer is still visible"
					});
				},

				iShouldSeeAnEmptyCart: function () {
					return this.waitFor({
						id: "entryList",
						matchers: new AggregationLengthEquals({ name: "items", length: 0 }),
						success: function () {
							Opa5.assert.ok(true, "The cart has no entries");
						},
						errorMessage: "The cart does not contain any entries"
					});
				},

				_checkIfButtonEnabled: function (sName, mProperties, bIsEnabled) {
					var sErrorMessage, sSuccessMessage;
					if (bIsEnabled) {
						sErrorMessage = "The " + sName + " button is disabled";
						sSuccessMessage = "The " + sName + " button is enabled";
					} else {
						sErrorMessage = "The " + sName + " button is enabled";
						sSuccessMessage = "The " + sName + " button is disabled";
					}
					return this.waitFor({
						controlType: "sap.m.Button",
						autoWait: bIsEnabled,
						matchers: new Properties(Object.assign({ enabled: bIsEnabled }, mProperties)),
						success: function () {
							Opa5.assert.ok(true, sSuccessMessage);
						},
						errorMessage: sErrorMessage
					});
				},

				iShouldSeeTheProceedButtonDisabled: function () {
					return this._checkIfButtonEnabled("proceed", { type: "Accept" }, false);
				},

				iShouldSeeTheProceedButtonEnabled: function () {
					return this._checkIfButtonEnabled("proceed", { type: "Accept" }, true);
				},

				iShouldSeeTheEditButtonDisabled: function () {
					return this._checkIfButtonEnabled("edit", { icon: "sap-icon://edit" }, false);
				},

				iShouldSeeTheEditButtonEnabled: function () {
					return this._checkIfButtonEnabled("edit", { icon: "sap-icon://edit" }, true);
				},

				iShouldSeeTheDeleteButton: function () {
					return this.waitFor({
						id: "entryList",
						matchers: new Properties({ mode: "Delete" }),
						success: function () {
							Opa5.assert.ok(true, "The delete button was found");
						},
						errorMessage: "The delete button was not found"
					});
				},

				iShouldNotSeeTheDeletedProductInTheCart: function (sProductId) {
					var oBindingPathMatcher = new BindingPath({ path: "/cartEntries/" + sProductId });
					return this.waitFor({
						id: "entryList",
						check: function (oList) {
							return oList.getItems().every(function (oItem) {
								return !oBindingPathMatcher.isMatching(oItem);
							})
						},
						success: function () {
							Opa5.assert.ok(true, "The cart does not contain the product '" + sProductId + "'");
						},
						errorMessage: "The cart contains the product '" + sProductId + "'"
					});
				},

				iShouldBeTakenToTheCart: function () {
					return this.waitFor({
						id: "entryList",
						success: function () {
							Opa5.assert.ok(true, "The cart was found");
						},
						errorMessage: "The cart was not found"
					});
				},

				iShouldSeeOneProductInMySaveForLaterList: function () {
					return this.waitFor({
						id: "saveForLaterList",
						matchers: new AggregationLengthEquals({ name: "items", length: 1 }),
						success: function () {
							Opa5.assert.ok(true, "Product saved for later");
						}
					});
				},

				iShouldSeeAnEmptySaveForLaterList: function () {
					return this.waitFor({
						id: "saveForLaterList",
						matchers: new AggregationEmpty({ name: "items" }),
						success: function () {
							Opa5.assert.ok(true, "The save list was empty");
						},
						errorMessage: "The save list still has entries"
					});
				},

				iShouldSeeTheTotalPriceEqualToZero: function () {
					return this.waitFor({
						id: "totalPriceText",
						matchers: new I18NText({ propertyName: "text", key: "cartTotalPrice", parameters: ["0,00", "EUR"] }),
						success: function () {
							Opa5.assert.ok(true, "Total price is updated correctly");
						},
						errorMessage: "Total price is not updated correctly"
					});
				},

				iShouldSeeTheTotalPriceUpdated: function () {
					return this.waitFor({
						id: "totalPriceText",
						matchers: new I18NText({ propertyName: "text", key: "cartTotalPrice", parameters: ["250,00", "EUR"] }),
						success: function () {
							Opa5.assert.ok(true, "Total price is updated correctly");
						},
						errorMessage: "Total price is not updated correctly"
					});
				}
			}
		}
	});
});
