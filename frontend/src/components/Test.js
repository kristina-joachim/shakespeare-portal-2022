import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../context/Context";

const TestPage = () => {
  const {
    states: { apiRes, loggedIn },
    user: { currUser },
  } = useContext(MyContext);
  const [login, setLogin] = useState(null);
  const goTo = useNavigate();

  useEffect(() => {
    if (currUser == null && typeof loggedIn === "string" && loggedIn.length) {
      goTo("auth/signin");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (currUser) setLogin(true);
    else setLogin(false);
  }, [currUser]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {login !== true ? (
        <>
          <NavBar>
            {/* <SignInBtn onClick={authSignIn}>Log In!</SignInBtn> */}
            <GoToBtn to="auth/signin">Log In!</GoToBtn>
          </NavBar>
          <Content>
            <h1>Welcome,</h1>
            <h3>Please log in to get started.</h3>
          </Content>
        </>
      ) : (
        <>
          <NavBar>
            <CurrUserName>Hello {currUser.name}!</CurrUserName>
            <GoToBtn to={`auth/signout?user=${currUser.userID}`}>Sign Out?</GoToBtn>
          </NavBar>
          <Content>
            <h1>Welcome, {currUser.name}</h1>
            <h3>{currUser.email}</h3>
            <br />
            <h2>Preferences</h2>
            <h3>Language:</h3>
            <p> {currUser.language ? `${currUser.language.name} (${currUser.language.code})` : "N/A"}</p>
            <h3>Date and Time:</h3>
            <p>
              <strong>Format: </strong>
              {currUser.formats ? `${currUser.formats.date} - ${currUser.formats.time}` : "N/A"}
            </p>
            <p>
              <strong>TimeZone: </strong>
              {currUser.timezone ?? "N/A"}
            </p>
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
