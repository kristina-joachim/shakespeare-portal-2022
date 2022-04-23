import styled from "styled-components";
import ComingSoon from "../Shared/ComingSoon";
import Header from "../Shared/Header";
const FullCalendar = () => {
  return (
    <>
      <Header title={"My Calendar"} />
      <Content>
        <ComingSoon></ComingSoon>
      </Content>
    </>
  );
};

export default FullCalendar;

const Content = styled.div`
  background: linear-gradient(to right, var(--shakes-blue1) -50%, #ffffff 110%);
  height: 100%;
  width: 100%;
  border-radius: 0 0 15px 15px;
`;
