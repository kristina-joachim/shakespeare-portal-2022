import { useContext, useEffect } from "react";
import { MyContext } from "../context/Context";
import Dashboard from "./Dashboard";
import LandingPage from "./LandingPage";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

const Page = () => {
  const {
    state: { status, currUser },
    other: { loggedIn },
  } = useContext(MyContext);

  const goTo = useNavigate();
  useEffect(() => {
    if (loggedIn && currUser == null) goTo("/auth/signin");
    else if (loggedIn && currUser != null) console.log("Logged in.", currUser);
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

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
