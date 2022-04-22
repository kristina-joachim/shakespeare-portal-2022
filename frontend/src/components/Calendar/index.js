import styled from "styled-components";
import { useContext, useEffect } from "react";
import { MyContext } from "../../context/Context";
import Event from "./Event";

const Calendar = () => {
  const {
    state: { events },
  } = useContext(MyContext);

  useEffect(() => {
    //"2019-11-08T19:00:00-08:00".  $top 1000
  }, []);

  const todaysEvents = events.value.filter((event) => {
    return event.id > 0;
  });
  return (
    <>
      <Content>
        {events.value.map((event) => {
          return <Event key={`event-${event.id}`} ev={event} />;
        })}
      </Content>
    </>
  );
};

export default Calendar;

const Content = styled.div`
  display: flex;
  gap: 10px;
  border: 1px solid blue;
  flex: 1;
  flex-flow: column nowrap;
`;
