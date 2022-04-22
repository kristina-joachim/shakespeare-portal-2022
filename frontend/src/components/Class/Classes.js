import styled from "styled-components";
import ComingSoon from "../Shared/ComingSoon";
import Header from "../Shared/Header";

const Classes = () => {
  return (
    <>
      <ComingSoon>
        <Content>
          <Header title={"My Classes"} />
        </Content>
      </ComingSoon>
    </>
  );
};

export default Classes;

const Content = styled.div`
  flex: 1;
`;
