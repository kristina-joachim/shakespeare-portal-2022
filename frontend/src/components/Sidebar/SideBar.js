import styled from "styled-components";
import { BiLogOut } from "react-icons/bi";
import Shortcuts from "./Shortcuts";
import NavBar from "./NavBar";
import UserInfo from "./UserInfo";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <Content>
        <Section>
          <Logo src="./assets/Shakespeare_Logo.png" />
          <UserInfo />
          <NavBar />
        </Section>
        <Section>
          <Shortcuts />
          <LogOutBtn to="auth/signout">
            <BiLogOut className="icon" />
            <ItemName>Log out</ItemName>
          </LogOutBtn>
        </Section>
      </Content>
    </>
  );
};

export default SideBar;

const Content = styled.div`
  position: sticky;
  left: 0;
  top: 0;
  max-height: 100vh;
  width: 200px;
  background-color: var(--nav-back);
  display: flex;
  justify-content: space-between;
  flex-flow: column nowrap;
  align-items: center;
  padding: 15px 5px;

  @media screen and (max-width: 600px) {
    padding: 5px;
    width: 80px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  @media screen and (max-width: 600px) {
    align-items: center;
  }
`;

const Logo = styled.img`
  padding: 0 5px;
  object-fit: contain;
`;

const LogOutBtn = styled(NavLink)`
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 5px 10px;
  margin: 5px;
  color: inherit;
  font-variant: small-caps;
  background: none;
  border: none;

  .icon {
    font-size: 25px;
  }

  &:hover {
    color: var(--cPurple);
    background-color: var(--cLightPurple);
  }

  @media screen and (max-width: 600px) {
    border-radius: 50%;
    aspect-ratio: 1/1;
    .icon {
      font-size: 75px;
    }
  }
`;

const ItemName = styled.p`
  font-size: 16pt;
  padding: 0 10px;
  font-variant: small-caps;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;
