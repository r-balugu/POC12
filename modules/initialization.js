/**
 * Purpose: This has mobile fabric application keys to initilize MF SDK.
 * 
 */
mobileFabricConfiguration = {
    appKey: "f872e665079e2e588156aa46b48a284e",
    appSecret: "7c1c65441ef0f2963ef1ec154c2830b5",
    serviceURL: "https://100011509.auth.konycloud.com/appconfig",
    identityServices: [{
            service: "userstore",
        },
        {
            service: "FacebookIdentity"
        }
    ],
    integrationServices: [{
        service: "Store",
        operations: ["CreateUser"]
    }, {
        service: "KonyAccounts",
        operations: ["accountLogin"]
    }],
    konysdkObject: null,
    authClient: null,
    integrationObj: null,
    isKonySDKObjectInitialized: false,
    isMFAuthenticated: false
};

/**
 * Purpose: This function is to initialize the MF instance with application keys.
 * 
 */
function initializeMobileFabric() {
    kony.print(" ********** Entering into initializeMobileFabric ********** ");
    if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
        mobileFabricConfiguration.konysdkObject = new kony.sdk();
        mobileFabricConfiguration.konysdkObject.init(mobileFabricConfiguration.appKey, mobileFabricConfiguration.appSecret, mobileFabricConfiguration.serviceURL, initializeMobileFabricSuccess, initializeMobileFabricFailure);
    } else
        alert("Network unavailable. Please check your network settings. ");
}

/**
 * Purpose: This function is success callback for MF initialization.
 * 
 */
function initializeMobileFabricSuccess(response) {
    kony.print(" ********** Success initializeMobileFabricSuccess response : " + JSON.stringify(response) + " ********** ");
    mobileFabricConfiguration.isKonySDKObjectInitialized = true;
    kony.application.dismissLoadingScreen();
    kony.print(" ********** Exiting out of initializeMobileFabricSuccess ********** ");
}

/**
 * Purpose: This function is failure callback for MF initialization.
 * 
 */
function initializeMobileFabricFailure(error) {
    kony.print(" ********** Failure in initializeMobileFabric: " + JSON.stringify(error) + " ********** ");
    kony.application.dismissLoadingScreen();
    alert(" Unable to initialize the application. Please try again. ");
}