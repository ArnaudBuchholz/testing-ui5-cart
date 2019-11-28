sap.ui.define([
	"sap/ui/test/Opa5",
], function (
	Opa5
) {
	"use strict";

	Opa5.createPageObjects({
		onTheProductFilterDialog: {
			viewName: "Category",

			actions: {
				_iSelectTheFilteringOption: function (sOptionTitle, sOptionKey) {
					return this.waitFor({
						controlType: "sap.m.StandardListItem",
						matchers: new I18NText({ propertyName: "title", key: sOptionKey }),
						actions: new Press(),
						success: function () {
							Opa5.assert.ok(true, "The " + sOptionTitle + " filtering option was pressed");
						},
						errorMessage: "The " + sOptionTitle + " filtering option was not found and could not be pressed"
					});
				},

				iSelectTheAvailabilityFilteringOption: function () {
					return this._iSelectTheFilteringOption("availability", "availabilityFilterTitle");
				},

				iSelectTheSupplierFilteringOption: function () {
					return this._iSelectTheFilteringOption("supplier", "supplierFilterTitle");
				},

				iSelectTheAvailableFilter: function () {
					return this._iSelectTheFilteringOption("available", "availableFilterTitle");
				},

				iSelectTheDiscontinuedFilter: function () {
					return this._iSelectTheFilteringOption("discontinued", "discontinuedFilterTitle");
				},

				iSelectTheTechnocomFilter: function () {
					this.waitFor({
						controlType: "sap.m.StandardListItem",
						matchers: new PropertyStrictEquals({name: "title", value: "Technocom"}),
						actions: new Press(),
						errorMessage: "The Technocom check box was not found and could not be selected"
					});
				},

				iSelectTheOutOfStockFilter: function () {
					this.waitFor({
						controlType: "sap.m.StandardListItem",
						matchers: new PropertyStrictEquals({name: "title", value: "Out of Stock"}),
						actions: new Press(),
						errorMessage: "The out of stock check box was not found and could not be selected"
					});
				},

				iDeselectTheAvailableFilter: function () {
					this.waitFor({
						controlType: "sap.m.StandardListItem",
						matchers: new PropertyStrictEquals({name: "title", value: "Available"}),
						actions: new Press(),
						errorMessage: "The available check box was not found and could not be deselected"
					});
				},

				iDeselectTheDiscontinuedFilter: function () {
					this.waitFor({
						controlType: "sap.m.StandardListItem",
						matchers: new PropertyStrictEquals({name: "title", value: "Discontinued"}),
						actions: new Press(),
						errorMessage: "The discontinued check box was not found and could not be deselected"
					});
				},

				iDeselectTheTechnoComFilter: function () {
					this.waitFor({
						controlType: "sap.m.StandardListItem",
						matchers: new PropertyStrictEquals({name: "title", value: "Technocom"}),
						actions: new Press(),
						errorMessage: "The Technocom check box was not found and could not be deselected"
					});
				},

				iPressOkButton: function () {
					this.waitFor({
						controlType: "sap.m.Button",
						matchers: new PropertyStrictEquals({name: "text", value: "OK"}),
						actions: new Press(),
						errorMessage: "The ok button in the dialog was not found and could not be pressed"
					});
				},

				iPressCancelButton: function () {
					this.waitFor({
						controlType: "sap.m.Button",
						matchers: new PropertyStrictEquals({name: "text", value: "Cancel"}),
						actions: new Press(),
						errorMessage: "The cancel button in the dialog was not found and could not be pressed"
					});
				},

				iPressResetButton: function () {
					this.waitFor({
						controlType: "sap.m.Button",
						matchers: new PropertyStrictEquals({name: "text", value: "Reset"}),
						actions: new Press(),
						errorMessage: "The reset button in the dialog was not found and could not be pressed"
					});
				},

				iPressTheBackButtonInDialog: function () {
					this.waitFor({
						controlType: "sap.m.Button",
						matchers: new PropertyStrictEquals({name: "icon", value: "sap-icon://nav-back"}),
						actions: new Press(),
						errorMessage: "The back button in the dialog was not found and could not be pressed"
					});
				},

				iSelectThePriceFilteringOption: function () {
					this.waitFor({
						controlType: "sap.m.StandardListItem",
						matchers: new PropertyStrictEquals({name: "title", value: "Price"}),
						actions: new Press(),
						errorMessage: "The price filtering option was not found and could not be pressed"
					});
				},
				iSetPriceFilterValues: function () {
					this.waitFor({
						controlType: "sap.m.RangeSlider",
						matchers: new PropertyStrictEquals({name: "value2", value: 5000}),
						success: function (oSlider) {
							oSlider[0].setValue(200).setValue2(500);
						},
						errorMessage: "The range slider control was not displayed and could not be scrolled"

					});
				},

				iChangeThePriceFilterValues: function () {
					this.waitFor({
						controlType: "sap.m.RangeSlider",
						matchers: new PropertyStrictEquals({name: "value2", value: 500}),
						success: function (oSlider) {
							oSlider[0].setValue(500).setValue2(1000);
						},
						errorMessage: "The range slider control was not displayed and could not be scrolled"

					});
				},
				iChangeToTheDefaultPriceFilterValues: function () {
					this.waitFor({
						controlType: "sap.m.RangeSlider",
						matchers: new PropertyStrictEquals({name: "value2", value: 500}),
						success: function (oSlider) {
							oSlider[0].setValue(0).setValue2(5000);
							// the slider change event is not fired automatically and need to be manually fired
							oSlider[0].fireEvent("change", {range: oSlider[0].getRange()});
						},
						errorMessage: "The range slider control was not displayed and could not be scrolled"

					});
				},

				iFilterOnAvailability: function () {
					this.iPressTheFilterButton();
					this.iSelectTheAvailabilityFilteringOption();
					this.iSelectTheAvailableFilter();
					this.iSelectTheDiscontinuedFilter();
					this.iPressOkButton();
				},
				iFilterOnSupplier: function () {
					this.iPressTheFilterButton();
					this.iSelectTheSupplierFilteringOption();
					this.iSelectTheTechnocomFilter();
					this.iPressOkButton();
				},
				iFilterOnAvailabilityAndPrice: function () {
					this.iPressTheFilterButton();
					this.iSelectTheOutOfStockFilter();
					this.iPressTheBackButtonInDialog();
					this.iSelectThePriceFilteringOption();
					this.iSetPriceFilterValues();
					this.iPressOkButton();
				},
				iCancelAPriceFilterChange: function () {
					this.iPressTheFilterButton();
					this.iChangeThePriceFilterValues();
					this.iPressCancelButton();
				},
				iChangeToTheDefaultFilterPriceValues: function () {
					this.iSelectThePriceFilteringOption();
					this.iChangeToTheDefaultPriceFilterValues();
					this.iPressOkButton();
				},
				iRemoveTheAvailabilityFilters: function () {
					this.iPressTheFilterButton();
					this.iDeselectTheAvailableFilter();
					this.iDeselectTheDiscontinuedFilter();
					this.iPressOkButton();
				},
				iRemoveTheSupplierFilter: function () {
					this.iPressTheFilterButton();
					this.iDeselectTheTechnoComFilter();
					this.iPressOkButton();
				}

			},

			assertions: {
			}
		}
	});
});
