import styled from "styled-components";
import SideBar from "../Sidebar/SideBar";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../../context/Context";
import Loading from "./Loading";

const Layout = () => {
  const {
    state: { currUser },
  } = useContext(MyContext);

  return (
    <>
      {currUser ? (
        <Wrapper>
          <SideBar />
          <Content>
            <Outlet />
          </Content>
        </Wrapper>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Layout;

const Wrapper = styled.div`
  flex: 1;
  background-color: var(--shakes-grey);
  display: flex;
  flex-flow: row nowrap;
  gap: 5px;
  padding: 5px;
  max-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  width: 70%;
  display: flex;
  flex-flow: column nowrap;
  border-radius: 15px;
`;
