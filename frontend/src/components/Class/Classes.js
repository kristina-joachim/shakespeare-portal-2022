import styled from "styled-components";
import ComingSoon from "../Shared/ComingSoon";
import Header from "../Shared/Header";

const Classes = () => {
  return (
    <>
      <Header title={"My Classes"} />
      <Content>
        <ComingSoon></ComingSoon>
      </Content>
    </>
  );
};

export default Classes;

const Content = styled.div`
  background: linear-gradient(to right, var(--shakes-blue1) -50%, #ffffff 110%);
  height: 100%;
  width: 100%;
  border-radius: 0 0 15px 15px;
`;
