"use strict";
//NEW Router in Server
const express = require("express");
const AUTH_ROUTER = express();

//Get Handlers
const microsoft = require("./msal");
const graph = require("./graph");

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
    const response = await microsoft.getAuthToken(authCode, req.session.msalClient);
    if (!response.error) {
      const user = response.data.authToken.account;
      req.session.userID = user.homeAccountId;
      if (!req.session.accounts) req.session.accounts = {};
      req.session.accounts[user.homeAccountId] = user;
      //console.log("SAVED SESSION Data", req.session);
    }
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
  });

module.exports = AUTH_ROUTER;
