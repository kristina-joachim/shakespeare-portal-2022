"use strict";

//NEW Router in Server
const express = require("express");
const CALENDAR_ROUTER = express();

//Get Handlers
const microsoft = require("./msal");
const graph = require("./graph");

CALENDAR_ROUTER
  /* ************************ CALENDAR ENDPOINTS ************************ */
  .get("/", async (req, res) => {
    // GET Response
    const response = await microsoft.getAuthURL();
    console.log(response);
    //Server Response
    res.status(response.status).json(response);
  });

module.exports = CALENDAR_ROUTER;
