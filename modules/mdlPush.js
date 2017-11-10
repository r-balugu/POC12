//Type your code here
//Type your code here
mobileFabricConfiguration = 
  {
  appKey:"f872e665079e2e588156aa46b48a284e", 
  appSecret:"7c1c65441ef0f2963ef1ec154c2830b5", 
  serviceURL:"https://100011509.auth.konycloud.com/appconfig",
  identityServices: 
  [
    {
      service:"userstore",
      username:"Novartis.Europe@kony.com",
      password: "Default@1234"
    },
    {
      service:"FacebookIdentity"
    }
  ],
  konysdkObject: null,
  authClient: null,
  integrationServices:[{
    service: "KonyAccounts",
    operations: ["accountLogin"]	
  },{
    service: "PushOrchestration",
    operations: ["PushBroadCastMsg"]
  }],
  integrationObj: null,
  isKonySDKObjectInitialized:false,
  isMFAuthenticated: false
};

function initializeMobileFabric()
{
  kony.print (" ********** Entering into initializeMobileFabric ********** ");
  if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY))
  {
    kony.application.showLoadingScreen("loadskin","Initializing",constants.LOADING_SCREEN_POSITION_FULL_SCREEN , true,true,{enableMenuKey:true,enableBackKey:true, progressIndicatorColor : "ffffff77"});
    mobileFabricConfiguration.konysdkObject = new kony.sdk();
    mobileFabricConfiguration.konysdkObject.init(mobileFabricConfiguration.appKey,mobileFabricConfiguration.appSecret,mobileFabricConfiguration.serviceURL,initializeMobileFabricSuccess,initializeMobileFabricFailure);  
  }
  else
    alert ("Network unavailable. Please check your network settings. ");
  kony.print (" ********** Exiting out of initializeMobileFabric ********** ");
}

function initializeMobileFabricSuccess(response)
{
  kony.print (" ********** Entering into initializeMobileFabricSuccess ********** ");
  kony.print (" ********** Success initializeMobileFabricSuccess response : " + JSON.stringify(response) + " ********** ");
  mobileFabricConfiguration.isKonySDKObjectInitialized=true;
  kony.application.dismissLoadingScreen();
  //authenticateMFUsingUserStore();
  kony.print (" ********** Exiting out of initializeMobileFabricSuccess ********** ");
}

function initializeMobileFabricFailure(error)
{
  kony.print (" ********** Entering into initializeMobileFabricFailure ********** ");
  kony.print (" ********** Failure in initializeMobileFabric: " + JSON.stringify(error) + " ********** ");
  kony.application.dismissLoadingScreen();
  alert (" Unable to initialize the application. Please try again. ");
  kony.print (" ********** Exiting out of initializeMobileFabricFailure ********** ");
}

function authenticateMFUsingUserStore(){
  kony.print (" ********** Entering into authenticateMFUsingUserStore ********** ");
  kony.application.showLoadingScreen("loadskin","Fetching news !!!",constants.LOADING_SCREEN_POSITION_FULL_SCREEN , false,true,{enableMenuKey:true,enableBackKey:true, progressIndicatorColor : "ffffff77"});
  mobileFabricConfiguration.authClient = mobileFabricConfiguration.konysdkObject.getIdentityService(mobileFabricConfiguration.identityServices[0].service);
  var authParams = {"userid": frmLogin.txtUsername.text, 
                    "password": frmLogin.txtPwd.text};
  mobileFabricConfiguration.authClient.login(authParams, loginMFSuccess, loginMFFailure);
  kony.print (" ********** Exiting out of authenticateMFUsingUserStore ********** ");
}

function loginMFSuccess(response){
  mobileFabricConfiguration.isMFAuthenticated = true;
  kony.application.dismissLoadingScreen();
  frmMain.show();
  frmMain.lblMail.text = frmLogin.txtUsername.text;
}

function loginMFFailure(error)
{
  kony.application.dismissLoadingScreen();
  alert (" Unable to authenticate to Server, Login failed. Please try again. ");
}

function getClaimToken() {
  if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
      kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);

    mobileFabricConfiguration.integrationObj = mobileFabricConfiguration.konysdkObject.getIntegrationService(mobileFabricConfiguration.integrationServices[0].service);

    var operationName = mobileFabricConfiguration.integrationServices[0].operations[0];

    var headers = {"Content-Type": "application/json"};
    var data = {
      "userid": "raju.balugu@kony.com",
      "password": "May@2017~1"
    };

    mobileFabricConfiguration.integrationObj.invokeOperation(operationName, headers, data, getClaimTokenSuccessCallback, getClaimTokenErrorCallback);
    

  }
  else
  {
    alert("Network unavailable. Please check your network settings. ");
  }
}

function getClaimTokenSuccessCallback(response){
  kony.application.dismissLoadingScreen();
  alert("Messages successfully sent to all subscribed devices");
}

function getClaimTokenErrorCallback(response){
  kony.application.dismissLoadingScreen();
  alert("Failed to send message.Please try again.");
}

function pushMessage(text){
  if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
    kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);

    mobileFabricConfiguration.integrationObj = mobileFabricConfiguration.konysdkObject.getIntegrationService(mobileFabricConfiguration.integrationServices[1].service);

    var operationName = mobileFabricConfiguration.integrationServices[1].operations[0];
    var headers = {
      "X-Kony-Authorization":""
    }; 
    var data = {
      "PMsg":text
    };
    mobileFabricConfiguration.integrationObj.invokeOperation(operationName, headers, data, getClaimTokenSuccessCallback, getClaimTokenErrorCallback);
  }
  else
  {
    alert("Network unavailable. Please check your network settings. ");
  }
}

function addUser(){
  if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)) {
    kony.application.showLoadingScreen("", "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);

    mobileFabricConfiguration.integrationObj = mobileFabricConfiguration.konysdkObject.getIntegrationService("Store");

    var operationName = "CreateUser";
    var headers = {
      "X-Kony-Authorization":""
    }; 
    var data = {
      "userid":"test.rahul@kony.com",
      "password":"text1234"
    };
    mobileFabricConfiguration.integrationObj.invokeOperation(operationName, headers, data, addUserSuccessCallBack, addUserErrorCallBack);
  }
  else
  {
    alert("Network unavailable. Please check your network settings. ");
  }
}

function addUserSuccessCallBack(response){
  alert("Success " + JSON.stringify(response))
}

function addUserErrorCallBack(response){
  alert("Error " + JSON.stringify(response))
}

