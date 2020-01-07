sap.ui.define([
	"sap/ui/core/util/MockServer",
	"sap/ui/model/json/JSONModel",
	"sap/base/Log",
	"sap/base/util/UriParameters"
], function (
	MockServer,
	JSONModel,
	Log,
	UriParameters
) {
	"use strict";

	var oMockServer,
		_sAppPath = "sap/ui/demo/cart/",
		_sJsonFilesPath = _sAppPath + "localService/mockdata";

	var oMockServerInterface = {

		/**
		 * Initializes the mock server asynchronously.
		 * You can configure the delay with the URL parameter "serverDelay".
		 * The local mock data in this folder is returned instead of the real data for testing.
		 * @protected
		 * @param {object} [oOptionsParameter] init parameters for the mockserver
		 * @returns{Promise} a promise that is resolved when the mock server has been started
		 */
		init : function (oOptionsParameter) {
			var oOptions = oOptionsParameter || {};

			return new Promise(function(fnResolve, fnReject) {
				var sManifestUrl = sap.ui.require.toUrl(_sAppPath + "manifest.json"),
					oManifestModel = new JSONModel(sManifestUrl);

				oManifestModel.attachRequestCompleted(function ()  {
					var oUriParameters = UriParameters.fromQuery(window.location.search),
						// parse manifest for local metadata URI
						sJsonFilesUrl = sap.ui.require.toUrl(_sJsonFilesPath),
						oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/mainService"),
						sMetadataUrl = sap.ui.require.toUrl(_sAppPath + oMainDataSource.settings.localUri),
						// ensure there is a trailing slash
						sMockServerUrl = /.*\/$/.test(oMainDataSource.uri) ? oMainDataSource.uri : oMainDataSource.uri + "/";

					// create a mock server instance or stop the existing one to reinitialize
					if (!oMockServer) {
						oMockServer = new MockServer({
							rootUri: sMockServerUrl
						});
					} else {
						oMockServer.stop();
					}

					// configure mock server with the given options or a default delay of 0.5s
					MockServer.config({
						autoRespond : true,
						autoRespondAfter : (oOptions.delay || oUriParameters.get("serverDelay") || 500)
					});

					// simulate all requests using mock data
					oMockServer.simulate(sMetadataUrl, {
						sMockdataBaseUrl : sJsonFilesUrl,
						bGenerateMissingMockData : true
					});

					// Generate fake reviews
					var aReviewLines = [
							"Praesent eget tellus nunc.",
							"Vestibulum faucibus vulputate volutpat.",
							"Cras porttitor erat non sem molestie, a congue sapien tristique.",
							"Nunc quis ipsum lorem.",
							"Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
							"Pellentesque luctus venenatis massa id lobortis. Suspendisse vestibulum fermentum luctus.",
							"Integer dictum augue vitae dictum ornare.",
							"Nullam feugiat fringilla arcu ornare lacinia.",
							"Duis nec magna mi.",
							"Morbi sit amet lacus rhoncus, rhoncus dolor vel, tincidunt diam.",
							"Integer sagittis sed lorem ac iaculis. Nunc ac posuere justo, a mattis lacus.",
							"Donec non nulla fermentum, euismod dui a, aliquet justo. Suspendisse potenti.",
							"Donec consequat, mauris eget aliquet viverra, dui odio tristique justo, non commodo turpis lorem nec odio.",
							"Integer at elit nisl. Aenean massa mi, semper non tincidunt et, faucibus id ante.",
							"Nullam molestie sapien non erat blandit, quis posuere tellus finibus."
						],
						aReviews = [],
						aProducts = oMockServer.getEntitySetData("Products");
					aProducts.forEach(function (oProduct) {
						var sProductId = oProduct.ProductId,
							iNbReviews;
						if (sProductId === "HT-6130") {
							iNbReviews = 1;
						} else {
							iNbReviews = 1 + Math.floor(Math.random() * 10);
						}
						while (iNbReviews > 0) {
							var sReviewId = aReviews.length.toString().padStart(9, "0"),
								sUserAlias = "user" + Math.floor(Math.random() * 100).toString().padStart(3, "0"),
								iScore = 1 + Math.floor(Math.random() * 5),
								iLines = 1 + Math.floor(Math.random() * 5),
								aReview = [];
							while (iLines > 0) {
								aReview.push(aReviewLines[Math.floor(Math.random() * aReviewLines.length)]);
								iLines -= 1;
							}
							aReviews.push({
								ReviewId: sReviewId,
								ProductId: sProductId,
								UserAlias: sUserAlias,
								Score: iScore,
								Review: aReview.join(""),
								__metadata: {
									uri: "/sap/opu/odata/TESTING_UI5_CART/Reviews('" + sReviewId + "')",
									type: "TESTING_UI5_CART.Review"
								}
							});
							iNbReviews -= 1;
						}
					});
					oMockServer.setEntitySetData("Reviews", aReviews);

					var aRequests = oMockServer.getRequests();

					// compose an error response for requesti
					var fnResponse = function (iErrCode, sMessage, aRequest) {
						aRequest.response = function(oXhr){
							oXhr.respond(iErrCode, {"Content-Type": "text/plain;charset=utf-8"}, sMessage);
						};
					};

					// simulate metadata errors
					if (oOptions.metadataError || oUriParameters.get("metadataError")) {
						aRequests.forEach(function (aEntry) {
							if (aEntry.path.toString().indexOf("$metadata") > -1) {
								fnResponse(500, "metadata Error", aEntry);
							}
						});
					}

					// simulate request errors
					var sErrorParam = oOptions.errorType || oUriParameters.get("errorType"),
						iErrorCode = sErrorParam === "badRequest" ? 400 : 500;
					if (sErrorParam) {
						aRequests.forEach(function (aEntry) {
							fnResponse(iErrorCode, sErrorParam, aEntry);
						});
					}

					// custom mock behaviour may be added here
					var aInvalidatedProductReviews = aProducts.map(function (oProduct) {
						return oProduct.ProductId;
					});

					function filterBadWordInReview (oXhr) {
						var oBody = JSON.parse(oXhr.requestBody),
							sReview = oBody.Review;
						if (sReview.indexOf("***") !== -1) {
							oXhr.respond(400, { "Content-Type": "application/json" }, JSON.stringify({
								"error": {
									"code": "TESTING_UI5_CART/001",
									"message": {
										"lang": "en",
										"value": "Offending words detected"
									}
								}
							}));
							return true;
						}
					}

					aRequests.push({
						method: "POST",
						path: /\bReviews\b/,
						response: function (oXhr) {
							if (filterBadWordInReview(oXhr)) {
								return true;
							}
							var oBody = JSON.parse(oXhr.requestBody);
							var aReviews = oMockServer.getEntitySetData("Reviews");
							oBody.ReviewId = aReviews.length.toString().padStart(9, "0");
							oBody.UserAlias = "You";
							aInvalidatedProductReviews.push(oBody.ProductId);
							oXhr.requestBody = JSON.stringify(oBody);
							return false;
						}
					});

					function invalidateProductOfReview (sReviewId) {
						var oReview = oMockServer.getEntitySetData("Reviews").filter(function (oCandidate) {
							return oCandidate.ReviewId === sReviewId;
						})[0];
						if (oReview) {
							aInvalidatedProductReviews.push(oReview.ProductId);
						}
					}

					aRequests.push({
						method: "MERGE",
						path: /\bReviews\b(?:\('([^']+)'\))/,
						response: function (oXhr, sReviewId) {
							if (filterBadWordInReview(oXhr)) {
								return true;
							}
							invalidateProductOfReview(sReviewId);
							return false;
						}
					});

					aRequests.push({
						method: "DELETE",
						path: /\bReviews\b(?:\('([^']+)'\))/,
						response: function (oXhr, sReviewId) {
							invalidateProductOfReview(sReviewId);
							return false;
						}
					});

					function updateProductReviews () {
						var aProducts = oMockServer.getEntitySetData("Products");
						aInvalidatedProductReviews.forEach(function (sProductId) {
							var oProduct = aProducts.filter(function (oCandidate) {
								return oCandidate.ProductId === sProductId;
							})[0],
							aProductReviews = oMockServer.getEntitySetData("Reviews").filter(function (oCandidate) {
								return oCandidate.ProductId === sProductId;
							}),
							iScore = 0,
							sUserReviewId = "";
							if (aProductReviews) {
								iScore = Math.floor(10 * aProductReviews.reduce(function (iTotalScore, oReview) {
									if (oReview.UserAlias === "You") {
										sUserReviewId = oReview.ReviewId;
									}
									return iTotalScore + oReview.Score;
								}, 0) / aProductReviews.length) / 10;
							}
							oProduct.ReviewScore = iScore;
							oProduct.UserReviewId = sUserReviewId;
						});
						oMockServer.setEntitySetData("Products", aProducts);
						aInvalidatedProductReviews = [];
					}

					aRequests.push({
						method: "GET",
						path: /\bProducts\b(?:\('[^']+'\))?/,
						response: function (/*oXhr*/) {
							updateProductReviews();
							return false;
						}
					});

					aRequests.push({
						method: "GET",
						path: /\bValidateCreditCardDetails\b\?HolderName='([^']+)'&Number='([^']+)'&Security='([^']+)'&Expiration='([^']+)'/,
						response: function (oXhr, sHolderName, sNumber, sSecurity/*, sExpiration*/) {
							oXhr.respond(200, {
								"Content-Type": "application/json;charset=utf-8"
							}, JSON.stringify({
								d: { // eslint-disable-line id-length
									IsValid: sSecurity !== "000"
								}
							}));
							return true;
						}
					});

					// set requests and start the server
					oMockServer.setRequests(aRequests);

					// Trace requests
					Object.keys(MockServer.HTTPMETHOD).forEach(function (sMethod) {
						oMockServer.attachAfter(sMethod, function (oEvent) {
							var oXhr = oEvent.getParameter("oXhr");
							console.log("MockServer", sMethod, oXhr.url, oXhr); // eslint-disable-line no-console
						});
					});

					oMockServer.start();

					Log.info("Running the app with mock data");
					fnResolve();
				});

				oManifestModel.attachRequestFailed(function () {
					var sError = "Failed to load application manifest";

					Log.error(sError);
					fnReject(new Error(sError));
				});
			});
		},

		/**
		 * @public returns the mockserver of the app, should be used in integration tests
		 * @returns {sap.ui.core.util.MockServer} the mockserver instance
		 */
		getMockServer : function () {
			return oMockServer;
		}
	};

	return oMockServerInterface;
});
