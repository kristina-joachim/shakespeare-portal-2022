"use strict";

//NEW Router in Server
const express = require("express");
const CALENDAR_ROUTER = express();

//Get Handlers
const graph = require("./graph");

CALENDAR_ROUTER
  /* ************************ CALENDAR ENDPOINTS ************************ */
  .get("/*", async (req, res) => {
    // GET Response
    console.log("Creating Graph CLIENT");
    const client = await graph.getAuthenticatedClient(req.session.msalClient, req.session.userID, req.session.accounts[req.session.userID]);
    console.log("Getting Marias Calendar");

    const maria = await client.api("/users/maria@ecoleshakespeare.com/calendars").get();
    console.log("Getting my Calendar");

    const me = await client.api("/me/calendars").get();
    let status = Math.max(+me.status, +maria.status);
    let error = maria.error || me.error;
    const response = { status, error, data: { maria, me } };

    console.log(response);
    //Server Response
    res.status(response.status).json(response);
  });

module.exports = CALENDAR_ROUTER;
