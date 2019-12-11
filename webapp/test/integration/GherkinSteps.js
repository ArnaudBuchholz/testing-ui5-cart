sap.ui.define([
	"sap/ui/test/gherkin/StepDefinitions",
	"Startup"
], function(StepDefinitions, Startup) {
	"use strict";
	Startup = new Startup();

	return StepDefinitions.extend("GherkinWithOPA5.Steps", {
		init: function() {
			this.register(
				/^I start my App with the hash "(.*)" (.*)/i,
				function (sHash, sStorage) {
					var bKeepStorage = sStorage.indexOf("keeping") >= 0;
					Startup.iStartMyApp({
						keepStorage: bKeepStorage,
						hash: sHash
					});
				}
			);

			this.register(
				/^on the cart: I press on the delete button of item ([0-9]+)/i,
				function (sIndex, Given, When, Then) {
					When.onTheCart.iPressOnTheDeleteButtonOfItem(parseInt(sIndex, 10));
				}
			);

			this.register(
				/^on the cart: I should not see the deleted item "([^"]+)" in the cart/i,
				function (sProductId, Given, When, Then) {
					Then.onTheCart.iShouldNotSeeTheDeletedProductInTheCart(sProductId);
				}
			);

			this.register(
				/^on the product: I should see the product "([^"]+)" detail/i,
				function (sProductId, Given, When, Then) {
					Then.onTheProduct.iShouldSeeTheProductDetailPage(sProductId);
				}
			);

			this.register(
				/^on checkout: I enter credit card information "([^"]+)" ([\d-]+) (\d+) (\d\d\/\d\d\d\d)/i,
				function (sHolderName, sNumber, sCode, sDate, Given, When, Then) {
					When.onCheckout.iEnterCreditCardInformation(sHolderName, sNumber.replace(/-/g, ""), sCode, sDate);
				}
			);

			this.register(
				/^on checkout: I enter invoice address "([^"]+)" "([^"]+)" "([^"]+)" "([^"]+)"/i,
				function (sStreet, sCity, sZipCode, sCountry, Given, When, Then) {
					When.onCheckout.iEnterInvoiceAddressInformation(sStreet, sCity, sZipCode, sCountry);
				}
			);

			this.register(
				/^on checkout: I enter cash on delivery info "([^"]+)" "([^"]+)" "([^"]+)" "([^"]+)"/i,
				function (sFirstName, sLastName, sPhone, sEmail, Given, When, Then) {
					When.onCheckout.iEnterCashOnDeliveryInformation(sFirstName, sLastName, sPhone, sEmail);
				}
			);

			this.register(
				/^on checkout: I enter delivery address "([^"]+)" "([^"]+)" "([^"]+)" "([^"]+)"/i,
				function (sStreet, sCity, sZipCode, sCountry, Given, When, Then) {
					When.onCheckout.iEnterDeliveryAddressInformation(sStreet, sCity, sZipCode, sCountry);
				}
			);

			this.register(
				/^on the cart: I press on save for later for the first product/i,
				function (Given, When, Then) {
					When.onTheCart.iPressOnSaveForLaterOfItem(0);
				}
			);
		}
	});

});
