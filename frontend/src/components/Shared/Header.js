import styled from "styled-components";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { MyContext } from "../../context/Context";
import { ACTIONS } from "./constants";
import Loading from "./Loading";

const Header = () => {
  const {
    state: { currUser, status },
  } = useContext(MyContext);
  const myLoc = useLocation();

  switch (status) {
    case "anonymous":
    case ACTIONS.LOGIN_LOGOUT:
      if (myLoc.pathname.includes("redirect"))
        return (
          <NavBar>
            <GoToBtn to="auth/signin" aria-disabled={true}>
              <Loading type="inline" />
            </GoToBtn>
          </NavBar>
        );
      else
        return (
          <NavBar>
            <GoToBtn to="auth/signin">Log In!</GoToBtn>
          </NavBar>
        );
    case ACTIONS.LOGIN_INITIALIZED:
      return (
        <NavBar>
          <GoToBtn type="inline" to="auth/signin" aria-disabled={true}>
            <Loading type="inline" />
          </GoToBtn>
        </NavBar>
      );
    case ACTIONS.LOGIN_VALIDATED:
      return (
        <NavBar>
          <div>Hello {currUser.displayName}!</div>
          <GoToBtn to="auth/signout">Sign Out?</GoToBtn>
        </NavBar>
      );
    default:
      return;
  }
};

export default Header;

const NavBar = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  flex: 0 0 50px;
  border-bottom: 1px solid var(--light-gray-color);
  border-left: 1px solid var(--light-gray-color);
  padding-left: 15px;
  background: white;
`;

const GoToBtn = styled(Link)`
  text-decoration: none;
  margin: 10px;
  padding: ${(props) => (props.type === "inline" ? "5px" : "10px 20px")};
  border: 2px solid black;
  background-color: WhiteSmoke;
  color: black;
  cursor: pointer;

  &:hover {
    background-color: grey;
  }
`;
