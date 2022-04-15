"use strict";
//ENV variables
require("dotenv").config();
const { MSAL_SCOPES, MSAL_REDIRECT_URI } = process.env;

const graph = require("@microsoft/microsoft-graph-client");

const getAuthenticatedClient = async (msalClient, userID, userAccount) => {
  if (!msalClient || !userID) {
    throw new Error(`Invalid MSAL state. Client: ${msalClient ? "present" : "missing"}, User ID: ${userID ? "present" : "missing"}`);
  }
  console.log("Got msalClient and userID is", userID);

  // Initialize Graph client
  const client = graph.Client.init({
    // Implement an auth provider that gets a token
    // from the app's MSAL instance
    authProvider: async (done) => {
      try {
        // Get the user's account
        if (userAccount) {
          // Attempt to get the token silently
          // This method uses the token cache and
          // refreshes expired tokens as needed
          console.log("Got account, getting new token");

          const response = await msalClient.acquireTokenSilent({
            scopes: MSAL_SCOPES.split(","),
            redirectUri: MSAL_REDIRECT_URI,
            account: userAccount,
          });

          // First param to callback is the error,
          // Set to null in success case
          done(null, response.accessToken);
        }
      } catch (err) {
        console.log(JSON.stringify(err, Object.getOwnPropertyNames(err)));
        done(err, null);
      }
    },
  });
  console.log("Got client", client);

  return client;
};

const getUserDetails = async (msalClient, userID, userAccnt) => {
  const client = await getAuthenticatedClient(msalClient, userID, userAccnt);

  const user = await client.api("/me").select("displayName,mail,mailboxSettings,userPrincipalName").get();

  return user;
};

const getUserCalendar = async (msalClient, userID) => {
  const client = await getAuthenticatedClient(msalClient, userID, userAccnt);

  const calendar = await client.api("/me/calendars").get();

  return calendar;
};

module.exports = { getAuthenticatedClient, getUserDetails, getUserCalendar };
