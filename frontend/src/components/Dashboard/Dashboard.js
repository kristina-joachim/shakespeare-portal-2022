import { useContext, useEffect } from "react";
import styled from "styled-components";
import { MyContext } from "../../context/Context";
import Calendar from "../Calendar";
import { ACTIONS } from "../Shared/constants";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const {
    state: { status, authToken, currUser, mainSchedule, mailbox },
    other: { loggedIn },
    actions: { dispatchAction },
  } = useContext(MyContext);

  useEffect(() => {
    if (mailbox != null) console.log("GOT MAILBOX :D");
  }, [mailbox]);

  const goTo = useNavigate();
  useEffect(() => {
    if (loggedIn && currUser == null) goTo("/auth/signin");
    else if (loggedIn && currUser != null) console.log("Logged in.", currUser);
  }, [status]);

  const testGraph = () => {
    dispatchAction(ACTIONS.GET_MAILBOX, {
      $count: true,
      $top: 1000,
      fetchOptions: {
        headers: {
          Prefer: 'outlook.timezone="Eastern Standard Time"',
          Authorization: `Bearer ${authToken.accessToken}`,
        },
      },
    });
  };

  return (
    <>
      {currUser && (
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
          <button onClick={testGraph}>Get Mailbox</button>
        </>
      )}
    </>
  );
};
export default Dashboard;

const Content = styled.div`
  flex: 1;
  background-color: Lavender;
  display: flex;
  flex-flow: row nowrap;
  padding: 20px;
`;
