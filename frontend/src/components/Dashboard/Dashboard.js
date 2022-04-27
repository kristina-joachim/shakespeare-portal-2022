import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MyContext } from "../../context/Context";
import Alert from "../Alert";
import AlertBack from "../Alert/AlertBack";

import Calendar from "../Calendar";
import { ACTIONS, ENDPOINTS } from "../Shared/constants";
import Header from "../Shared/Header";
import moment from "moment";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Loading from "../Shared/Loading";
import { generateURL } from "../Shared/utils";
moment().locale("en-ca");

const Dashboard = () => {
  const {
    state: { authToken, today },
    actions: { getServerData, dispatchAction },
  } = useContext(MyContext);
  const [alerts, setAlerts] = useState(null);
  const [cal, setCal] = useState(null);
  const [fullCal, setFullCal] = useState(null);
  const [allLoaded, setAllLoaded] = useState(false);

  //Set current TIME
  useEffect(() => {
    //is reporting deadline in the next 2 days?
    //currDate 26 Dec 21 00:01 EST
    const today = moment().format("DD MMM YY HH:mm") + " EST";
    const tempState = new Set();
    //add date as search param
    const myUrl = generateURL(ENDPOINTS.tsByDate.url, { date: today });

    getServerData(myUrl).then((results) => {
      if (results.error) dispatchAction({ type: ACTIONS.ERROR, data: { data: results, attemptedAction: "Getting today's pay period" } });
      else {
        let deadline = moment(results.data.deadline);
        let timeDiff = moment.duration(deadline.diff(today));
        let title = "Timesheets: Hours reporting deadline";
        let text;

        if (timeDiff < 0) {
          // under 0 >> PASSED
          text = `Warning!! Your timesheets are overdue! You may not get paid on time. Please submit them as soon as possible`;
        } else if (timeDiff.as("minutes") < 60) {
          // 0 - 60 minutes >> HURRY UP!!
          text = `Warning!! Your timesheets are due in ${timeDiff.humanize(true)}! Please submit them as soon as possible`;
        } else if (timeDiff.as("hours") < 24) {
          // 24 - 12 hours >> Today!
          text = `Your timesheets are due later today. Please submit them before ${deadline.format("lt")}!`;
        } else if (timeDiff.as("hours") >= 24) {
          //  24+ hours >> In X days
          text = `Your timesheets are due in ${timeDiff.humanize(true)}!`;
        }
        tempState.add({ title, text, link: "/timesheets" });
        setAlerts(tempState);
      }
    });
    // add to Alerts.
    setCal({ today: moment(), current: moment() });
    //getToday's events
  }, []);

  //Get Todays events
  useEffect(() => {
    if (cal?.today != null) {
      const startDateTime = cal.today.startOf("day").toISOString();
      const endDateTime = cal.today.endOf("day").toISOString();

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
          let todaysEvents = results.value;
          const susansEvents = todaysEvents.filter((event) => {
            return event.attendees.find((attendee) => {
              return attendee.emailAddress.address === "SusanP@ecoleshakespeare.com";
            });
          });
          console.log("FILTER EVENTS", susansEvents);
          dispatchAction(ACTIONS.TODAYS_EVENTS, susansEvents);
        }
      });
    }
  }, [cal?.today]);

  //Generate Calendar
  useEffect(() => {
    if (cal != null) getCalendar(cal);
  }, [cal]);

  //Change months
  const changeMonth = (ev) => {
    let myElement = ev.target;

    while (myElement.tagName !== "BUTTON") {
      let parent = myElement.parentElement;
      myElement = parent;
    }

    let operation = myElement.name;
    let tempState = cal;

    //id ++ or --
    if (operation === "next") {
      tempState.current.add(1, "M");
    } else {
      tempState.current.subtract(1, "M");
    }

    if (tempState.current.month() === tempState.today.month()) tempState.current.date(tempState.today.date);
    else tempState.current.date(1);

    setCal({ ...cal, ...tempState });
    return;
  };

  //Generate Calendar
  const getCalendar = (tempState) => {
    let startDay = tempState.current.clone().startOf("month").startOf("week");
    let endDay = tempState.current.clone().endOf("month").endOf("week");
    const myCalendar = [];

    let date = startDay.clone().subtract(1, "day");

    while (date.isBefore(endDay, "day")) {
      myCalendar.push({
        days: Array(7)
          .fill(0)
          .map(() => date.add(1, "day").clone()),
      });
    }
    setFullCal(myCalendar);
  };

  //Flag when all is loaded
  useEffect(() => {
    if (fullCal != null && today != null && alerts != null) setAllLoaded(true);
    else setAllLoaded(false);
  }, [fullCal, today]);

  return (
    <>
      <Header title={"Dashboard"} />
      {allLoaded ? (
        <Content>
          <FloatBoxes>
            <FlexCol className="classes">
              <FloatBox className="alerts">
                <AlertBack />
                <BoxTitle>Alerts</BoxTitle>
                <BoxContent>
                  {alerts.size
                    ? Array.from(alerts.values()).map((alert, i) => {
                        return alert.dismissed == null && <Alert key={`alert-${i}`} id={`alert-${i}`} title={alert.title} text={alert.text} link={alert.link} />;
                      })
                    : "No alerts."}
                </BoxContent>
              </FloatBox>

              <FloatBox>
                <BoxTitle>Classes</BoxTitle>
                <BoxContent>{<Calendar />}</BoxContent>
              </FloatBox>
            </FlexCol>
            <FlexCol className="calendar">
              <FloatBox>
                <>
                  <BoxTitle>
                    <NavIcons name="prev" onClick={changeMonth}>
                      <FaChevronLeft className="icon" />
                    </NavIcons>
                    <span>{cal.current.format("MMMM YYYY")}</span>
                    <NavIcons name="next" onClick={changeMonth}>
                      <FaChevronRight className="icon" />
                    </NavIcons>
                  </BoxTitle>
                  <BoxContent>
                    <MyCalendar>
                      <colgroup>
                        <col span={1} className="weekend" style={{ color: "red" }} />
                        <col span={5} className="weekday" />
                        <col span={1} className="weekend" style={{ color: "red" }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>S</th>
                          <th>M</th>
                          <th>T</th>
                          <th>W</th>
                          <th>T</th>
                          <th>F</th>
                          <th>S</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fullCal.map((week, wIndex) => {
                          return (
                            <tr key={`week-${wIndex}`}>
                              {week.days.map((day, dIndex) => {
                                return (
                                  <td className={day.month() === cal.current.month() ? "ok" : "fade"} key={`day-${dIndex}`}>
                                    <div className={day.isSame(cal.today, "day") ? " today" : ""}>{day.date()}</div>
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </MyCalendar>
                  </BoxContent>
                </>
              </FloatBox>
            </FlexCol>
          </FloatBoxes>
        </Content>
      ) : (
        <Loading />
      )}
    </>
  );
};
export default Dashboard;

const Content = styled.div`
  background: linear-gradient(to right, var(--shakes-blue1) -50%, #ffffff 110%);
  overflow-y: auto;
  max-height: calc(100vh - 50px);
  height: calc(100% - 50px);
  border-radius: 0 0 15px 15px;
`;
const FloatBoxes = styled.div`
  display: flex;
  padding: 10px 20px;
  flex-wrap: wrap-reverse;
  align-content: flex-end;
  gap: 10px;
`;

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
  &.calendar {
    flex: 0 1 300px;
  }

  &.classes {
    flex: 1 0 450px;
  }
`;

const FloatBox = styled.div`
  border-radius: 15px;
  background: linear-gradient(to top, #ccffff -10%, #ffffff 90%);
  padding: 20px;
  box-shadow: 0 2px 5px 1px var(--shakes-grey);

  &.alerts {
    z-index: 1;
    position: relative;
    display: flex;
    flex-flow: column;
    gap: 10px;
    border-radius: 15px;
    padding: 10px;
    background: linear-gradient(to right, rgba(255, 99, 71, 0.5) -10%, #ffffff 150%);
    background-color: rgba(255, 99, 71, 0.5);
  }
`;

const BoxTitle = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  span {
    flex: 1;
    text-align: center;
    white-space: nowrap;
  }
`;

const BoxContent = styled.div``;

const NavIcons = styled.button`
  background: none;
  padding: 0;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 10%;

  .icon {
    font-size: 12pt;
    color: black;
  }
`;

const MyCalendar = styled.table`
  width: 100%;
  margin-top: 10px;
  border: 1px solid;
  border-collapse: collapse;
  background-color: white;

  td,
  th {
    width: 40px;
  }

  tr,
  th,
  td {
    height: 40px;
    border: 1px solid;
    text-align: center;
  }

  thead,
  th {
    background-color: var(--shakes-blue3);
  }

  .fade {
    opacity: 0.3;
  }

  .weekend {
    background-color: var(--shakes-blue1);
  }

  .today {
    margin: auto;
    width: 90%;
    aspect-ratio: 1 / 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 50%;
    background-color: tomato;
  }
`;
