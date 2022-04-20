import styled from "styled-components";
import { useContext } from "react";
import { MyContext } from "../../context/Context";
import Event from "./Event";

const Calendar = () => {
  const {
    state: { mainSchedule },
  } = useContext(MyContext);
  return (
    <>
      <Content>
        {mainSchedule.value.map((event) => {
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
