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
  const [periodEvents, setPeriodEvents] = useState(null);

  const {
    state: { authToken },
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

  const changePayPeriod = (ev) => {
    let myElement = ev.target;

    while (myElement.tagName !== "BUTTON") {
      let parent = myElement.parentElement;
      myElement = parent;
    }

    let operation = myElement.name;
    let tempState = payPeriod;
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
    setPeriodEvents(null);

    getServerData(myUrl).then((results) => {
      if (results.error) dispatchAction({ type: ACTIONS.ERROR, data: { data: results, attemptedAction: "Changing Pay Periods" } });
      else {
        //console.info("Setting state~", results);
        setPayPeriod({ ...tempState, ...results.data });
      }
    });
  };

  useEffect(() => {
    console.info("EVENTS", periodEvents);
    console.info("PAY PERIOD", payPeriod);

    //got period?
    if (payPeriod != null) {
      //gotEvents ?
      if (periodEvents != null) {
        //yes, need to be updated?
        if (payPeriod._id !== periodEvents.payPeriod) getEvents();
      } else {
        //no, fetch
        getEvents();
      }
    }
  }, [payPeriod]);

  const getEvents = () => {
    const startDateTime = moment(payPeriod.start).startOf("day").toISOString();
    const endDateTime = moment(payPeriod.end).endOf("day").toISOString();

    //Add params to URL
    const myUrl = generateURL(ENDPOINTS.calendarEvents.url, {
      endDateTime,
      startDateTime,
      $top: 1000,
      $count: true,
      calID: "AAMkADgzMmI5NGJiLWMxNWEtNDcyZC1iOGQ0LTVhODQ1MmQ1NzE5OQBGAAAAAADgl6AeKG8zQK8ZTKRR-fiwBwAKy6jAHRCJSqS2n-NMHj8VAAAAAAEGAAAKy6jAHRCJSqS2n-NMHj8VAACPQENfAAA=",
    });
    console.log("MY URL", myUrl);
    //Add Authentication to headers
    let myOptions = ENDPOINTS.calendarEvents.options;
    myOptions.headers.Authorization = authToken.accessToken;

    //Fetch Data
    getServerData(myUrl, myOptions).then((results) => {
      if (results.error) dispatchAction({ type: ACTIONS.ERROR, data: { data: results, attemptedAction: "Getting today's calendarView" } });
      else {
        let payPeriodEvents = results.value;
        const susansEvents = payPeriodEvents.filter((event) => {
          return event.attendees.find((attendee) => {
            return attendee.emailAddress.address === "SusanP@ecoleshakespeare.com";
          });
        });
        console.log("FILTER EVENTS", susansEvents);
        setPeriodEvents({ payPeriod: payPeriod._id, events: susansEvents });
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

    /* let totalDays = document.getElementById("totalDays");
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
    let summary = document.getElementById("summary"); */
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
              {periodEvents != null && periodEvents.payPeriod === payPeriod._id ? (
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
                    {periodEvents.events.map((event, index) => {
                      return (
                        <tr key={`pp-${payPeriod._id.split("-").pop()}-event-${index}`} id={`duration-${index}`}>
                          <td>{index}</td>
                          <td>{event.subject}</td>
                          <td>
                            <input name={`start-${index}`} id={`start-${index}`} type="datetime-local" defaultValue={event.start.dateTime.toString()} />
                          </td>
                          <td>
                            <input name={`end-${index}`} id={`end-${index}`} type="datetime-local" defaultValue={event.end.dateTime} />
                          </td>
                          <td>
                            <output name={`duration-${index}`} id={`duration-${index}`} htmlFor={`start-${index} end-${index}`}></output>
                          </td>
                          <td>
                            <select name={`type-${index}`} id={`type-${index}`}>
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
                                name={`checked-${index}`}
                                id={`checked-${index}`}
                                onInput={(ev) =>
                                  ev.target.checked ? (document.querySelector(`#status-${index}`).value = "Confirmed! Thank you.") : (document.querySelector(`#status-${index}`).value = "Confirm")
                                }
                              />
                              <input disabled name={`status-${index}`} id={`status-${index}`} defaultValue="Confirm" />
                            </label>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={4}>
                        Total: <span id="totalRows"></span> reports over <output id="totalDays" name="totalDays" htmlFor=""></output> days.
                      </td>
                      <td>
                        <output id="totalHours" name="totalHours" htmlFor=""></output>
                      </td>
                      <td>
                        <output id="types" name="types" htmlFor=""></output>
                      </td>
                      <td>
                        <output id="summary" name="summary" htmlFor=""></output>
                      </td>
                    </tr>
                  </tfoot>
                </Attendance>
              ) : (
                <Loading />
              )}
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
  overflow-y: auto;
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
  margin: 10px 0 20px;
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
  margin: 10px;
  width: calc(100% - 20px);
  border: 1px solid;
  border-collapse: collapse;
  max-height: 100%;

  th,
  tr,
  td {
    border: 1px solid;
    padding: 5px;
    text-align: center;
    vertical-align: center;
  }
`;

const SubmitBtn = styled.button``;

const TitleRow = styled.tr``;
const ColTitle = styled.th``;
const ClassNameCol = styled.th``;
const DataCol = styled.td``;
const StudentRow = styled.tr``;
const SubTotalRow = styled.tr``;
