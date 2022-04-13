"use strict";
//ENV variables
require("isomorphic-fetch");
require("dotenv").config();
const { MSAL_CLIENT_ID, MSAL_CLIENT_SECRET, MSAL_AUTHORITY, MSAL_SCOPES, MSAL_REDIRECT_URI } = process.env;
//IMPORTS
const msal = require("@azure/msal-node");
const { initialResponse } = require("./constants");
const { deleteDBdata, createDBdata, readDBdata, updateDBdata } = require("./crud");
const graph = require("./graph");
//Authentication Config
const clientConfig = {
  auth: {
    clientId: MSAL_CLIENT_ID,
    clientSecret: MSAL_CLIENT_SECRET,
    authority: MSAL_AUTHORITY,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
    secureCookies: false,
  },
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
  let myResponse = {};
  let userID;
  try {
    //Get Auth Token from Code
    const authToken = await msalClient.acquireTokenByCode({ code, ...authParams });
    console.log("Getting TOKEN", authToken);
    userID = authToken.account.homeAccountId;

    if (userID) {
      const user = await graph.getUserDetails(msalClient, userID);
      if (user) {
        myResponse.status = 200;
        myResponse.error = false;
        myResponse.message = "Got Authentication Token and User.";
        myResponse.data = { authToken, user };
        const crud = await createDBdata("main", {
          _id: userID,
          authToken,
          user,
        });

        if (crud.error) {
          return { ...crud, message: "Got Authentication Token. Could not save to DB", authToken };
        } else {
          myResponse.message += " Saved in DB";
          myResponse.crud = crud;
        }
      } else {
        myResponse.status = 404;
        myResponse.error = true;
        myResponse.message = "No data found in user response";
        myResponse.debug = user;
      }
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
  const cacheResponse = initialResponse;
  let myResponse = initialResponse;
  try {
    //User to sign out?
    if (userID) {
      //Remove from DB
      const main = await readDBdata("main", { filter: { _id: userID } });
      console.log(main);
      myResponse = await deleteDBdata("main", { _id: userID });

      //Find users account in list
      const accounts = await msalClient.getTokenCache().getAllAccounts();
      console.log("accounts", accounts);
      const userAccnt = accounts.find((accnt) => accnt.homeAccountId === userID);

      //Found user?
      if (userAccnt) {
        //Yes, remove
        const removed = await msalClient.getTokenCache().removeAccount(userAccnt);
        cacheResponse.message = `User ${userID} signed out.`;
        cacheResponse.data = removed;
      } else {
        //invalid userid
        cacheResponse.status = 404;
        cacheResponse.error = true;
        cacheResponse.message = "Could not find a user with that ID.";
        cacheResponse.debug = userID;
      }
      myResponse.cache = cacheResponse;
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
