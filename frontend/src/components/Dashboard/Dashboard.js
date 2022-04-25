import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MyContext } from "../../context/Context";
import Alert from "../Alert";
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
  const [events, setEvents] = useState();
  const [alerts, setAlerts] = useState([]);
  const [cal, setCal] = useState(null);
  const [fullCal, setFullCal] = useState(null);
  const [allLoaded, setAllLoaded] = useState(false);

  //Set current TIME
  useEffect(() => {
    //is reporting deadline in the next 2 days?
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
    if (fullCal != null && today != null) setAllLoaded(true);
    else setAllLoaded(false);
  }, [fullCal, today]);

  return (
    <>
      <Header title={"Dashboard"} />
      {allLoaded ? (
        <Content>
          <FloatBox size="60%">
            <BoxTitle>Classes</BoxTitle>
            <BoxContent>{<Calendar />}</BoxContent>
          </FloatBox>

          <FloatBox size="35%">
            <BoxTitle>Alerts</BoxTitle>
            <BoxContent>
              {alerts.length
                ? alerts.map((alert) => {
                    return <Alert title={alert.title} text={alert.text} link={alert.link} />;
                  })
                : "No alerts."}
            </BoxContent>
          </FloatBox>

          <FloatBox size="35%">
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
                    {fullCal.map((week) => {
                      return (
                        <tr>
                          {week.days.map((day) => {
                            return <td className={day.month() === cal.current.month() ? "ok" : "fade"}>{day.date()}</td>;
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </MyCalendar>
              </BoxContent>
            </>
          </FloatBox>
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
  display: flex;
  flex-flow: column wrap;
  padding: 20px;
  overflow-y: auto;
  max-height: calc(100vh - 50px);
  height: calc(100% - 50px);
  border-radius: 0 0 15px 15px;
  gap: 10px;
`;

const FloatBox = styled.div`
  border-radius: 15px;
  background: linear-gradient(to top, #ccffff -10%, #ffffff 90%);
  padding: 10px;
  width: ${(props) => props.size ?? "50%"};
  height: auto;
`;

const BoxTitle = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  aspect-ratio: 1/1;
  background-color: white;

  tr,
  th,
  td {
    border: 1px solid;
    text-align: center;
    padding: 5px;
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
`;
