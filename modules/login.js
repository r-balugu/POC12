/**
 * Purpose: This function is to authenticate the user using Kony User store.
 * 
 */
function authenticateMFUsingUserStore() {
    kony.print(" ********** Entering into authenticateMFUsingUserStore ********** ");
    kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
    mobileFabricConfiguration.authClient = mobileFabricConfiguration.konysdkObject.getIdentityService(mobileFabricConfiguration.identityServices[0].service);
    var authParams = {
        "userid": frmLogin.txtUsername.text,
        "password": frmLogin.txtPwd.text
    };
    mobileFabricConfiguration.authClient.login(authParams, loginMFSuccess, loginMFFailure);
}

/**
 * Purpose: This function is success call back of login to user store.
 * @param {string} response - has details of login response.
 * 
 */
function loginMFSuccess(response) {
    kony.print(" ********** Success loginMFSuccess response : " + JSON.stringify(response) + " ********** ");
    mobileFabricConfiguration.isMFAuthenticated = true;
    kony.application.dismissLoadingScreen();
    frmMain.show();
    kony.print(" ********** Exiting out of loginMFSuccess ********** ");
}

/**
 * Purpose: This function is failure call back of login to user store.
 * @param {string} error - has error code and messages.
 * 
 */
function loginMFFailure(error) {
    kony.print(" ********** Failure in loginMFFailure: " + JSON.stringify(error) + " ********** ");
    kony.application.dismissLoadingScreen();
    if (error.details.errmsg !== undefined && error.details.errmsg !== null) {
        alert(error.details.errmsg);
    } else {
        alert("Something went wrong. Please try again");
    }
}

/**
 * Purpose: This function is to logout from the application.
 * 
 */
function logoutOnClick() {
    kony.print(" ********** Entering into initializeMobileFabric ********** ");
    if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        frmLogin.show();
    } else
        alert("Network unavailable. Please check your network settings. ");
}

/**
 * Purpose: This function is to show alert message before logout from the application.
 * 
 */
function showLogoutAlert() {
    kony.ui.Alert({
        "alertType": constants.ALERT_TYPE_CONFIRMATION,
        "alertTitle": "",
        "yesLabel": "Yes",
        "noLabel": "No",
        "message": "Are you sure you want to logout?",
        "alertIcon": "",
        "alertHandler": logoutHandler
    }, {

    });
}

/**
 * Purpose: This function is to call logout handle based on user logout confirmation.
 * 
 */
function logoutHandler(decision) {
    if (decision) {
        logoutOnClick();
    }
}

/**
 * Purpose: This function is for logout button action to trigger application logout.
 * @param {string} password - The password to check tge
 * 
 */
function btn_logout() {
    if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
        mobileFabricConfiguration.authClient = mobileFabricConfiguration.konysdkObject.getIdentityService(mobileFabricConfiguration.identityServices[0].service);
        var authParams = {};
        mobileFabricConfiguration.authClient.logout(authParams, logOutMFSuccess, logOutMFFailure);
    } else {
        alert("Network unavailable. Please check your internet connection");
    }
}

/**
 * Purpose: This function for logout success.
 * 
 */
function logOutMFSuccess(response) {
    kony.print(" ********** Success loginMF_FBSuccess response : " + JSON.stringify(response) + " ********** ");
    mobileFabricConfiguration.isMFAuthenticated = false;
    kony.application.dismissLoadingScreen();
    frmLogin.show();
}

/*
 * Purpose: This function for logout failure.
 * 
 */

function logOutMFFailure(error) {
    kony.application.dismissLoadingScreen();
}