QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/gherkin/opa5TestHarness",
	"sap/ui/demo/cart/test/integration/GherkinSteps",
	"sap/ui/demo/cart/test/integration/configureOpa"
], function (testHarness, Steps) {
	"use strict";

	testHarness.test({ featurePath: "sap/ui/demo/cart/test/integration/DeleteProduct", generateMissingSteps: true, steps: Steps });
	testHarness.test({ featurePath: "sap/ui/demo/cart/test/integration/BuyProduct", generateMissingSteps: true, steps: Steps });
	testHarness.test({ featurePath: "sap/ui/demo/cart/test/integration/SaveForLater", generateMissingSteps: true, steps: Steps });
	testHarness.test({ featurePath: "sap/ui/demo/cart/test/integration/ProductsFilter", generateMissingSteps: true, steps: Steps });

	QUnit.start();
});
