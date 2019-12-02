sap.ui.define([
	"sap/ui/test/Opa5",
	"./Common",
	"sap/ui/test/matchers/BindingPath",
	"sap/ui/test/matchers/Properties",
	"sap/ui/test/matchers/PropertyStrictEquals",
	"sap/ui/test/matchers/AggregationFilled",
	"sap/ui/test/matchers/I18NText",
	"sap/ui/test/actions/Press",
	"sap/ui/test/actions/EnterText",
	"sap/base/util/includes"
], function (
	Opa5,
	Common,
	BindingPath,
	Properties,
	PropertyStrictEquals,
	AggregationFilled,
	I18NText,
	Press,
	EnterText,
	includes
) {
	"use strict";

	Opa5.createPageObjects({
		onCheckout: {
			baseClass: Common,

			viewName: "Checkout",

			actions: {
				iPressOnTheReturnToShopButton: function () {
					return this._iPressOnTheButton({
						id: "returnToShopButton"
					}, "Return to shop");
				},

				iPressOnTheNextStepButton: function () {
					return this._iPressOnTheButton({
						id: /-nextButton$/
					}, "Next");
				},

				iPressOnDifferentAddressCheckbox: function () {
					return this.waitFor({
						id: "differentDeliveryAddress",
						actions: new Press(),
						success: function () {
							Opa5.assert.ok(true, "The Different Delivery Address Checkbox was pressed");
						},
						errorMessage: "The Different Delivery Address Checkbox was not found and could not be pressed"
					});
				},

				iPressOnTheButtonInTheFooter: function () {
					return this._iPressOnTheButton({
						id: "showPopoverButton"
					}, "Footer button");
				},

				_iEnterTextIn: function (sId, sText, sErrorMessage) {
					return this.waitFor({
						id: sId,
						actions: new EnterText({ text: sText }),
						errorMessage: sErrorMessage
					});
				},

				iEnterCreditCardInformation: function (sHolderName, sNumber, sCode, sDate) {
					this._iEnterTextIn("creditCardHolderName", sHolderName, "Could not enter credit card holder name");
					this._iEnterTextIn("creditCardNumber", sNumber, "Could not enter credit card number");
					this._iEnterTextIn("creditCardSecurityNumber", sCode, "Could not enter credit card code");
					this._iEnterTextIn("creditCardExpirationDate", sDate, "Could not enter credit card date");
					return this.waitFor({
						success: function () {
							Opa5.assert.ok(true, "Credit card information entered");
						}
					});
				},

				iEnterCashOnDeliveryInformation: function (sFirstName, sLastName, sPhone, sEmail) {
					this._iEnterTextIn("cashOnDeliveryName", sFirstName, "Could not enter cash on delivery first name");
					this._iEnterTextIn("cashOnDeliveryLastName", sLastName, "Could not enter cash on delivery last name");
					this._iEnterTextIn("cashOnDeliveryPhoneNumber", sPhone, "Could not enter cash on delivery phone number");
					this._iEnterTextIn("cashOnDeliveryEmail", sEmail, "Could not enter cash on delivery email");
					return this.waitFor({
						success: function () {
							Opa5.assert.ok(true, "Cash on delivery information entered");
						}
					});
				},

				iEnterInvoiceAddressInformation: function (sStreet, sCity, sZipCode, sCountry) {
					this._iEnterTextIn("invoiceAddressAddress", sStreet, "Could not enter invoice address street");
					this._iEnterTextIn("invoiceAddressCity", sCity, "Could not enter invoice address city");
					this._iEnterTextIn("invoiceAddressZip", sZipCode, "Could not enter invoice address zip code");
					this._iEnterTextIn("invoiceAddressCountry", sCountry, "Could not enter invoice address country");
					return this.waitFor({
						success: function () {
							Opa5.assert.ok(true, "Invoice address entered");
						}
					});
				},

				iEnterDeliveryAddressInformation: function (sStreet, sCity, sZipCode, sCountry) {
					this._iEnterTextIn("deliveryAddressAddress", sStreet, "Could not enter delivery address street");
					this._iEnterTextIn("deliveryAddressCity", sCity, "Could not enter delivery address city");
					this._iEnterTextIn("deliveryAddressZip", sZipCode, "Could not enter delivery address zip code");
					this._iEnterTextIn("deliveryAddressCountry", sCountry, "Could not enter delivery address country");
					return this.waitFor({
						success: function () {
							Opa5.assert.ok(true, "Delivery address entered");
						}
					});
				},

				iPressOnTheSubmitButton: function () {
					return this._iPressOnTheButton({
						id: "submitOrder"
					}, "Submit");
				},

				iPressOnTheYesButton: function () {
					return this._iPressOnTheButton({
						searchOpenDialogs: true,
						matchers: new PropertyStrictEquals({ name: "text", value: "Yes" })
					}, "Yes");
				},

				iPressOnTheBacktoListButton: function () {
					return this._iPressOnTheButton({
						id: "backtoList"
					}, "Back to list");
				},

				iPressOnTheBackToPaymentTypeButton: function () {
					return this._iPressOnTheButton({
						id: "backToPaymentType"
					}, "Back to payment type");
				},

				iPressOnTheBackToInvoiceAddressButton: function () {
					return this._iPressOnTheButton({
						id: "backToInvoiceAddress"
					}, "Back to invoice address");
				},

				iPressOnTheBackToDeliveryTypeButton: function () {
					return this._iPressOnTheButton({
						id: "backToDeliveryType"
					}, "Back to delivery type");
				},

				iPressOnTheBankTransferButton : function () {
					return this._iPressOnTheButton({
						matchers: new I18NText({ propertyName: "text", key: "checkoutPaymentBankTransfer"})
					}, "Bank Transfer");
				},

				iPressOnTheCashOnDeliveryButton : function () {
					return this._iPressOnTheButton({
						matchers: new I18NText({ propertyName: "text", key: "checkoutPaymentCod"})
					}, "Cash On Delivery");
				},

				iPressOnTheExpressDeliveryButton : function () {
					return this._iPressOnTheButton({
						matchers: new I18NText({ propertyName: "text", key: "checkoutDeliveryTypeExpress"})
					}, "Express delivery");
				},

				iPressTheCloseButton: function () {
					return this._iPressOnTheButton({
						searchOpenDialogs: true,
						matchers: new PropertyStrictEquals({ name: "icon", value: "sap-icon://decline" })
					}, "Close");
				}
			},

			assertions: {
				iShouldSeeTheWizardStepContentsStep: function () {
					return this.waitFor({
						id: "contentsStep",
						success: function (oStep) {
							Opa5.assert.ok(oStep, "Found the WizardStep 'contentsStep'");
						}
					});
				},

				iShouldSeeTheWizardStepPaymentTypeStep: function () {
					return this.waitFor({
						id: "paymentTypeStep",
						success: function (oStep) {
							Opa5.assert.ok(oStep, "Found the WizardStep 'PaymentTypeStep'");
						}
					});
				},

				_iShouldSeeTheStepButton: function (iStepIndex) {
					return this.waitFor({
						controlType : "sap.m.Button",
						matchers: new PropertyStrictEquals({ name: "text", value: "Step " + iStepIndex }),
						success: function () {
							Opa5.assert.ok(true, "Found the Step " + iStepIndex + " Button enabled");
						}
					});
				},

				iShouldSeeTheStep3Button: function () {
					return this._iShouldSeeTheStepButton(3);
				},

				iShouldSeeTheStep4Button: function () {
					return this._iShouldSeeTheStepButton(4);
				},

				iShouldSeeTheStep5Button: function () {
					return this._iShouldSeeTheStepButton(5);
				},

				iShouldSeeTheStep6Button: function () {
					return this._iShouldSeeTheStepButton(6);
				},

				iShouldGetErrorMessageTextDoesNotMatchTypeForEmailField: function (sEmailFieldValue) {
					return this.waitFor({
						id: "cashOnDeliveryEmail",
						matchers: new Properties({
							valueState: "Error",
							valueStateText: "\"" + sEmailFieldValue + "\" is not a valid email address"
						}),
						errorMessage: "The Email field error message text does not match to the type of error (value has wrong format)."
					});
				},

				_iShouldNotSeeTheNextStepButton: function (iStepIndex, aPreviousStepIds) {
					return this.waitFor({
						id: "shoppingCartWizard",
						matchers: [
							function (oWizard) {
								return oWizard.getCurrentStep();
							},
							function (sFullStepId) {
								return sFullStepId.split("--").pop();
							},
							function (sStepId) {
								return includes(aPreviousStepIds, sStepId);
							}
						],
						success: function (sPreviousStepId) {
							this.waitFor({
								id: new RegExp(sPreviousStepId + "-nextButton$"),
								visible: false,
								matchers: new PropertyStrictEquals({ name: "visible", value: false }),
								success: function () {
									Opa5.assert.ok(true, "The Step " + iStepIndex + " button is not displayed");
								},
								errorMessage: "The Step " + iStepIndex + " button is displayed"
							});
						},
						errorMessage: "Unable to access the wizard or the current step is not " + (iStepIndex - 1)
					});
				},

				iShouldNotSeeTheStep4Button: function () {
					return this._iShouldNotSeeTheNextStepButton(4, [
						// Step 4 button appears only in these steps
						"creditCardStep",
						"bankAccountStep",
						"cashOnDeliveryStep"
					]);
				},

				iShouldNotSeeTheStep5Button: function () {
					return this._iShouldNotSeeTheNextStepButton(5, [
						// Step 5 button appears only in this step
						"invoiceStep"
					]);
				},

				iShouldSeeTheDeliveryAddressStep: function () {
					return this.waitFor({
						id: "deliveryAddressStep",
						success: function () {
							Opa5.assert.ok(true, "Found the WizardStep 'DeliveryStep'");
						}
					});
				},

				iShouldSeeTheDeliveryStepButton: function () {
					return this.waitFor({
						id: "deliveryAddressStep",
						success: function (oStep) {
							Opa5.assert.ok(oStep.getValidated(), "The delivery step button was found");
						},
						errorMessage: "The delivery step button was not found"
					});
				},

				iShouldSeeTheDeliveryTypeStep: function () {
					return this.waitFor({
						id: "deliveryTypeStep",
						success: function () {
							Opa5.assert.ok(true, "Found the WizardStep 'DeliveryTypeStep'");
						}
					});
				},

				iShouldSeeTheOrderSummary: function () {
					return this.waitFor({
						id: "summaryPage",
						success: function () {
							Opa5.assert.ok(true, "Found the order summary page");
						}
					});
				},

				iShouldSeeExpressDelivery: function () {
					return this.waitFor({
						id: "selectedDeliveryMethod",
						success: function () {
							Opa5.assert.ok(true, "Found the Express Delivery Method");
						}
					});
				},

				iShouldSeeTheFooterWithTheErrorButton: function() {
					return this.waitFor({
						id : "showPopoverButton",
						matchers: new Properties({
							icon: "sap-icon://message-popup",
							text: "1"
						}),
						success: function () {
							Opa5.assert.ok(true, "Found the the error button in the footer");
						},
						errorMessage: "The error button is not visible in the footer"
					});
				},

				iShouldSeeTheMessagePopover: function() {
					return this.waitFor({
						id : "messagePopover",
						success : function () {
							Opa5.assert.ok("errorMessagePopover", "The MessagePopover is visible");
						},
						errorMessage: "The MessagePopover was not displayed"
					});
				}
			}
		}
	});
});
