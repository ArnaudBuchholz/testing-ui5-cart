sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

	return {
		createDeviceModel : function () {
			var oModel = new JSONModel(Object.assign({
				animationMode: "full"
			}, Device));
			var oConfiguration = sap.ui.getCore().getConfiguration();
			oModel.setProperty("/animationMode", oConfiguration.getAnimationMode());
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		}
	};

});
