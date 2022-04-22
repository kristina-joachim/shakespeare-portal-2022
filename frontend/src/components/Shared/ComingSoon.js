import styled from "styled-components";

const ComingSoon = ({ children }) => {
  return (
    <>
      <Modal>
        <ModalBack />
        <ModalWatermark>Coming Soon</ModalWatermark>
        {children}
      </Modal>
    </>
  );
};

export default ComingSoon;

const Modal = styled.div`
  cursor: not-allowed;
  display: flex;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex-direction: inherit;
  text-align: center;
  justify-content: center;
  align-items: center;
  z-index: 5;
  border: none;
  padding: 10px;
`;
const ModalBack = styled.div`
  position: absolute;
  background: repeating-linear-gradient(35deg, Gainsboro 1%, Silver 3%, Gainsboro 5%);
  border: none;
  opacity: 0.5;
  width: 99%;
  height: 99%;
  z-index: 5;
  border-radius: 15px;
`;

const ModalWatermark = styled.p`
  transform: rotate(-15deg) scale(100%);
  position: absolute;
  font-variant: small-caps;
  z-index: 10;
  text-shadow: 0px 1px 3px grey;
  font-size: 18pt;
`;
