sap.ui.define([
	"sap/ui/test/Opa5",
	"Startup",
	"./WelcomeJourney",
	"./NavigationJourney",
	"./DeleteProductJourney",
	"./BuyProductJourney",
	"./FilterJourney",
	"./ComparisonJourney"
], function (Opa5, Startup) {
	"use strict";

	Opa5.extendConfig({
		arrangements: new Startup(),
		viewNamespace: "sap.ui.demo.cart.view.",
		pollingInterval: 50,
		autoWait: true,
		appParams: {
			"sap-ui-language": "EN",
			"sap-ui-animation": false
		}
	});
});
