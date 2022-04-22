"use strict";
//NEW Router in Server
const express = require("express");
const MONGO_ROUTER = express();
const payPeriods = require("./data/paySchedule.json");
const moment = require("moment");
//Get Handlers
const { createDBdata, readDBdata, deleteDBdata, updateDBdata } = require("./crud");

MONGO_ROUTER
  /* ************************ MONGOENTICATION ENDPOINTS ************************ */
  .get("/timesheets", async (req, res) => {
    const today = req.query.date;
    // GET ALL TIMESHEETS FROM MONGO DB
    const response = await readDBdata("payCalendar", { limit: 30 });
    if (!response.error) {
      const pays = response.data;
      const currPeriod = pays.find((pay) => {
        let flag = moment(today).isBetween(pay.start, pay.end);
        //console.log(`${today} in range? [${pay.start}, ${pay.end}] ? ${flag}`);
        return flag;
      });
      response.data = currPeriod;
    }
    //Server Response
    res.status(response.status).json(response);
  })

  .get("/import", async (req, res) => {
    //Query Param to pass
    const response = await createDBdata("payCalendar", payPeriods);
    console.log(response);
    res.status(response.status).json(response);
  });

module.exports = MONGO_ROUTER;
