"use strict";
//ENV variables
require("dotenv").config();
const { SERVER_PORT, SESSION_SECRET, MONGO_URI, MSAL_AUTHORITY, MSAL_CLIENT_ID, MSAL_CLIENT_SECRET } = process.env;

//Imports
const msal = require("@azure/msal-node");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const morgan = require("morgan");
const authRouter = require("./authRouter");
const mongoRouter = require("./mongoRouter");

//MongoClient OPtions
const mongoClient_options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Authentication Config
const clientConfig = {
  auth: {
    clientId: MSAL_CLIENT_ID,
    clientSecret: MSAL_CLIENT_SECRET,
    authority: MSAL_AUTHORITY,
  },
  cache: {
    cacheLocation: "localStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        //console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    },
  },
};

//Create SERVER
const EXPRESS_SERVER = express();

//Server Setup (CORS FIX, Default headers, Static files, Console logs, JSON, urlEncoding)

EXPRESS_SERVER.use("/", express.static(__dirname + "/"));
EXPRESS_SERVER.use(morgan("tiny"));
EXPRESS_SERVER.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      mongoOptions: mongoClient_options,
    }),
    unset: "destroy",
  })
);
EXPRESS_SERVER.use(express.json());
EXPRESS_SERVER.use(express.urlencoded({ extended: false }));
EXPRESS_SERVER.use(function (req, res, next) {
  //Session Constants
  //Create Authentication Client
  req.session.msalClient = new msal.ConfidentialClientApplication(clientConfig);
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
//Endpoints
EXPRESS_SERVER.use("/auth/", authRouter);
EXPRESS_SERVER.use("/crud/", mongoRouter);

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
