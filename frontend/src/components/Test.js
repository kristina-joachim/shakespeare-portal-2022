import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../context/Context";

const TestPage = () => {
  const {
    states: { apiRes },
    user: { currUser },
  } = useContext(MyContext);
  const [login, setLogin] = useState(null);

  useEffect(() => {
    console.log("User logged in?", currUser);
    if (currUser) setLogin(true);
    else setLogin(false);
  }, [currUser]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {login !== true ? (
        <>
          <NavBar>
            {/* <SignInBtn onClick={authSignIn}>Log In!</SignInBtn> */}
            <GoToBtn to="/auth/signin">Log In!</GoToBtn>
          </NavBar>
          <Content>
            <h1>Welcome,</h1>
            <h3>Please log in to get started.</h3>
            {apiRes && <div>{JSON.stringify(apiRes)}</div>}
          </Content>
        </>
      ) : (
        <>
          <NavBar>
            <CurrUserName>Hello {currUser.name}!</CurrUserName>
            <GoToBtn to="/auth/signout">Sign Out?</GoToBtn>
            {/* <LogOutBtn onClick={logOut}>Sign Out</LogOutBtn> */}
          </NavBar>
          <Content>
            <h1>Welcome, {currUser.name}</h1>
            <h3>{currUser.email}</h3>
            <br />
            {apiRes && <div>{JSON.stringify(apiRes)}</div>}
          </Content>
        </>
      )}
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

const GoToBtn = styled(Link)`
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
const CurrUserName = styled.div``;
const LogOutBtn = styled.button`
  align-self: flex-end;
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
