QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sap/ui/demo/cart/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
