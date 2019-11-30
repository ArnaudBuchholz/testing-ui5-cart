sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press"
], function (
	Opa5,
	Press
) {
	"use strict";

	return Opa5.extend("sap.ui.demo.cart.test.integration.pages.Common", {

		_iPressOnTheButton: function (oBase, sLabel) {
			return this.waitFor(Object.assign({
				controlType: "sap.m.Button",
				actions: new Press(),
				success: function () {
					Opa5.assert.ok(true, "The " + sLabel + " button was pressed");
				},
				errorMessage: "The " + sLabel + " button could not be pressed"
			}, oBase));
		}

	});

});
