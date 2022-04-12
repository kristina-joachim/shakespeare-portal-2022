"use strict";
const { LogLevel, ConfidentialClientApplication } = require("@azure/msal-node");
//import { Client } from "@microsoft/microsoft-graph-client";
require("dotenv").config(); //
const { MSAL_CLIENT_ID, MSAL_CLIENT_SECRET, MSAL_AUTHORITY, MSAL_SCOPES, MSAL_REDIRECT_URI } = process.env;

//Authentication Config
const msalConfig = {
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
      logLevel: LogLevel.Verbose,
    },
  },
};

//Create Authentication Client
const msalClient = new ConfidentialClientApplication(msalConfig);

//Sign In Authenticator
const msalSignIn = async (scopes = OAUTH_SCOPES.split(","), redirect = OAUTH_REDIRECT_URI, client = msalClient) => {
  console.log("Requesting URL from msalClient...");

  const urlParams = {
    scopes: scopes,
    redirectUri: redirect,
  };
  const response = { status: 200, error: false, data: null, message: "" };
  console.log("Requesting URL from msalClient...");

  try {
    console.log("Requesting URL from msalClient...");

    const authURL = await client.getAuthCodeUrl(urlParams);
    console.log(authURL);

    //Authentication URL for sign in returned
    response.data = authURL;
    response.message = "Success. Redirecting for sign in";
  } catch (error) {
    response.status = 500;
    response.error = true;
    response.message = "Error getting auth URL";
    response.debug = JSON.stringify(error, Object.getOwnPropertyNames(error));
  } finally {
    return response;
  }
};

//Sign In Authenticator
const msalCallback = async (code) => {
  const tokenRequest = {
    code: req.query.code,
    scopes: OAUTH_SCOPES.split(","),
    redirectUri: OAUTH_REDIRECT_URI,
  };
  const response = { status: 200, error: false, data: null, message: "" };
  try {
    const accessToken = await msalClient.acquireTokenByCode(tokenRequest);
    response.data = accessToken;
    response.message = "Success. Received AccessToken";
  } catch (error) {
    response.status = 500;
    response.error = true;
    response.message = "Error completing authentication";
    response.debug = JSON.stringify(error, Object.getOwnPropertyNames(error));
  } finally {
    return response;
  }
};

//Sign In Authenticator
const msalSignOut = async (userID) => {
  const response = { status: 200, error: false, data: null, message: "" };
  try {
    if (userID) {
      const accnts = await msalClient.getTokenCache().getAllAccounts();
      //find user account in cache
      const userAccnt = accnts.find((accnt) => accnt.homeAccountId === userID);
      //account exists, delete
      if (userAccnt) {
        msalClient.getTokenCache().removeAccount(userAccnt);
        response.message = "User signed out.";
      } else {
        response.error = true;
        response.status = 400;
        response.message = "User Account not found.";
        response.debug = { userID, userAccnt };
      }
    } else {
      response.status = 404;
      response.error = true;
      response.message = "Requires userID to sign out.";
      response.debug = { userID };
    }
  } catch (error) {
    response.status = 500;
    response.error = true;
    response.message = "An error occurred.";
    response.debug = JSON.stringify(error, Object.getOwnPropertyNames(error));
  } finally {
    return response;
  }
};

module.exports = { msalCallback, msalSignIn, msalSignOut };
