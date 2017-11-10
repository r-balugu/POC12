gblIDID = null;
gblDeviceInfo = kony.os.deviceInfo();


function registerPushCallBacks() {
  //loginPostShow();
  try{
    //initializeMF();
    notificationKey = kony.store.getItem("NotificationFlag");
    kony.print("notificationKey ===>" + notificationKey);
    if (notificationKey == null || notificationKey == true) {
      notificationKey = true;
      kony.store.setItem("NotificationFlag", true);
      kony.push.setCallbacks({
        onsuccessfulregistration: onSuccessfulRegisration,
        onfailureregistration: onFailureRegistration,
        onlinenotification: onlineNotification,
        offlinenotification: offlineNotification,
        onsuccessfulderegistration: onSuccessfulDeregistration,
        onfailurederegistration: onFailureDeregistration
      });
      registerAppWithPushNotificationsInfrastructure();
    } else {
      notificationKey = false;
      kony.store.setItem("NotificationFlag", false);
      kony.print("Do nothing-->> Notifications are turned off by the User");
    }
  }catch(e){
    
  }
}

function registerAppWithPushNotificationsInfrastructure() {
  try {
    //#ifdef android
    config = {
      senderid: "581331337956"           
    };
    //#endif
    //#ifdef tabrcandroid
    config = {
      senderid: "581331337956"           
    };
    //#endif
    //#ifdef iphone
    config = [0,1,2];
    //#endif
    kony.push.register(config);
  } catch (err) {
    //Call Error Handler
    
  }
}

function onSuccessfulRegisration(regId) {
  kony.print("in success reg::==== " + regId);
  var basicConf = {
    message: "Registration Successful: RegisrationID: " + regId,
    alertType: constants.ALERT_TYPE_INFO,
    alertTitle: "",
    yesLabel: "OK",
    noLabel: "",
    alertHandler: null
  }
  var pspConf = {}
  gPushRegId = regId;
  subscribeKPNS();
}

function onFailureRegistration(msg) {
  kony.print("in failure reg::" + JSON.stringify(msg));
  var basicConf = {
    message: "Registration Failure: Registration Failure Message: " + msg,
    alertType: constants.ALERT_TYPE_INFO,
    alertTitle: "",
    yesLabel: "OK",
    noLabel: "",
    alertHandler: null
  }
  var pspConf = {}
  gPushRegId = "";
}

/*
 * If the device receives a message when the application is running, callback function 'onlineNotification' is executed by the underlying platform
 * 'payload' is an Object that contains a set of key-value pairs provided by the respective Push Notification Server
 */
function onlineNotification(payload) {
  kony.print("inside onlineNotification payload is:;" + payload);
  var title ;
  var Noticontent ;
  kony.print("title-->"+payload.title);

  //#ifdef android
  title = payload["gcm.notification.title"];
  //#endif       
  //#ifdef iphone
  title = payload["alert"]["title"];
  //#endif
  //#ifdef tabrcandroid
  title = payload["gcm.notification.title"];
  //#endif
  //#ifdef ipad
  title = payload["alert"]["title"];
  //#endif


  //#ifdef android
  Noticontent = payload["gcm.notification.body"];
  //#endif       
  //#ifdef iphone
  Noticontent = payload["alert"]["body"];
  //#endif
  //#ifdef tabrcandroid
  Noticontent = payload["gcm.notification.body"];
  //#endif
  //#ifdef ipad
  Noticontent = payload["alert"]["body"];
  //#endif


  kony.print("title is::" + title);
  kony.print("content is::" + Noticontent);
  gblTitleNotification = title;
  gblContentNotification = Noticontent;
  kony.print("Received online Notification"); 
  kony.ui.Alert({
        message: gblContentNotification,
    	alertTitle: gblTitleNotification,
        alertType: constants.ALERT_TYPE_INFO,
        yesLabel: "Ok"
      }, {});
}


