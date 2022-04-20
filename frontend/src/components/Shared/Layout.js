import styled from "styled-components";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Content>
        <SideBar />
        <Outlet />
      </Content>
    </>
  );
};

export default Layout;

const Content = styled.div`
  flex: 1;
  background-color: Lavender;
  display: flex;
  flex-flow: row nowrap;
  padding: 20px;
`;
