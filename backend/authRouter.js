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
    const response = await microsoft.getAuthURL();
    console.log(response);
    //Server Response
    res.status(response.status).json(response);
  })

  .get("/redirect", async (req, res) => {
    //Query Param to pass
    const authCode = req.query.code;

    // GET Response
    const response = await microsoft.getAuthToken(authCode);

    //Server Response
    res.status(response.status).json(response);
  })
  .get("/signout", async (req, res) => {
    //Query Param to pass
    const userID = req.query.user;

    // GET Response
    const response = await microsoft.signOut(userID);

    //Server Response
    res.status(response.status).json(response);
  });

module.exports = AUTH_ROUTER;
