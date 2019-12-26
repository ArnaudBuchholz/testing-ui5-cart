sap.ui.define([
	"sap/ui/demo/cart/model/EmailType"
], function (
	EmailType
) {
	"use strict";

	QUnit.module("EmailType - parsing", function () {

		QUnit.test("Should throw an error when the E-Mail address is not valid: empty address", function (assert) {
			assert.throws(function () {
				new EmailType().validateValue("");
			}, "Correctly throws validation error");
		});

		QUnit.test("Should throw an error when the E-Mail address is not valid: blank address", function (assert) {
			assert.throws(function () {
				new EmailType().validateValue(" ");
			}, "Correctly throws validation error");
		});

		QUnit.test("Should throw an error when the E-Mail address is not valid: missing server", function (assert) {
			assert.throws(function () {
				new EmailType().validateValue("info.bla");
			}, "Correctly throws validation error");
		});

		QUnit.test("Should throw an error when the E-Mail address is not valid: unqualified server", function (assert) {
			assert.throws(function () {
				new EmailType().validateValue("info.bla@com");
			}, "Correctly throws validation error");
		});

		QUnit.test("Should accept the value when it is a valid e-mail address", function (assert) {
			new EmailType().validateValue("info@sap.com");
			assert.ok(true, "no exception occurred");
		});
	});
});
