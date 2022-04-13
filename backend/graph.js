"use strict";
//ENV variables
require("dotenv").config();
const { MSAL_SCOPES, MSAL_REDIRECT_URI } = process.env;

const graph = require("@microsoft/microsoft-graph-client");

const getUserDetails = async (msalClient, userID) => {
  const client = getAuthenticatedClient(msalClient, userID);

  const user = await client.api("/me").select("displayName,mail,mailboxSettings,userPrincipalName").get();

  return user;
};

const getAuthenticatedClient = (msalClient, userID) => {
  if (!msalClient || !userID) {
    throw new Error(`Invalid MSAL state. Client: ${msalClient ? "present" : "missing"}, User ID: ${userID ? "present" : "missing"}`);
  }

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
          const response = await msalClient.acquireTokenSilent({
            scopes: MSAL_SCOPES.split(","),
            redirectUri: MSAL_REDIRECT_URI,
            account: account,
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

  return client;
};

const getCalendarView = async (msalClient, userId, start, end, timeZone) => {
  const client = getAuthenticatedClient(msalClient, userId);

  return (
    client
      .api("/me/calendarview")
      // Add Prefer header to get back times in user's timezone
      .header("Prefer", `outlook.timezone="${timeZone}"`)
      // Add the begin and end of the calendar window
      .query({
        startDateTime: encodeURIComponent(start),
        endDateTime: encodeURIComponent(end),
      })
      // Get just the properties used by the app
      .select("subject,organizer,start,end")
      // Order by start time
      .orderby("start/dateTime")
      // Get at most 50 results
      .top(50)
      .get()
  );
};

module.exports = { getUserDetails, getCalendarView };
