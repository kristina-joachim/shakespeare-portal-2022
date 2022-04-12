"use strict";
//ENV variables
require("dotenv").config();
const { MSAL_CLIENT_ID, MSAL_CLIENT_SECRET, MSAL_AUTHORITY, MSAL_SCOPES, MSAL_REDIRECT_URI } = process.env;

//IMPORTS
const msal = require("@azure/msal-node");
const { initialResponse } = require("./constants");

//Authentication Config
const clientConfig = {
  auth: {
    clientId: MSAL_CLIENT_ID,
    clientSecret: MSAL_CLIENT_SECRET,
    authority: MSAL_AUTHORITY,
  },
  /*   cache: {
    cacheLocation: "sessionStorage",
  }, */
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    },
  },
};

//Create Authentication Client
const msalClient = new msal.ConfidentialClientApplication(clientConfig);

//Authentication Params
const authParams = {
  scopes: MSAL_SCOPES.split(","),
  redirectUri: MSAL_REDIRECT_URI,
};

/* ************************ MSAL HANDLERS ************************ */
const getAuthURL = async () => {
  //init Response
  const myResponse = {};
  try {
    //Get Auth URL
    const authURL = await msalClient.getAuthCodeUrl(authParams);
    console.log("Getting AUTH URL", authURL);

    //Confirm got URL
    if (typeof authURL === "string") {
      myResponse.status = 200;
      myResponse.error = false;
      myResponse.message = "Got Authentication URL";
      myResponse.redirectURL = authURL;
    } else {
      myResponse.status = 500;
      myResponse.error = true;
      myResponse.message = "Response was not a valid string";
      myResponse.debug = authURL;
    }
  } catch (error) {
    myResponse.status = 500;
    myResponse.error = true;
    myResponse.message = error.message;
    myResponse.debug = error;
  } finally {
    return myResponse;
  }
};

const getAuthToken = async (code) => {
  //init Response
  const myResponse = {};
  try {
    //Get Auth Token from Code
    const authToken = await msalClient.acquireTokenByCode({ code, ...authParams });
    console.log("Getting TOKEN", authToken);
    if (authToken.account.homeAccountId) {
      myResponse.status = 200;
      myResponse.error = false;
      myResponse.message = "Got Authentication Token";
      myResponse.data = authToken;
    } else {
      myResponse.status = 404;
      myResponse.error = true;
      myResponse.message = "No user ID found in token response";
      myResponse.debug = authToken;
    }
  } catch (error) {
    myResponse.status = 500;
    myResponse.error = true;
    myResponse.message = error.message;
    myResponse.debug = error;
  } finally {
    return myResponse;
  }
};

const signOut = async (userID) => {
  //init Response
  const myResponse = initialResponse;

  try {
    //User to sign out?
    if (userID) {
      //Find users account in list
      const accounts = await msalClient.getTokenCache().getAllAccounts();
      const userAccnt = accounts.find((accnt) => accnt.homeAccountId === userID);

      //Found user?
      if (userAccnt) {
        //Yes, remove
        const removed = await msalClient.getTokenCache().removeAccount(userAccnt);
        myResponse.message = `User ${userID} signed out.`;
        myResponse.data = removed;
      } else {
        //invalid userid
        myResponse.status = 404;
        myResponse.error = true;
        myResponse.message = "Could not find a user with that ID.";
        myResponse.debug = userID;
      }
    } else {
      //please pass a userID
      myResponse.status = 400;
      myResponse.error = true;
      myResponse.message = "Requires the userID of the account to sign out";
      myResponse.debug = userID;
    }
  } catch (error) {
    myResponse.status = 500;
    myResponse.error = true;
    myResponse.message = error.message;
    myResponse.debug = error;
  } finally {
    return myResponse;
  }
};

module.exports = { getAuthURL, getAuthToken, signOut };
