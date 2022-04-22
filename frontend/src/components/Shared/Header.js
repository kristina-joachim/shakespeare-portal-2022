import styled from "styled-components";

const Header = ({ title }) => {
  return (
    <>
      <TopBar>
        <h1>{title}</h1>
      </TopBar>
    </>
  );
};

export default Header;

const TopBar = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  flex: 0 0 50px;
  padding-left: 15px;
  background: linear-gradient(to top, #b3b3ff -50%, #ffffff 100%);
`;
