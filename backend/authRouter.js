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
    const rresponse = await microsoft.getAuthToken(authCode);
    console.log("GOT AUTH TOKEN", rresponse);
    //Server Response
    res.status(rresponse.status).json(rresponse);
  })
  .get("/signout", async (req, res) => {
    //Query Param to pass
    const userID = req.query.user;
    console.log("USER ID =", userID);
    // GET Response
    const rrresponse = await microsoft.signOut(userID);
    console.log("SIGNED OUT", rrresponse);

    //Server Response
    res.status(rrresponse.status).json(rrresponse);
  });

module.exports = AUTH_ROUTER;
