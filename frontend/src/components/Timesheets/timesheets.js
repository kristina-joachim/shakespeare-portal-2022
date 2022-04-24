import { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { MyContext } from "../../context/Context";
import { ACTIONS, ENDPOINTS } from "../Shared/constants";
import Loading from "../Shared/Loading";
import { generateURL } from "../Shared/utils";
import Header from "../Shared/Header";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import moment from "moment";
import CheckBox from "./Checkbox";
moment().locale("en-ca");

const Timesheets = () => {
  const [payPeriod, setPayPeriod] = useState(null); //fetch payperiod based on current date.
  const {
    actions: { getServerData, dispatchAction },
  } = useContext(MyContext);

  useEffect(() => {
    //currDate 26 Dec 21 00:01 EST
    const today = moment().format("DD MMM YY HH:mm") + " EST";
    //add date as search param
    const myUrl = generateURL(ENDPOINTS.tsByDate.url, { date: today });

    getServerData(myUrl).then((results) => {
      if (results.error) dispatchAction({ type: ACTIONS.ERROR, data: { data: results, attemptedAction: "Getting today's pay period" } });
      else {
        //console.info("Setting state~", results);
        setPayPeriod({ ...results.data, total: results.total.split(" ")[0], current: results.data._id });
      }
    });
  }, []);

  useEffect(() => {
    if (payPeriod) updateData();
  }, [payPeriod]);
  const changePayPeriod = (ev) => {
    let tempState = payPeriod;
    let operation = ev.target.name;
    let currPeriodId = payPeriod._id.split("-"); ///"_id": "2022-pp-8"
    let newPeriodId = currPeriodId.pop(); //"8"

    //id ++ or --
    if (operation === "next") {
      newPeriodId++;
    } else {
      newPeriodId--;
    }

    let myID = currPeriodId.join("-").concat("-", newPeriodId);
    const myUrl = generateURL(ENDPOINTS.tsById.url, { id: myID });
    setPayPeriod(null);
    getServerData(myUrl).then((results) => {
      if (results.error) dispatchAction({ type: ACTIONS.ERROR, data: { data: results, attemptedAction: "Changing Pay Periods" } });
      else {
        //console.info("Setting state~", results);
        setPayPeriod({ ...tempState, ...results.data });
      }
    });
  };

  const updateData = (ev) => {
    if (ev) {
      let changedInput = ev.target;
      //console.log("apr23", changedInput);
      switch (changedInput.type) {
        case "datetime-local":
          updateDuration(changedInput.id);
      }
    }

    let totalDays = document.getElementById("totalDays");
    //update Days
    let days = totalDays.htmlFor.value.split(" ");
    totalDays.value = days.reduce((dateCnt, dateInput) => {
      let thatDate = document.getElementById(dateInput);
      if (moment(thatDate.value).isValid()) dateCnt.add(moment(thatDate.value).format("ll"));
      return dateCnt;
    }, new Set()).size;

    let totalHours = document.getElementById("totalHours");
    //update hours
    let hours = totalHours.htmlFor.value.split(" ");
    let isAccurate = true;
    let msg = hours
      .reduce((hourCnt, duration) => {
        let durationElmt = document.getElementById(duration);
        if (isNaN(+durationElmt.value)) isAccurate = false;
        else hourCnt += +durationElmt.value;
        return hourCnt;
      }, 0)
      .toFixed(2);

    totalHours.value = msg.concat(isAccurate ? " hours." : "hours.**");

    let totalRows = document.getElementById("totalRows");
    totalRows.innerHTML = Array.from(document.getElementById("reports").children).filter((report) => {
      return !report.classList.contains("removed");
    }).length;

    let types = document.getElementById("types");
    let summary = document.getElementById("summary");
  };

  const updateDuration = (affectedID) => {
    console.log("UPDATE DURACTIONS", affectedID);
    let affectedRow = affectedID.split("-")[1];

    let durationInput = document.getElementById(`duration-${affectedRow}`);
    let startInput = document.getElementById(`start-${affectedRow}`);
    let endInput = document.getElementById(`end-${affectedRow}`);

    let startTime = moment(startInput.value);
    let endTime = moment(endInput.value);

    if (startTime.isValid() && endTime.isValid()) {
      let duration = endTime.diff(startTime, "hours", true);
      durationInput.value = duration.toFixed(2);
    } else {
      durationInput.value = "-";
    }
    return;
  };

  return (
    <>
      <Header title={"Timesheets!"} />
      <Content>
        {payPeriod == null ? (
          <Loading />
        ) : (
          <>
            <TitleNav>
              <NavIcons name="prev" onClick={changePayPeriod}>
                <FaChevronLeft className="icon" />
              </NavIcons>
              <PayPeriodTitle>
                Pay Period #{payPeriod._id.split("-").pop()}
                <span style={{ display: payPeriod._id === payPeriod.current ? "flex" : "none" }}>Current</span>
              </PayPeriodTitle>
              <NavIcons name="next" onClick={changePayPeriod}>
                <FaChevronRight className="icon" />
              </NavIcons>
            </TitleNav>
            <InfoNav>
              <InfoItem>
                <InfoName>Start Date</InfoName>
                <InfoValue>{moment(payPeriod.start).format("ddd, ll")}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoName>Reporting Deadline</InfoName>
                <InfoValue>{moment(payPeriod.deadline).format("ddd, ll")} 6:00 PM</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoName>End Date</InfoName>
                <InfoValue>{moment(payPeriod.end).format("ddd, ll")}</InfoValue>
              </InfoItem>
            </InfoNav>
            <form name="timesheet" onLoad={updateData} onChange={updateData} onInput={updateData}>
              <Attendance>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Description</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Duration</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="reports">
                  <tr>
                    <td>1</td>
                    <td>Walmart Evals - Abbie Berger</td>
                    <td>
                      <input name="start-1" id="start-1" type="datetime-local" />
                    </td>
                    <td>
                      <input name="end-1" id="end-1" type="datetime-local" />
                    </td>
                    <td>
                      <output id="duration-1" name="duration-1" htmlFor="start-1 end-1"></output>
                    </td>
                    <td>
                      <select name="type-1" id="type-1">
                        <option value="class">Class</option>
                        <option value="cxl">Class (CXL)</option>
                        <option value="eval">Evaluation</option>
                        <option value="admin">Admin</option>
                        <option value="travel">Travel</option>
                      </select>
                    </td>
                    <td>
                      <label>
                        <input
                          type="checkbox"
                          name="checked-1"
                          id="checked-1"
                          onInput={(ev) => (ev.target.checked ? (document.querySelector("#status-1").value = "Confirmed! Thank you.") : (document.querySelector("#status-1").value = "Confirm"))}
                        />
                        <input disabled id="status-1" name="status-1" defaultValue="Confirm" />
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Walmart Evals - Lizeth Hebert</td>
                    <td>
                      <input name="start-2" id="start-2" type="datetime-local" />
                    </td>
                    <td>
                      <input name="end-2" id="end-2" type="datetime-local" />
                    </td>
                    <td>
                      <output id="duration-2" name="duration-2" htmlFor="start-2 end-2"></output>
                    </td>
                    <td>
                      <select name="type-2" id="type-2">
                        <option value="class">Class</option>
                        <option value="cxl">Class (CXL)</option>
                        <option value="eval">Evaluation</option>
                        <option value="admin">Admin</option>
                        <option value="travel">Travel</option>
                      </select>
                    </td>
                    <td>
                      <label>
                        <input
                          type="checkbox"
                          name="checked-2"
                          id="checked-2"
                          onInput={(ev) => (ev.target.checked ? (document.querySelector("#status-2").value = "Confirmed! Thank you.") : (document.querySelector("#status-2").value = "Confirm"))}
                        />
                        <input disabled id="status-2" name="status-2" defaultValue="Confirm" />
                      </label>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4}>
                      Total: <span id="totalRows"></span> reports over <output id="totalDays" name="totalDays" htmlFor="start-1 start-2 end-1 end-2"></output> days.
                    </td>
                    <td>
                      <output id="totalHours" name="totalHours" htmlFor="duration-1 duration-2"></output>
                    </td>
                    <td>
                      <output id="types" name="types" htmlFor="type-1 type-2"></output>
                    </td>
                    <td>
                      <output id="summary" name="summary" htmlFor="status-1 status-2 checked-1 checked-2"></output>
                    </td>
                  </tr>
                </tfoot>
              </Attendance>
              <SubmitBtn type="submit" disabled>
                Submit hours
              </SubmitBtn>
            </form>
          </>
        )}
      </Content>
    </>
  );
};

