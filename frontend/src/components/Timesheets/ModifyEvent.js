import styled from "styled-components";

const ModifyEvent = () => {
  return (
    <>
      <Modal>
        <ModalBack />
        <ModalBox>
          <input />
          <label></label>
        </ModalBox>
      </Modal>
    </>
  );
};

export default ModifyEvent;

const Modal = styled.div`
  position: fixed; /* to Content */
  top: 55px;
  max-width: calc(100% - 215px);
  width: 100%;
  max-height: calc(100% - 60px);
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  z-index: 5;
`;

const ModalBack = styled.div`
  border-radius: 0 0 0 15px;
  position: absolute; /* to Modal */
  background-color: grey;
  opacity: 0.7;
  width: 100%;
  height: 100%;
  z-index: 5;
`;

const ModalBox = styled.div`
  position: relative; /* for closeBtn */
  background-color: white;
  z-index: 6;
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.19);
  display: flex;
  flex-flow: column nowrap;
  padding: 20px;
  gap: 5px;
  border-radius: 15px;
  margin: auto;
  min-width: fit-content;
  min-height: fit-content;
  height: min-content;
`;
