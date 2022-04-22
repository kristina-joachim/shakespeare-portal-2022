import styled from "styled-components";
import { Link } from "react-router-dom";

const Alert = ({ title, text, link = "./" }) => {
  return (
    <>
      <Wrapper>
        <Dismiss>&times;</Dismiss>
        <AlertBox to={link}>
          <Title>{title}</Title>
          <Desc>{text}</Desc>
        </AlertBox>
      </Wrapper>
    </>
  );
};
export default Alert;

const Wrapper = styled.div`
  display: flex;
  color: black;
`;

const Dismiss = styled.button`
  border: none;
  background: none;
  padding: 5px;
  &:hover ~ a {
    opacity: 0.5;
    background-color: #ffbeb3;
    border-radius: 0 10px 10px 0;
  }
  &:hover {
    opacity: 0.5;
    background-color: #ffbeb3;
    border-radius: 10px 0 0 10px;
  }
`;

const AlertBox = styled(Link)`
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  padding: 5px;
  &:hover {
    background-color: #ff9380;
    border-radius: 10px;
  }
`;
const Title = styled.h4``;
const Desc = styled.p`
  margin: 5px 0;
`;
