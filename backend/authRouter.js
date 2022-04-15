"use strict";

//NEW Router in Server
const express = require("express");
const AUTH_ROUTER = express();

//Get Handlers
const microsoft = require("./msal");

AUTH_ROUTER
  /* ************************ AUTHENTICATION ENDPOINTS ************************ */
  .get("/signin", async (req, res) => {
    // GET Response
    const response = await microsoft.getAuthURL(req.session.msalClient);
    //console.log(response);
    //Server Response
    res.status(response.status).json(response);
  })

  .get("/redirect", async (req, res) => {
    //Query Param to pass
    const authCode = req.query.code;

    // GET Response
    const { response, userID, userAccnt } = await microsoft.getAuthToken(authCode, req.session.msalClient);
    
    req.session.userID = userID;
    if (req.session.accounts) req.session.accounts[userID] = userAccnt;
    else req.session.accounts = { userID: userAccnt };
    //console.log("GOT AUTH TOKEN", response);

    //Server Response
    res.status(response.status).json(response);
  })
  .get("/signout", async (req, res) => {
    //Query Param to pass
    const userID = req.session.userID;
    //console.log("USER ID =", userID);
    // GET Response
    const response = await microsoft.signOut(userID, req.session.msalClient);

    req.session.destroy(function (err) {
      response.warning = `ERROR while destroying user session: ${err}`;
    });
    //console.log("SIGNED OUT", response);

    //Server Response
    res.status(response.status).json(response);
  })
  .get("/calendar", async (req, res) => {
    const userID = req.session.userID;
    const response = await microsoft.getMyCalendar(userID.req.session.msalClient);
    res.status(response.status).json(response);
  });

module.exports = AUTH_ROUTER;
