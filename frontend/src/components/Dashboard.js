import { useContext, useEffect } from "react";
import { MyContext } from "../context/Context";

const Dashboard = () => {
  const {
    state: { currUser, calendars },
  } = useContext(MyContext);

  useEffect(() => {
    //Got authToken and some user data.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h1>Welcome, {currUser.name}</h1>
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
        {currUser.mailboxSettings.timezone}
      </p>
      {calendars && <div>{JSON.stringify(calendars)}</div>}
    </>
  );
};
export default Dashboard;
