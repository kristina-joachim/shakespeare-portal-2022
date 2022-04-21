import styled from "styled-components";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <SideBar />
        <Content>
          <Outlet />
        </Content>
      </Wrapper>
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
  background-color: Lavender;
  display: flex;
  flex-flow: column nowrap;
  padding: 20px;
`;
