import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { MyContext } from "../../context/Context";
import { ACTIONS } from "../Shared/constants";

const Class = () => {
  const {
    state: { selectedClass },
    actions: { dispatchAction },
  } = useContext(MyContext);
  const { classID } = useParams();

  useEffect(() => {
    dispatchAction(ACTIONS.GET_EVENT_DETAILS, { classID });
  }, []);

  return (
    <>
      <Content>{classID}</Content>
    </>
  );
};

export default Class;

const Content = styled.div``;
