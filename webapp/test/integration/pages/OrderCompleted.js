sap.ui.define([
	"sap/ui/test/Opa5",
	"./Common"
], function (
	Opa5,
	Common
) {
	"use strict";

	Opa5.createPageObjects({
		onOrderCompleted: {
			baseClass: Common,

			viewName: "OrderCompleted",

			actions: {
				iPressOnTheReturnToShopButton: function () {
					return this._iPressOnTheButton({
						id: "returnToShopButton"
					}, "Return to shop");
				}
			},

			assertions: {
				iShouldSeeTheOrderCompletedPage: function () {
					return this.waitFor({
						id: "returnToShopButton",
						success: function (oButton) {
							Opa5.assert.ok(oButton, "Found the order completed page");
						}
					});
				}
			}
		}
	});
});
