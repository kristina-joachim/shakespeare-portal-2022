import styled from "styled-components";
import { BiLogIn } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const [showModal, setShowModal] = useState(true);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Website src="https://www.ecoleshakespeare.com?lang=en" />
      {showModal ? (
        <Modal>
          <ModalBack />
          <ModalBox>
            <CloseBtn onClick={toggleModal}>&times;</CloseBtn>
            <Info>
              <Title>Welcome!</Title>
              <SubTitle>Please log in to continue</SubTitle>
            </Info>
            <LoginOptions>
              <LoginContainer>
                <LoginTitle>Teachers</LoginTitle>
                <LoginType>
                  Login with my "@ecoleshakespeare.com" address
                  <LoginBtn>Log In!</LoginBtn>
                </LoginType>
                OR
                <LoginType>
                  Login with my personal email address
                  <UserLogin>
                    <InputLabel>
                      Email:
                      <UserInput />
                    </InputLabel>
                    <InputLabel>
                      Password:
                      <UserInput />
                    </InputLabel>
                    <LoginBtn type="submit">Log In!</LoginBtn>
                  </UserLogin>
                </LoginType>
              </LoginContainer>
              <LoginContainer>
                <LoginTitle>Coordinators</LoginTitle>
                <LoginType>
                  Login <LoginBtn>Log In!</LoginBtn>
                </LoginType>
              </LoginContainer>
            </LoginOptions>
          </ModalBox>
        </Modal>
      ) : (
        <ModalButton id="modal-Btn" onClick={toggleModal}>
          <ModalIcon>
            <BiLogIn className="icon" />
            <p>Login</p>
          </ModalIcon>
          <ModalShadow />
        </ModalButton>
      )}
    </>
  );
};

export default LandingPage;

const Website = styled.iframe`
  flex: 1;
  border: none;
`;

const Modal = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`;
const ModalBack = styled.div`
  position: fixed;
  background-color: black;
  opacity: 0.7;
  width: 100%;
  height: 100%;
`;
const ModalBox = styled.div`
  max-width: 50%;
  flex: 1;
  position: relative;
  padding: 10px;
  background-color: white;
  z-index: 2;
`;
const CloseBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding: 5px 10px;
  right: 0;
  top: 0;
  background: none;
  border: none;
  font-size: 14pt;

  &:hover {
    font-weight: bold;
    cursor: pointer;
  }
`;
const ModalButton = styled.button`
  position: fixed;
  inset: auto 50px 50px auto;
  width: 100px;
  height: 120px;
  border: none;
  background: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const ModalIcon = styled.div`
  width: 100px;
  height: 100px;
  background: radial-gradient(circle at 30px 30px, #5cabff, #000);
  border-radius: 50%;
  animation: 750ms float infinite alternate ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  color: white;
  font-variant: small-caps;
  font-size: 16pt;

  .icon {
    font-size: 18pt;
  }

  @keyframes float {
    0% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  &:hover {
    box-shadow: 0 0 5px 1px rgb(43, 42, 42);
  }
`;

const ModalShadow = styled.div`
  margin-top: 10px;
  width: 80%;
  background: rgb(43, 42, 42);
  height: 5px;
  border-radius: 50%;
  filter: blur(2.5px);
`;

const Info = styled.div`
  padding: 20px;
`;
const Title = styled.h1``;

const SubTitle = styled.h3``;

const LoginOptions = styled.div`
  display: flex;
  border: 1px solid blue;
  padding: 20px;
  padding-bottom: 5%;
  flex: 1;
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-flow: column nowrap;
  flex-basis: 50%;
  border: 1px solid green;
`;

const LoginTitle = styled.h2``;

const LoginType = styled.div`
  background-color: LightGoldenRodYellow;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LoginBtn = styled.button``;

const UserLogin = styled.div`
  padding-top: 20px;
  align-self: flex-start;
  text-align: left;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
`;

const UserInput = styled.input`
  width: 100%;
  & > * {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.submit {
    width: auto;
    align-self: center;
    padding: 5px 10px;
  }
`;
const InputLabel = styled.label`
  width: 100%;
`;
