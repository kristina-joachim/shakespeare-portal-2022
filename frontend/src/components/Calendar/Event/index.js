import { useEffect } from "react";
import { FaCircle, FaCrosshairs } from "react-icons/fa";
import { GiCrosshair } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const moment = require("moment");

const Event = ({ ev, next, prev }) => {
  let isFirst = prev == null;
  let isLast = next == null;
  let prevB2B = !isFirst && moment(ev.start.dateTime).isSame(prev.end.dateTime);
  let nextB2B = !isLast && moment(ev.end.dateTime).isSame(next.start.dateTime);

  return (
    <>
      <Content b2b={nextB2B} last={isLast}>
        <Start b2b={prevB2B}>
          <FaCircle className="icon" />
          {moment(ev.start.dateTime).format("LT")}
        </Start>
        <Details>
          <Title>{ev.subject}</Title>
          {ev.isOnlineMeeting && <JoinBtn href={ev.onlineMeeting.joinUrl}>Join Meeting!</JoinBtn>}
        </Details>
        {!nextB2B && (
          <End>
            <FaCircle className="icon" />
            {moment(ev.end.dateTime).format("LT")}
          </End>
        )}
      </Content>
    </>
  );
};

export default Event;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  min-height: 75px;
  position: relative;
  margin-bottom: ${(props) => (props.b2b ? "4px" : props.last ? "0" : "30px")};
`;

const Details = styled.div`
  border-left: 1px dotted black;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 0 5px;
  background: linear-gradient(to right, var(--shakes-blue1) 0%, transparent 90%);
`;

const Start = styled.div`
  z-index: 1;
  position: absolute;
  ${(props) => (props.b2b ? "top: -2px" : "top: 0px")};
  transform: translateY(-50%);
  text-align: left;
  display: flex;
  align-items: center;
  width: calc(100% - 6pt);
  background: linear-gradient(to right, #ccffff 0%, transparent 90%);

  .icon {
    position: absolute;
    left: -11.5px;
    transform: translateX(-50%);
    font-size: 6pt;
    border-radius: 50%;
    color: var(--shakes-blue2);
    background-color: black;
    box-shadow: 0 0 2px 2px black, 0 0 1px 1px currentColor inset;
  }
`;

const End = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 0;
  transform: translateY(+50%);
  text-align: left;
  display: flex;
  align-items: center;
  width: calc(100% - 6pt);
  background: linear-gradient(to right, #ccffff 0%, transparent 90%);

  .icon {
    position: absolute;
    left: -11.5px;
    transform: translateX(-50%);
    font-size: 6pt;
    border-radius: 50%;
    color: var(--shakes-blue2);
    background-color: black;
    box-shadow: 0 0 2px 2px black, 0 0 1px 1px currentColor inset;
  }
`;

const Title = styled.h3`
  padding: 5px 0;
`;

const JoinBtn = styled.a`
  flex: 0 0 fit-content;
  white-space: nowrap;
  min-height: 35px;
  min-width: 125px;
  border-radius: 15px;
  background-color: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    font-weight: bold;
    opacity: 0.8;
  }
`;
