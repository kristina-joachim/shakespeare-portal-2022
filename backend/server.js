"use strict";
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const E_SERVER = express();
const PORT = 8000;
const { msalCallback, msalSignIn, msalSignOut } = require("./handlers");

E_SERVER.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "OPTIONS, HEAD, GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Origin", ["http://localhost:8000", "http://localhost:3000"]);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  .get("/auth/signin", async (req, res) => {
    const authResponse = await msalSignIn();
    console.log(JSON.stringify(authResponse));
    if (authResponse.error) res.status(authResponse.status).redirect("/");
    else
      res
        .append("Access-Control-Allow-Origin", ["http://localhost:8000", "http://localhost:3000"])
        .append("Access-Control-Allow-Credentials", true)
        .redirect(authResponse.data);
  })
  //
  .get("/auth/callback", async (req, res) => {
    const authResponse = await msalCallback(req.query.code);
    console.log(JSON.stringify(authResponse));
    res.status(authResponse.status).redirect("/");
  })
  //
  .get("/auth/signout", async (req, res) => {
    const authResponse = await msalSignOut(req.params.userId);
    console.log(JSON.stringify(authResponse));
    res.status(authResponse.status).redirect("/");
  })
  //
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })
  .listen(PORT, () => {
    console.info(`Listening on port ${PORT}`);
  });