export default Timesheets;

const Content = styled.div`
  background: linear-gradient(to right, var(--shakes-blue1) -50%, #ffffff 110%);
  height: 100%;
  width: 100%;
  border-radius: 0 0 15px 15px;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const TitleNav = styled.div`
  margin: 10px;
  display: flex;
  font-variant: small-caps;
`;

const PayPeriodTitle = styled.h1`
  position: relative; /* for Current Tag ::after */
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  text-align: center;
  gap: 20px;

  span {
    display: flex;
    align-items: center;
    padding: 0 10px;
    height: 70%;
    font-size: 14pt;
    color: #004d00;
    border: 2px solid darkgreen;
    box-shadow: 0 0 5px 2px limegreen;
    background-color: limegreen;
    font-variant: small-caps;
    border-radius: 15px;
  }
`;

const NavIcons = styled.button`
  width: 10%;
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  .icon {
    font-size: 24pt;
  }
`;

const InfoNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  gap: 20px;
`;

const InfoItem = styled.div`
  min-width: fit-content;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InfoName = styled.h2`
  text-decoration: underline;
  white-space: nowrap;
`;

const InfoValue = styled.h2`
  font-weight: normal;
  white-space: nowrap;
`;

const Attendance = styled.table`
  border: 1px solid #ddd;
  border-collapse: collapse;
`;

const SubmitBtn = styled.button``;

const TitleRow = styled.tr``;
const ColTitle = styled.th``;
const ClassNameCol = styled.th``;
const DataCol = styled.td``;
const StudentRow = styled.tr``;
const SubTotalRow = styled.tr``;
