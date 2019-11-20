/*global QUnit*/

sap.ui.define([
	"sap/ui/demo/cart/model/models"
], function (
	models
) {
	"use strict";

	QUnit.module("createDeviceModel", {
		afterEach : function () {
			this.oDeviceModel.destroy();
		}
	}, function () {
		function isPhoneTestCase(assert, bIsPhone) {
			this.stub(sap.ui.Device, "system", { phone : bIsPhone });
			this.oDeviceModel = models.createDeviceModel();

			assert.strictEqual(this.oDeviceModel.getProperty("/system/phone"), bIsPhone, "IsPhone property is correct");
		}

		QUnit.test("Should initialize a device model for desktop", function (assert) {
			isPhoneTestCase.call(this, assert, false);
		});

		QUnit.test("Should initialize a device model for phone", function (assert) {
			isPhoneTestCase.call(this, assert, true);
		});

		function isTouchTestCase(assert, bIsTouch) {
			this.stub(sap.ui.Device, "support", { touch : bIsTouch });
			this.oDeviceModel = models.createDeviceModel();

			assert.strictEqual(this.oDeviceModel.getProperty("/support/touch"), bIsTouch, "IsTouch property is correct");
		}

		QUnit.test("Should initialize a device model for non touch devices", function (assert) {
			isTouchTestCase.call(this, assert, false);
		});

		QUnit.test("Should initialize a device model for touch devices", function (assert) {
			isTouchTestCase.call(this, assert, true);
		});

		QUnit.test("The binding mode of the device model should be one way", function (assert) {
			this.oDeviceModel = models.createDeviceModel();
			assert.strictEqual(this.oDeviceModel.getDefaultBindingMode(), "OneWay", "Binding mode is correct");
		});
	});
});
