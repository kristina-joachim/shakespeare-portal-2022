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
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  flex: 0 0 50px;
  padding-left: 15px;
  background: linear-gradient(to top, var(--shakes-blue1), #ffffff 100%);
  border-bottom: 2px solid var(--shakes-blue1);
  border-radius: 15px 15px 0 0;
  z-index: 2;
`;
