import { useContext, useEffect } from "react";
import styled from "styled-components";
import { MyContext } from "../../context/Context";
import Calendar from "../Calendar";
import { ACTIONS } from "../Shared/constants";
import Header from "../Shared/Header";

const Dashboard = () => {
  const {
    state: { currUser },
  } = useContext(MyContext);

  return (
    <>
      <Header title={"Dashboard"} />
      <Content>
        <FloatBox>
          <BoxTitle>Timesheets</BoxTitle>
          <BoxContent></BoxContent>
        </FloatBox>

        <FloatBox>
          <BoxTitle>Alerts</BoxTitle>
          <BoxContent></BoxContent>
        </FloatBox>

        <FloatBox>
          <BoxTitle>Schedule</BoxTitle>
          <BoxContent></BoxContent>
        </FloatBox>

        <FloatBox>
          <BoxTitle>Classes</BoxTitle>
          <BoxContent>{<Calendar />}</BoxContent>
        </FloatBox>
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
      </Content>
    </>
  );
};
export default Dashboard;

const Content = styled.div`
  flex: 1;
  background: linear-gradient(to right, lavender -10%, #ffffff 90%);
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
`;

const FloatBox = styled.div`
  border-radius: 15px;
  background: linear-gradient(to top, #ccffff -10%, #ffffff 90%);
  padding: 10px;
`;

const BoxTitle = styled.h2``;

const BoxContent = styled.div``;
