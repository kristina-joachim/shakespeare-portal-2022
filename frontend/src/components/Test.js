import styled from "styled-components";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../context/Context";

const TestPage = () => {
  const {
    api: { apiRes },
    user: { currUser, setCurrUser },
  } = useContext(MyContext);

  const authSignIn = async () => {
    const res = await fetch("auth/signin");
    console.log(res);
    if (res.ok) window.location.assign(res.url);
  };

  const logOut = async () => {
    const res = await fetch("auth/signout");
    console.log(res);
    if (!res.ok) {
      window.alert("An error occurred. Please try to sign out again");
    }
  };

  useEffect(() => {
    if (apiRes && apiRes.data) {
      console.log(apiRes);
      switch (apiRes.url) {
        case "/auth/signin":
          const userAccnt = apiRes.data && apiRes.data.account;
          const userInfo = userAccnt && {
            userID: userAccnt.homeAccountId,
            name: userAccnt.name,
            email: userAccnt.email,
          };
          userInfo && setCurrUser({ ...userInfo });
          break;
        case "/auth/signout":
          if (currUser) setCurrUser(null);
          break;
        default:
          break;
      }
    }
  }, [apiRes]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <NavBar>
        {currUser == null ? (
          <>
            {/* <SignInBtn onClick={authSignIn}>Log In!</SignInBtn> */}
            <GoToBtn to="/auth/signin">Log In!</GoToBtn>
          </>
        ) : (
          <>
            <CurrUserName>Hello {currUser.name}!</CurrUserName>
            <GoToBtn to="/auth/signout">Sign Out?</GoToBtn>
            {/* <LogOutBtn onClick={logOut}>Sign Out</LogOutBtn> */}
          </>
        )}
      </NavBar>
      <Content>
        {currUser && (
          <>
            <h1>Welcome, {currUser.name}</h1>
            <h3>{currUser.email}</h3>
          </>
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
