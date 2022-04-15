import { useContext, useEffect } from "react";
import { MyContext } from "../context/Context";
import Dashboard from "./Dashboard";
import LandingPage from "./LandingPage";
import { ACTIONS } from "./Shared/constants";
import styled from "styled-components";

const Page = () => {
  const {
    state: { currUser },
    other: { loggedIn },
    actions: { dispatchAction },
  } = useContext(MyContext);

  useEffect(() => {
    if (loggedIn && currUser == null) dispatchAction(ACTIONS.LOGIN_INITIALIZED);
    else if (loggedIn && currUser != null) dispatchAction(ACTIONS.LOGIN_COMPLETE);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Content>{currUser == null ? <LandingPage /> : <Dashboard />}</Content>
    </>
  );
};

export default Page;
const Content = styled.div`
  flex: 1;
  background-color: Lavender;
  display: flex;
  flex-flow: column nowrap;
  padding: 20px;
`;
