import styled from "styled-components";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../context/Context";

const Header = () => {
  const {
    state: { currUser },
  } = useContext(MyContext);

  return (
    <>
      <NavBar>
        {currUser == null ? (
          <>
            <GoToBtn to="auth/signin">Log In!</GoToBtn>
          </>
        ) : (
          <>
            <div>Hello {currUser.name}!</div>
            <GoToBtn to="auth/signout">Sign Out?</GoToBtn>
            <GoToBtn to="cal/all">Get calendars</GoToBtn>
          </>
        )}
      </NavBar>
    </>
  );
};

export default Header;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  flex: 0 0 50px;
  border-bottom: 1px solid var(--light-gray-color);
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
