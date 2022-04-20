import { useContext, useEffect } from "react";
import styled from "styled-components";
import { MyContext } from "../../context/Context";
import Calendar from "../Calendar";

const Dashboard = () => {
  const {
    state: { authToken, currUser, mainSchedule },
  } = useContext(MyContext);

  useEffect(() => {
    //Got authToken and some user data.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const testGraph = async () => {
    fetch(
      "https://graph.microsoft.com/v1.0/me/calendars/AAMkADgzMmI5NGJiLWMxNWEtNDcyZC1iOGQ0LTVhODQ1MmQ1NzE5OQBGAAAAAADgl6AeKG8zQK8ZTKRR-fiwBwAKy6jAHRCJSqS2n-NMHj8VAAAAAAEGAAAKy6jAHRCJSqS2n-NMHj8VAACPQENfAAA=/events",
      {
        headers: {
          Prefer: 'outlook.timezone="Eastern Standard Time"',
          Authorization: `Bearer ${authToken.accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => console.log("%cFETCHED~!", "color: red", data));
  };

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
      {mainSchedule && <Calendar />}
      <button onClick={testGraph}>Get Angie's calendar</button>
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
