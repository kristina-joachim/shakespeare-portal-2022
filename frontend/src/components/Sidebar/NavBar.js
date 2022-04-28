import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { breakpoints } from "../Shared/GlobalStyles";

const NavBar = () => {
  return (
    <>
      <NavItem to="/home">
        <FaHome className="icon" />
        <ItemName>Dashboard</ItemName>
      </NavItem>
      <NavItem to="/calendar">
        <FaHome className="icon" />
        <ItemName>Calendar</ItemName>
      </NavItem>
      <NavItem to="/classes">
        <FaHome className="icon" />
        <ItemName>Courses</ItemName>
      </NavItem>
      <NavItem to="/timesheets">
        <FaHome className="icon" />
        <ItemName>Timesheets</ItemName>
      </NavItem>
    </>
  );
};
export default NavBar;

const NavItem = styled(NavLink)`
  position: relative;
  align-self: stretch;
  display: flex;
  align-items: center;
  border-radius: 20px;
  padding: 5px 10px;
  margin: 5px;
  color: inherit;

  .icon {
    font-size: 25px;
    flex: 0 0 25px;
  }

  &.active {
    color: var(--shakes-blue3);
  }

  &:hover {
    color: var(--shakes-blue3);
  }

  @media screen and (max-width: ${breakpoints.sidebar}) {
    border-radius: 50%;
    aspect-ratio: 1/1;
    justify-content: center;

    .icon {
      font-size: 35px;
      flex: 0 0 35px;
    }

    &.active {
      color: var(--shakes-blue3);
      background-color: var(--shakes-blue1);
    }
  }
`;

const ItemName = styled.p`
  font-size: 16pt;
  padding: 0 10px;
  font-variant: small-caps;

  @media screen and (max-width: ${breakpoints.sidebar}) {
    display: none;
  }
`;
