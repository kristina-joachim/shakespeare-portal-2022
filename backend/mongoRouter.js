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
    const { date, id } = req.query;
    // GET ALL TIMESHEETS FROM MONGO DB
    const filters = {
      limit: 30,
    };

    //add ID filter if passed
    if (id) filters.filter = { _id: id };

    const response = await readDBdata("payCalendar", filters);

    //filter for current date if passed
    if (date && !response.error) {
      const pays = response.data;
      const currPeriod = pays.find((pay) => {
        let flag = moment(date).isBetween(pay.start, pay.end);
        //console.log(`${date} in range? [${pay.start}, ${pay.end}] ? ${flag}`);
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
