import styled from "styled-components";
import SideBar from "../Sidebar/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useContext, useEffect } from "react";
import { MyContext } from "../../context/Context";

const Layout = () => {
  const {
    state: { status, currUser },
    other: { loggedIn },
  } = useContext(MyContext);

  const goTo = useNavigate();

  useEffect(() => {
    if (loggedIn && currUser == null) goTo("/auth/signin");
    else if (loggedIn && currUser != null) console.log("Logged in.", currUser);
  }, []);

  return (
    <>
      {currUser && (
        <Wrapper>
          <SideBar />
          <Content>
            <Header />
            <Page>
              <Outlet />
            </Page>
          </Content>
        </Wrapper>
      )}
    </>
  );
};

export default Layout;

const Wrapper = styled.div`
  flex: 1;
  background-color: Lavender;
  display: flex;
  flex-flow: row nowrap;
`;

const Content = styled.div`
  flex: 1;
  width: 70%;
  display: flex;
  flex-flow: column nowrap;
`;

const Page = styled.div`
  flex: 1;
  background-color: Lavender;
  display: flex;
  flex-flow: column nowrap;
  padding: 20px;
`;
