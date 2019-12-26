sap.ui.define([
	"./BaseController",
	"../model/formatter",
	"sap/ui/core/Fragment",
	"sap/m/MessageBox"
], function(
	BaseController,
	formatter,
	Fragment,
	MessageBox
) {
	"use strict";

	return BaseController.extend("sap.ui.demo.cart.controller.Product", {
		formatter : formatter,

		onInit : function () {
			var oComponent = this.getOwnerComponent();
			this._router = oComponent.getRouter();
			this._router.getRoute("product").attachPatternMatched(this._routePatternMatched, this);

			this._router.getTarget("product").attachDisplay(function (oEvent) {
				this.fnUpdateProduct(oEvent.getParameter("data").productId);// update the binding based on products cart selection
			}, this);
		},

		_loadProduct: function (sProductId) {
			var oView = this.getView(),
				oModel = oView.getModel();
			// the binding should be done after insuring that the metadata is loaded successfully
			oModel.metadataLoaded().then(function () {
				var sPath = "/" + this.getModel().createKey("Products", {
						ProductId: sProductId
					});
				oView.bindElement({
					path : sPath,
					events: {
						dataRequested: function () {
							oView.setBusy(true);
						},
						dataReceived: function () {
							oView.setBusy(false);
						}
					}
				});
				var oData = oModel.getData(sPath);
				//if there is no data the model has to request new data
				if (!oData) {
					oView.setBusyIndicatorDelay(0);
					oView.getElementBinding().attachEventOnce("dataReceived", function() {
						// reset to default
						oView.setBusyIndicatorDelay(null);
						this._checkIfProductAvailable(sPath);
					}.bind(this));
				}
			}.bind(this));
		},

		_routePatternMatched: function(oEvent) {
			this._loadProduct(oEvent.getParameter("arguments").productId);
		},

		fnUpdateProduct: function(productId) {
			var sPath = "/Products('" + productId + "')",
				fnCheck = function () {
					this._checkIfProductAvailable(sPath);
				};

			this.getView().bindElement({
				path: sPath,
				events: {
					change: fnCheck.bind(this)
				}
			});
		},

		_checkIfProductAvailable: function(sPath) {
			var oModel = this.getModel();
			var oData = oModel.getData(sPath);

			// show not found page
			if (!oData) {
				this._router.getTargets().display("notFound");
			}
		},

		/**
		 * Navigate to the generic cart view
		 * @param {sap.ui.base.Event} @param oEvent the button press event
		 */
		onToggleCart: function (oEvent) {
			var bPressed = oEvent.getParameter("pressed");
			var oEntry = this.getView().getBindingContext().getObject();

			this._setLayout(bPressed ? "Three" : "Two");
			this.getRouter().navTo(bPressed ? "productCart" : "product", {
				id: oEntry.Category,
				productId: oEntry.ProductId
			});
		},

		_openProductReviewDialog: function (oBindingContext) {
			// load asynchronous XML fragment
			var oDialog = this.byId("productReviewDialog"),
				oPromise;
			if (oDialog) {
				oPromise = Promise.resolve(oDialog);
			} else {
				oPromise = Fragment.load({
					id: this.getView().getId(),
					name: "sap.ui.demo.cart.view.ProductReviewDialog",
					controller: this
				}).then(function(oDialog){
					// connect dialog to the root view of this component (models, lifecycle)
					this.getView().addDependent(oDialog);
					oDialog.addStyleClass(this.getOwnerComponent().getContentDensityClass());
					return oDialog;
				}.bind(this));
			}
			oPromise.then(function (oDialog) {
				oDialog.setBindingContext(oBindingContext);
				oDialog.open();
			});
		},

		onAddReview: function (/*oEvent*/) {
			var oBindingContext = this.getModel().createEntry("Reviews", {
				properties: {
					ProductId: this.getView().getBindingContext().getObject().ProductId
				},
				refreshAfterChange: true
			});
			oBindingContext._new = true;
			this._openProductReviewDialog(oBindingContext);
		},

		_getUserReviewPath: function () {
			return "/" + this.getModel().createKey("Reviews", {
				ReviewId: this.getView().getBindingContext().getObject().UserReviewId
			});
		},

		onEditReview: function (/*oEvent*/) {
			this.getModel().createBindingContext(this._getUserReviewPath(), function (oBindingContext) {
				this._openProductReviewDialog(oBindingContext);
			}.bind(this));
		},

		_reloadCurrentProduct: function () {
			var oModel = this.getModel(),
				oProductContext = this.getView().getBindingContext(),
				sProductId = oProductContext.getObject().ProductId;
			oModel.invalidateEntry(oProductContext); // Will force reload
			this._loadProduct(sProductId);
		},

		onRemoveReview: function (/*oEvent*/) {
			var sMessage = this.getModel("i18n").getProperty("reviewConfirmRemove"),
				oModel = this.getModel(),
				sUserReviewPath = this._getUserReviewPath();
			MessageBox.confirm(sMessage, {
				onClose: function (oAction) {
					if (oAction === MessageBox.Action.OK) {
						oModel.remove(sUserReviewPath, {
							success: this._reloadCurrentProduct.bind(this),
							error: function () {
								MessageBox.error(sMessage);
							}
						});
					}
				}.bind(this)
			});
		},

		onReviewOK: function (/*oEvent*/) {
			var oModel = this.getModel(),
				oDialog = this.byId("productReviewDialog"),
				sMessage = this.getModel("i18n").getProperty("reviewError");
			oDialog.setBusy(true);
			oModel.submitChanges({
				success: function () {
					this._reloadCurrentProduct();
					oDialog.setBusy(false);
					oDialog.close();
				}.bind(this),
				error: function () {
					MessageBox.error(sMessage, {
						onClose: function() {
							oDialog.close();
						}
					});
				}
			});
		},

		onReviewCancel: function (/*oEvent*/) {
			var oDialog = this.byId("productReviewDialog"),
				oBindingContext = oDialog.getBindingContext();
			if (oBindingContext._new) {
				this.getModel().deleteCreatedEntry(oBindingContext);
			}
			oDialog.close();
		}
	});
});
