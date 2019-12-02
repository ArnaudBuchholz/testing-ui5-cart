sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/matchers/BindingPath",
	"sap/ui/test/matchers/Properties",
	"sap/ui/test/matchers/AggregationFilled",
	"sap/ui/test/actions/Press"
], function (
	Opa5,
	BindingPath,
	Properties,
	AggregationFilled,
	Press) {
	"use strict";

	Opa5.createPageObjects({
		onTheCategoryList : {
			viewName : "Home",

			actions : {
				iPressOnTheFlatScreensCategory : function () {
					return this.waitFor({
						controlType : "sap.m.StandardListItem",
						matchers : new BindingPath({path : "/ProductCategories('FS')"}),
						actions : new Press(),
						errorMessage : "The category list does not contain required selection"
					});
				},

				iPressOnTheSpeakerCategory : function () {
					return this.waitFor({
						controlType : "sap.m.StandardListItem",
						matchers : new BindingPath({path : "/ProductCategories('SP')"}),
						actions : new Press(),
						errorMessage : "The category list does not contain required selection"
					});
				}
			},
			assertions: {
				iShouldSeeTheCategoryList : function () {
					return this.waitFor({
						id : "categoryList",
						success : function (oList) {
							Opa5.assert.ok(oList, "Found the category List");
						}
					});
				},

				iShouldSeeSomeEntriesInTheCategoryList : function () {
					return this.waitFor({
						id : "categoryList",
						matchers: new AggregationFilled({name : "items"}),
						success : function () {
							Opa5.assert.ok(true, "CategoryList did contain entries");
						},
						errorMessage : "The category list did not contain entries"
					});
				}
			}
		}
	});
});
