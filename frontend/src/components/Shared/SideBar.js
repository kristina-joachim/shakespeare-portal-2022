import { useContext, useEffect } from "react";
import { MyContext } from "../../context/Context";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const SideBar = () => {
  const {
    state: { status, currUser },
    other: { loggedIn },
  } = useContext(MyContext);

  const goTo = useNavigate();
  useEffect(() => {
    if (loggedIn && currUser == null) goTo("/auth/signin");
    else if (loggedIn && currUser != null) console.log("Logged in.", currUser);
  }, [status]);

  return (
    <>
      <Content>
        <Logo src="assets/Shakespeare Logo.png" />
        <NavMenu>
          <NavItem>
            <FaHome className="icon" /> Home
          </NavItem>
        </NavMenu>
      </Content>
    </>
  );
};

export default SideBar;

const Content = styled.div`
  width: 20%;
  max-width: 300px;
  background-color: White;
  display: flex;
  flex-flow: column nowrap;
  padding: 20px;
`;
const Logo = styled.img`
  object-fit: contain;
`;

const NavMenu = styled.ul``;

const NavItem = styled.li``;
