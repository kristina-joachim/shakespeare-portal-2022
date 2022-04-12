"use strict";
//ENV variables
require("dotenv").config();
const { SERVER_PORT } = process.env;

//Imports
const express = require("express");
const morgan = require("morgan");
const authRouter = require("./authRouter");

//Create SERVER
const EXPRESS_SERVER = express();

//Server Setup (CORS FIX, Default headers, Static files, Console logs, JSON, urlEncoding)
EXPRESS_SERVER.use(function (req, res, next) {
  var oneof = false;
  //CORS Fix..
  if (req.headers.origin) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    oneof = true;
  }
  if (req.headers["access-control-request-method"]) {
    res.header("Access-Control-Allow-Methods", req.headers["access-control-request-method"]);
    oneof = true;
  }
  if (req.headers["access-control-request-headers"]) {
    res.header("Access-Control-Allow-Headers", req.headers["access-control-request-headers"]);
    oneof = true;
  }
  if (oneof) {
    res.header("Access-Control-Max-Age", 60 * 60 * 24 * 365);
  }

  // intercept OPTIONS method
  if (oneof && req.method == "OPTIONS") {
    res.send(200);
  } else {
    res.header("Access-Control-Allow-Methods", "OPTIONS, HEAD, GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }
});
EXPRESS_SERVER.use("/", express.static(__dirname + "/"));
EXPRESS_SERVER.use(morgan("tiny"));
EXPRESS_SERVER.use(express.json());
EXPRESS_SERVER.use(express.urlencoded({ extended: false }));

//Endpoints
EXPRESS_SERVER.use("/auth/", authRouter);

//CatchAll Endpoint
EXPRESS_SERVER.get("*", (req, res) => {
  const response = {
    status: 404,
    error: true,
    message: "This was not what you were looking for... ",
    data: null,
    debug: null,
  };

  res.status(response.status).json(response);
});

//LISTEN
EXPRESS_SERVER.listen(SERVER_PORT, () => {
  console.info(`Listening on port ${SERVER_PORT}`);
});