function offlineNotification(payload) {
  var title = payload.title;
  var Noticontent = payload.content;

  //#ifdef android
  title = payload["gcm.notification.title"];
  //#endif       
  //#ifdef iphone
  title = payload["alert"]["title"];
  //#endif
  //#ifdef tabrcandroid
  title = payload["gcm.notification.title"];
  //#endif
  //#ifdef ipad
  title = payload["alert"]["title"];
  //#endif


  //#ifdef android
  Noticontent = payload["gcm.notification.body"];
  //#endif       
  //#ifdef iphone
  Noticontent = payload["alert"]["body"];
  //#endif
  //#ifdef tabrcandroid
  Noticontent = payload["gcm.notification.body"];
  //#endif
  //#ifdef ipad
  Noticontent = payload["alert"]["body"];
  //#endif

  kony.print("title is::" + title);
  kony.print("content is::" + Noticontent);

  gblTitleNotification = title;
  gblContentNotification = Noticontent;

  alert('offline ' + gblContentNotification);
  //NotificationMFInitilize();
}

function onSuccessfulDeregistration() {

  var basicConf = {
    message: "Deregistration Successful",
    alertType: constants.ALERT_TYPE_INFO,
    alertTitle: "",
    yesLabel: "OK",
    noLabel: "",
    alertHandler: null
  }
  var pspConf = {}
  deregidterkpnspushservice();

  //var infoAlert = kony.ui.Alert(basicConf,pspConf);
  kony.print("Successful deregistration");

}

function onFailureDeregistration(payload) {

  var basicConf = {
    message: "Deregistration Failure" + payload,
    alertType: constants.ALERT_TYPE_INFO,
    alertTitle: "",
    yesLabel: "OK",
    noLabel: "",
    alertHandler: null
  }
  var pspConf = {}
  //var infoAlert = kony.ui.Alert(basicConf,pspConf);
  kony.print("UnSuccessful deregistration");
}


function subscribeKPNS() {
  try {
    kony.print("in subscribe " + gPushRegId);
    if (gPushRegId == null || gPushRegId == "") {
      alert('redId is null');
      return;
    }
    var appID = "20757-7758448819";
    var ufid = "rahul.asthana@kony.com";
    var myhttpheaders = {
      "Content-Type": "application/json"
    };
    var ostype = "android" == kony.os.deviceInfo().name ? "androidgcm" : "iphone";
    var deviceID = kony.os.deviceInfo().deviceid;
    //#ifdef ipad
    deviceID = kony.os.deviceInfo().identifierForVendor;
    //#endif
    //#ifdef iphone
    deviceID = kony.os.deviceInfo().identifierForVendor;
    //#endif


    var sub = {
      "sid": gPushRegId,
      "appId": appID,
      "ufid": ufid, //Need to change as per the business logic.
      "deviceName": ostype + "_MM",
      "osType": ostype,
      "deviceId": deviceID
    };
    var inp = {
      "subscriptionService": {
        "subscribe": sub
      }
    };
    kony.print("subscribeKPNS inputs::" + JSON.stringify(inp));
    var paramTab = {
      postdata: JSON.stringify(inp),
      httpheaders: myhttpheaders
    };
    kony.net.invokeServiceAsync("https://novartis-eu-dev.messaging.konycloud.com/subscription", paramTab, registerAppWithKPNS_CallBack);
  } catch (e) {
    kony.print("Error in subscribeKPNS::" + e);
  }
}

function registerAppWithKPNS_CallBack(status, response) {
  try {
    kony.print("inside registerAppWithKPNS_CallBack   status is::" + status + "and response::" + JSON.stringify(response));
    if (status == 400) {
      kony.print("resutl is" + response["subscriptionResponse"]);
      var resutl = response["subscriptionResponse"];
      if (resutl["ksid"] != null) {
        var ksid = resutl["ksid"]; //////Added for CSFR Token ID/////////
      }
      if (resutl["statusCode"] == 200 && resutl["ksid"] != -1) {
        // store the ksid in local storage 
        kony.store.setItem("ksid", resutl["ksid"]);
      }
    }
  } catch (e) {
    kony.print("Error in registerAppWithKPNS_CallBack::" + e);
  }
}