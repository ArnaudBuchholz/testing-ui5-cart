sap.ui.define([
	"sap/ui/model/type/String",
	"sap/ui/model/ValidateException",
	"sap/ui/model/resource/ResourceModel"
], function (String, ValidateException, ResourceModel) {
	"use strict";

	var oResourceModel = new ResourceModel({
		bundleName: "sap.ui.demo.cart.i18n.i18n"
	});

	return String.extend("sap.ui.demo.cart.model.EmailType", {

		/**
		 * Validates the value to be parsed
		 *
		 * @public
		 * The following Regex does NOT covering all cases of RFC 5322 email address
		 * and only used for demonstration purposes.
		 * @returns undefined, but throws the ValidationException if the value is not valid
		 */

		validateValue: function (oValue) {
			// 
			var rEMail = /^\w+[\w-+.]*@\w+([-.]\w+)*\.[a-zA-Z]{2,}$/;

			if (!oValue.match(rEMail)) {
				throw new ValidateException(oResourceModel.getResourceBundle().getText("checkoutCodEmailValueTypeMismatch", [oValue]));
			}
		}

	});
});
