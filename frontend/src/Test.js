import { Login, Agenda } from "@microsoft/mgt-react";
import useIsSignedIn from "./useIsSignedIn.hook";
import styled from "styled-components";
import { useState } from "react";

const TestPage = () => {
  const [isSignedIn] = useIsSignedIn();
  const [data, setData] = useState(null);

  const authSignIn = async () => {
    await fetch("api/signin", { mode: "no-cors" }).then((res) => window.location.assign(res.json()));
  };

  return (
    <>
      <NavBar>
        <Login />
        <SignInBtn onClick={authSignIn}>Log In!</SignInBtn>
      </NavBar>
      <Content>
        {isSignedIn && (
          <div>
            <h1>Upcoming Events:</h1>
            <br /> <Agenda />
          </div>
        )}
      </Content>
    </>
  );
};

export default TestPage;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  flex: 0 0 50px;
`;

const Content = styled.div`
  flex: 1;
  background-color: Lavender;
`;

const SignInBtn = styled.button`
  text-decoration: none;
  margin: 10px;
  padding: 10px 20px;
  border: 2px solid black;
  background-color: WhiteSmoke;
  color: black;
  cursor: pointer;

  &:hover {
    background-color: grey;
  }
`;
