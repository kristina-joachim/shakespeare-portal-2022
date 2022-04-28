import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MyContext } from "../../context/Context";
import { ACTIONS, ENDPOINTS } from "../Shared/constants";
import Loading from "../Shared/Loading";
import { generateURL } from "../Shared/utils";
import Header from "../Shared/Header";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import EventRow from "./EventRow";
import { ActionsCol, DateCol, DurationCol, TimeCol, TypeCol, ClassNameCol } from "./styles";
import moment from "moment";
import ModifyEvent from "./ModifyEvent";
moment().locale("en-ca");

const Timesheets = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const [payPeriod, setPayPeriod] = useState(null); //fetch payperiod based on current date.
  const [periodEvents, setPeriodEvents] = useState(null);
  const [timesheet, setTimesheet] = useState({
    status: "incomplete",
    total: 0,
    count: 0,
    hours: null,
  });

  const {
    state: { authToken },
    actions: { getServerData, dispatchAction },
  } = useContext(MyContext);

  //Fetch Pay Periods
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

  //Fetch Events for Pay Period
  useEffect(() => {
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

  //Change Pay period with arrows
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

  //Fetch Events
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
        susansEvents.forEach((event) => {
          let diff = moment(event.end.dateTime).diff(event.start.dateTime);
          event.duration = moment.duration(diff).as("hours");
        });
        setPeriodEvents({ payPeriod: payPeriod._id, events: susansEvents });
        const myHours = new Array(susansEvents.length);
        setTimesheet({ ...timesheet, count: susansEvents.length, hours: myHours.fill(null) });
      }
    });
  };

  //Update calculations
  const updateData = (ev) => {
    if (ev) {
      let changedInput = ev.target;
      //console.log("apr23", changedInput);
      if (changedInput.type === "datetime-local") {
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

  //Update durations
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

  //Event Actions

  return (
    <>
      <Header title={"Timesheets!"} />
      <Content>
        {showModal && <ModifyEvent />}
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
            <FormBox name="timesheet" onLoad={updateData} onChange={updateData} onInput={updateData}>
              {periodEvents != null && periodEvents.payPeriod === payPeriod._id ? (
                <Attendance>
                  <thead>
                    <TitleRow>
                      <ClassNameCol className="ColTitle">Description</ClassNameCol>
                      <DateCol className="ColTitle">Date</DateCol>
                      <TimeCol className="ColTitle">Start-End Time</TimeCol>
                      <DurationCol className="ColTitle">Duration</DurationCol>
                      <TypeCol className="ColTitle">Type</TypeCol>
                      <ActionsCol className="ColTitle">Actions</ActionsCol>
                    </TitleRow>
                  </thead>
                  <tbody id="reports">
                    {periodEvents.events
                      .sort((a, b) => moment(a.start.dateTime).toDate() - moment(b.start.dateTime).toDate())
                      .map((event, index) => {
                        return <EventRow key={`pp-${payPeriod._id.split("-").pop()}-event-${index}`} event={event} index={index} state={[timesheet, setTimesheet]} modifyHandler={toggleModal} />;
                      })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={6}>
                        <SubmitBtn type="submit" disabled={timesheet.hours == null ? true : timesheet.hours.some((event) => event == null)}>
                          Submit hours
                        </SubmitBtn>
                      </td>
                    </tr>
                  </tfoot>
                </Attendance>
              ) : (
                <Loading />
              )}
            </FormBox>
          </>
        )}
      </Content>
    </>
  );
};

export default Timesheets;

const Content = styled.div`
  position: relative;
  background: linear-gradient(to right, var(--shakes-blue1) -50%, #ffffff 110%);
  height: 100%;
  width: 100%;
  border-radius: 0 0 15px 15px;
  display: flex;
  flex-direction: column;
  min-width: 500px;
  overflow-y: auto;
`;

const TitleNav = styled.div`
  padding: 10px;
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
  padding: 10px;
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

const FormBox = styled.form`
  padding: 10px;
  flex: 1;
`;
const Attendance = styled.table`
  margin: 10px auto;
  max-width: calc(100% - 40px);

  border: 1px solid;
  border-collapse: collapse;
  max-height: 100%;

  th,
  tr,
  td {
    border: 1px solid;
    padding: 5px;
  }

  .ColTitle {
    text-align: center;
    font-weight: bold;
    background-color: var(--shakes-blue2);
  }
`;

const SubmitBtn = styled.button``;

const TitleRow = styled.tr``;
