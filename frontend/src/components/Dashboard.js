import { useContext, useEffect } from "react";
import styled from "styled-components";
import { MyContext } from "../context/Context";

const Dashboard = () => {
  const {
    state: { currUser, calendars, events },
  } = useContext(MyContext);

  useEffect(() => {
    //Got authToken and some user data.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h1>Welcome, {currUser.displayName}</h1>
      <h3>{currUser.username}</h3>
      <br />
      <h2>Preferences</h2>
      <h3>Language:</h3>
      <p>
        {currUser.mailboxSettings.language.displayName} ({currUser.mailboxSettings.language.locale})
      </p>
      <h3>Date and Time:</h3>
      <p>
        <strong>Format: </strong>
        {currUser.mailboxSettings.dateFormat} - {currUser.mailboxSettings.timeFormat}
      </p>
      <p>
        <strong>TimeZone: </strong>
        {currUser.mailboxSettings.timeZone}
      </p>
      {calendars && <JsonDiv>{JSON.stringify(calendars)}</JsonDiv>}

      {events && <JsonDiv>{JSON.stringify(events)}</JsonDiv>}
    </>
  );
};
export default Dashboard;

const JsonDiv = styled.div`
  max-height: 500px;
  overflow-y: scroll;
  border: 1px solid grey;
  background-color: white;
  font-family: monospace;
`;
