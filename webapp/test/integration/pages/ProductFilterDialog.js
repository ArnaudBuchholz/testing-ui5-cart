sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/matchers/PropertyStrictEquals",
	"sap/ui/test/matchers/I18NText",
	"sap/ui/test/actions/Press"
], function (
	Opa5,
	PropertyStrictEquals,
	I18NText,
	Press
) {
	"use strict";

	Opa5.createPageObjects({
		onTheProductFilterDialog: {
			actions: {
				_iPressTheFilterOption: function (sOptionTitle, sOptionKey) {
					return this.waitFor({
						searchOpenDialogs: true,
						controlType: "sap.m.StandardListItem",
						matchers: new I18NText({ propertyName: "title", key: sOptionKey }),
						actions: new Press(),
						success: function () {
							Opa5.assert.ok(true, "The " + sOptionTitle + " was pressed");
						},
						errorMessage: "The " + sOptionTitle + " was not found and could not be pressed"
					});
				},

				iPressTheAvailabilityFilteringOption: function () {
					return this._iPressTheFilterOption("availability filtering option", "availabilityFilterTitle");
				},

				iPressTheAvailableFilter: function () {
					return this._iPressTheFilterOption("available check box", "availableFilterTitle");
				},

				iPressTheOutOfStockFilter: function () {
					return this._iPressTheFilterOption("out of stock check box", "outOfStockFilterTitle");
				},

				iPressTheDiscontinuedFilter: function () {
					return this._iPressTheFilterOption("discontinued checkbox", "discontinuedFilterTitle");
				},

				iPressThePriceFilteringOption: function () {
					return this._iPressTheFilterOption("price filtering option", "priceFilterTitle");
				},

				iSetPriceFilterValues: function (iFrom, iTo) {
					return this.waitFor({
						searchOpenDialogs: true,
						controlType: "sap.m.RangeSlider",
						success: function (aSliders) {
							var oSlider = aSliders[0];
							oSlider.setValue(iFrom).setValue2(iTo);
							// The slider change event is not fired automatically and need to be manually fired
							oSlider.fireEvent("change", {range: oSlider.getRange()});
							Opa5.assert.ok(true, "The price slider control was set to " + iFrom + " - " + iTo);
						},
						errorMessage: "The price slider control was not displayed and could not be modified"
					});
				},

				iPressTheSupplierFilteringOption: function () {
					return this._iPressTheFilterOption("supplier filtering option", "supplierFilterTitle");
				},

				iPressTheSupplierFilter: function (sSupplierName) {
					return this.waitFor({
						searchOpenDialogs: true,
						controlType: "sap.m.StandardListItem",
						matchers: new PropertyStrictEquals({name: "title", value: sSupplierName}),
						actions: new Press(),
						success: function () {
							Opa5.assert.ok(true, "The supplier '" + sSupplierName + "' check box was pressed");
						},
						errorMessage: "The supplier '" + sSupplierName + "' check box was not found and could not be pressed"
					});
				},

				_iPressTheButton: function (sButtonLabel, sButtonId) {
					return this.waitFor({
						searchOpenDialogs: true,
						controlType: "sap.m.Button",
						id: new RegExp(sButtonId + "$"), // ends with
						actions: new Press(),
						success: function () {
							Opa5.assert.ok(true, "The " + sButtonLabel + " button in the dialog was pressed");
						},
						errorMessage: "The " + sButtonLabel + " button in the dialog was not found and could not be pressed"
					});
				},

				iPressOkButton: function () {
					return this._iPressTheButton("OK", "acceptbutton");
				},

				iPressCancelButton: function () {
					return this._iPressTheButton("Cancel", "cancelbutton");
				},

				iPressResetButton: function () {
					return this._iPressTheButton("Reset", "resetbutton");
				},

				iPressTheBackButton: function () {
					return this._iPressTheButton("Back", "backbutton");
				}
			},
			assertions: {
				iShouldSeeThePriceFilterCount: function (iCountNumber) {
					return this.waitFor({
						searchOpenDialogs: true,
						controlType: "sap.m.StandardListItem",
						matchers: [
							new I18NText({ propertyName: "title", key: "priceFilterTitle" }),
							new PropertyStrictEquals({name: "counter", value: iCountNumber})
						],
						success: function() {
							Opa5.assert.ok(true, "The price filter count is correctly set up");
						},
						errorMessage: "The price filter count isn't correctly set up"
					});
				}
			}
		}
	});
});
