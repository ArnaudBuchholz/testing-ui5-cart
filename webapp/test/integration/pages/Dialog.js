sap.ui.define([
	"sap/ui/test/Opa5",
	"./Common",
	"sap/ui/test/matchers/PropertyStrictEquals",
	"sap/ui/test/actions/Press"
], function (
	Opa5,
	Common,
	PropertyStrictEquals,
	Press
) {
	"use strict";

	Opa5.createPageObjects({
		onTheDialog : {
			baseClass: Common,

			actions : {
				iPressDeleteButtonOnTheConfirmationDialog : function () {
					return this._iPressOnTheButton({
						searchOpenDialogs: true,
						matchers : new PropertyStrictEquals({ name : "text", value : "Delete" })
					}, "Dialog delete");
				},

				iPressCancelOnTheConfirmationDialog : function () {
					return this._iPressOnTheButton({
						searchOpenDialogs: true,
						matchers : new PropertyStrictEquals({ name : "text", value : "Cancel" })
					}, "Dialog cancel");
				}
			},
			assertions : {
				iShouldBeTakenToTheConfirmationDialog : function () {
					return this.waitFor({
						searchOpenDialogs: true,
						controlType : "sap.m.Button",
						matchers : new PropertyStrictEquals({name : "text", value : "Delete"}),
						success : function () {
							Opa5.assert.ok(true, "The delete button was found");
						},
						errorMessage : "The delete button was not found"
					});
				}
			}
		}
	});
});
