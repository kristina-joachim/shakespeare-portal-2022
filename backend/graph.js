"use strict";
//ENV variables
require("dotenv").config();
const { MSAL_SCOPES, MSAL_REDIRECT_URI } = process.env;

const graph = require("@microsoft/microsoft-graph-client");

const getAuthenticatedClient = async (msalClient, userID, userAccount) => {
  if (!msalClient || !userID) {
    throw new Error(`Invalid MSAL state. Client: ${msalClient ? "present" : "missing"}, User ID: ${userID ? "present" : "missing"}`);
  }
  console.log("Got msalClient and userID is", userAccount);

  // Initialize Graph client
  const client = graph.Client.init({
    // Implement an auth provider that gets a token
    // from the app's MSAL instance
    authProvider: async (done) => {
      try {
        // Get the user's account
        const account = await msalClient.getTokenCache().getAccountByHomeId(userID);

        if (account) {
          // Attempt to get the token silently
          // This method uses the token cache and
          // refreshes expired tokens as needed
          console.log("Got account, getting new token");

          const response = await msalClient.acquireTokenSilent({
            scopes: MSAL_SCOPES.split(","),
            redirectUri: MSAL_REDIRECT_URI,
            account,
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

  const user = await client.api("/me").select("displayName,givenName,surname,id,mail,mailboxSettings,mobilePhone,preferredLanguage,preferredName,userPrincipalName, userType").get();
  const calendars = await client.api("/me/calendars").get();
  const events = await client.api("/me//events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location").get();

  return { user, calendars, events };
};

const getCalendarView = async (msalClient, userID, userAccnt) => {
  const client = await getAuthenticatedClient(msalClient, userID, userAccnt);

  const calendarView = await client.api("me/calendarview?startdatetime=2022-04-19T16:59:26.245Z&enddatetime=2022-04-26T16:59:26.245Z").get();

  return calendarView;
};

module.exports = { getAuthenticatedClient, getUserDetails, getCalendarView };
