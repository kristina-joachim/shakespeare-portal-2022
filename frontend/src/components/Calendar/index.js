import styled from "styled-components";
import { useContext, useEffect } from "react";
import { MyContext } from "../../context/Context";
import Event from "./Event";
import moment from "moment";

const Calendar = () => {
  const {
    state: { today },
  } = useContext(MyContext);

  return (
    <>
      <Content>
        <TimeLine></TimeLine>
        <Events>
          {today
            .sort((a, b) => moment(a.start.dateTime).toDate() - moment(b.start.dateTime).toDate())
            .map((event, index, arr) => {
              return <Event key={`event-${event.id}`} ev={event} next={arr[index + 1]} prev={arr[index - 1]} />;
            })}
        </Events>
      </Content>
    </>
  );
};

export default Calendar;

const Content = styled.div`
  display: flex;
  flex: 1;
`;

const TimeLine = styled.div`
  min-width: 3px;
  background-color: black;
  position: relative;

  &:before,
  &:after {
    position: absolute;
    content: "";
    height: 7px;
    background-color: inherit;
    border-radius: 15px;
    width: 3px;
  }
  &::before {
    top: -5px;
  }

  &::after {
    bottom: -5px;
  }
`;

const Events = styled.div`
  display: flex;
  flex: 1;
  flex-flow: column nowrap;
  padding: 10px 0;
`;
