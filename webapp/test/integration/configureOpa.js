sap.ui.define([
	"sap/ui/test/Opa5",
	"Startup",
	// Page Objects
	"./pages/Cart",
	"./pages/CategoryProductList",
	"./pages/Checkout",
	"./pages/Comparison",
	"./pages/Dialog",
	"./pages/Home",
	"./pages/OrderCompleted",
	"./pages/Product",
	"./pages/ProductFilterDialog",
	"./pages/Welcome"
], function (Opa5, Startup) {
	"use strict";

	Opa5.extendConfig({
		arrangements : new Startup(),
		viewNamespace : "sap.ui.demo.cart.view.",
		pollingInterval: 50,
		autoWait: true,
		appParams: {
			// "sap-ui-animation": false,
			"sap-ui-language": "EN"
		}
	});
});
