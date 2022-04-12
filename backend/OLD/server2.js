require("dotenv").config();
const { PORT, REDIRECT_URI, VALUE, SECRET_ID } = process.env;
const msal = require("@azure/msal-node");
const express = require("express");

const clientConfig = {
  auth: {
    clientId: "3904b907-f6dd-4e09-876b-3ea53b76f9df",
    authority: "https://login.microsoftonline.com/common/",
    clientSecret: "7Vg7Q~YWAt7P1VFq4b4LS5831ehbnQPhfcLmc",
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    },
  },
};

const initialResponse = {
  status: 200,
  error: false,
  message: "",
  data: null,
};

const msalClient = new msal.ConfidentialClientApplication(clientConfig);
express()
  .use(function (req, res, next) {
    var oneof = false;
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
      next();
    }
  })
  .use("/", express.static(__dirname + "/"))

  .get("/api/signin", async (req, res) => {
    const urlCodeParams = {
      scopes: ["user.read"],
      redirectUri: REDIRECT_URI,
    };
    const authURL = await msalClient.getAuthCodeUrl(urlCodeParams);
    if (typeof authURL === "string") res.status(200).json({ error: false, data: authURL });
    else res.status(400).json({ error: true, data: authURL, message: "response was not a valid string" });
  })

  .get("/api/redirect", (req, res) => {
    const tokenParams = {
      code: req.query.code,
      redirectUri: REDIRECT_URI,
      scopes: ["user.read"],
    };
    console.log("CODE:", tokenParams.code);
    msalClient
      .acquireTokenByCode(tokenParams)
      .then((authCode) => {
        res.status(200).json({ data: { code: req.query.code, ...authCode } });
        res.redirect("/");
      })
      .catch((error) => console.log("ERROR", JSON.stringify(error)));
  })

  .listen(PORT, () => {
    console.info(`Listening on port ${PORT}`);
  });
