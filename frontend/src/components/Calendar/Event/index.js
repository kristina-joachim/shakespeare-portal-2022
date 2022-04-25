import { NavLink } from "react-router-dom";
import styled from "styled-components";
const moment = require("moment");

const Event = ({ ev }) => {
  return (
    <>
      <Content>
        <h3>{ev.subject}</h3>
        <p>From: {moment(ev.start.dateTime).format("LT")}</p>
        <p>To: {moment(ev.end.dateTime).format("LT")}</p>
        {ev.isOnlineMeeting && (
          <a href={ev.onlineMeeting.joinUrl} className="joinLink">
            Join Meeting!
          </a>
        )}
      </Content>
    </>
  );
};

export default Event;

const Content = styled.div`
  display: flex;
  flex-flow: column nowrap;
  border-radius: 15px;
  border: none;
  padding: 5px;
  background-color: LightGoldenRodYellow;

  h3 {
    padding: 5px 0;
  }
  .joinLink {
    text-decoration: underline;
    padding: 5px;
  }
`;
