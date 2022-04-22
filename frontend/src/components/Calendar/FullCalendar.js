import styled from "styled-components";
import ComingSoon from "../Shared/ComingSoon";
import Header from "../Shared/Header";
const FullCalendar = () => {
  return (
    <>
      <ComingSoon>
        <Content>
          <Header title={"My Calendar"} />
        </Content>
      </ComingSoon>
    </>
  );
};

export default FullCalendar;

const Content = styled.div`
  flex: 1;
`;
