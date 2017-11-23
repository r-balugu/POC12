/**
 * Purpose: This function to claims token to pass composite service to push the message.
 * 
 */
function getClaimToken() {
    if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
        mobileFabricConfiguration.integrationObj = mobileFabricConfiguration.konysdkObject.getIntegrationService(mobileFabricConfiguration.integrationServices[0].service);
        var operationName = mobileFabricConfiguration.integrationServices[0].operations[0];
        var headers = {
            "Content-Type": "application/json"
        };
        mobileFabricConfiguration.integrationObj.invokeOperation(operationName, headers, getClaimTokenSuccessCallback, getClaimTokenErrorCallback);
    } else {
        alert("Network unavailable. Please check your network settings. ");
    }
}

/**
 * Purpose: Success callback of getClaimToken.
 * 
 */

function getClaimTokenSuccessCallback(response) {
    kony.application.dismissLoadingScreen();
    alert("Messages successfully sent to all subscribed devices");
}

/**
 * Purpose: Failure callback of getClaimToken.
 * 
 */

function getClaimTokenErrorCallback(response) {
    kony.application.dismissLoadingScreen();
    alert("Failed to send message.Please try again.");
}

/**
 * Purpose: This function to push the message using integration service.
 * 
 */

function pushMessage(text) {
    if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
        mobileFabricConfiguration.integrationObj = mobileFabricConfiguration.konysdkObject.getIntegrationService(mobileFabricConfiguration.integrationServices[1].service);
        var operationName = mobileFabricConfiguration.integrationServices[1].operations[0];
        var headers = {
            "X-Kony-Authorization": ""
        };
        var data = {
            "PMsg": text
        };
        mobileFabricConfiguration.integrationObj.invokeOperation(operationName, headers, data, getClaimTokenSuccessCallback, getClaimTokenErrorCallback);
    } else {
        alert("Network unavailable. Please check your network settings. ");
    }
}