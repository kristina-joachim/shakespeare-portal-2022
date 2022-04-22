import styled from "styled-components";
import { BiLogIn } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import ComingSoon from "../Shared/ComingSoon";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../context/Context";
import { ACTIONS } from "../Shared/constants";

const LandingPage = () => {
  const [showModal, setShowModal] = useState(true);
  const [studentForm, setStudentForm] = useState(true);
  const {
    state: { currUser, status },
    other: { myStatus },
  } = useContext(MyContext);

  const goTo = useNavigate();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleStudentForm = () => {
    setStudentForm(!studentForm);
  };

  const msLogin = () => {
    goTo("/auth/signin");
  };

  useEffect(() => {
    if (status !== ACTIONS.LOGIN_LOGOUT && myStatus === ACTIONS.LOGIN_VALIDATED && currUser == null) goTo("/auth/signin");
    else if (status !== ACTIONS.LOGIN_LOGOUT && myStatus !== "anonymous") goTo("/home");
  }, [status]);

  return (
    <>
      <Content>
        <Website src="https://www.ecoleshakespeare.com?lang=en" />
        {showModal ? (
          <Modal>
            <ModalBack />
            <ModalBox>
              <CloseBtn onClick={toggleModal}>&times;</CloseBtn>
              <Title>Welcome!</Title>
              <SubTitle>Please log in to continue</SubTitle>
              <Divider className="x" />
              <Options>
                <OptionBox>
                  <OptionTitle>Coordinators</OptionTitle>
                  <Option>
                    <OptionSubtitle>"@ecoleshakespeare.com" addresses only.</OptionSubtitle>
                    <LoginBtn onClick={msLogin}>Log In!</LoginBtn>
                  </Option>
                  <Divider className="x" />
                  <OptionTitle>Students</OptionTitle>
                  <Option>
                    <ComingSoon>
                      {studentForm ? (
                        <>
                          <OptionSubtitle>Login with your existing account</OptionSubtitle>
                          <LoginForm>
                            <InputLabel>
                              Email:
                              <UserInput />
                            </InputLabel>
                            <InputLabel>
                              Password:
                              <UserInput />
                            </InputLabel>
                            <LoginBtn type="submit">Log In!</LoginBtn>
                          </LoginForm>
                          <OptionSubtitle>
                            Don't have an account yet?&nbsp;
                            <LoginBtn className="register" onClick={toggleStudentForm}>
                              Register Now!
                            </LoginBtn>
                          </OptionSubtitle>
                        </>
                      ) : (
                        <>
                          <OptionSubtitle>Register with the code provided by your company</OptionSubtitle>
                          <LoginForm>
                            <InputLabel>
                              Company Code:
                              <br />
                              <UserInput />
                            </InputLabel>
                            <InputLabel>
                              Company Email:
                              <br />
                              <UserInput />
                            </InputLabel>
                            <InputLabel>
                              Full Name:
                              <InputGroup>
                                <UserInput name="givenName" placeholder="Given name(s)" required />
                                <UserInput name="surName" placeholder="Last name(s)" required />
                              </InputGroup>
                            </InputLabel>
                            <InputLabel>
                              Teacher can address you as:
                              <br />
                              <UserInput name="name" required />
                            </InputLabel>
                            <InputLabel>
                              Phone Number:
                              <br />
                              <UserInput name="phone" required />
                            </InputLabel>
                            <InputLabel>
                              Username:
                              <br />
                              <UserInput name="username" required />
                            </InputLabel>
                            <InputLabel>
                              Password:
                              <br />
                              <UserInput name="pwd" required />
                            </InputLabel>
                            <InputLabel>
                              Confirm Password:
                              <br />
                              <UserInput name="pwd-confirm" required />
                            </InputLabel>
                            <LoginBtn id="register" type="submit">
                              Register!
                            </LoginBtn>
                          </LoginForm>
                          <OptionSubtitle>
                            Already have an account?&nbsp;
                            <LoginBtn className="register" onClick={toggleStudentForm}>
                              Log In
                            </LoginBtn>
                          </OptionSubtitle>
                        </>
                      )}
                    </ComingSoon>
                  </Option>
                </OptionBox>
                <OptionBox>
                  <OptionTitle>Teachers</OptionTitle>
                  <Option>
                    <OptionSubtitle>Login with my "@ecoleshakespeare.com" address</OptionSubtitle>
                    <LoginBtn onClick={msLogin}>Log In!</LoginBtn>
                  </Option>
                  <OptionVS>OR</OptionVS>
                  <Option>
                    <ComingSoon>
                      <OptionSubtitle>Login with my personal email address</OptionSubtitle>
                      <LoginForm id="teacherPersonal">
                        <InputLabel>
                          Email:
                          <UserInput />
                        </InputLabel>
                        <InputLabel>
                          Password:
                          <UserInput />
                        </InputLabel>
                        <LoginBtn type="submit">Log In!</LoginBtn>
                      </LoginForm>
                    </ComingSoon>
                  </Option>
                </OptionBox>
              </Options>
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
      </Content>
    </>
  );
};

export default LandingPage;

const Content = styled.div`
  flex: 1;
  position: relative; /* for Modal */
  display: flex;
  height: 100%;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
`;
const Website = styled.iframe`
  flex: 1;
  height: 100%;
  width: 100%;
  border: none;
`;

const Modal = styled.div`
  border: 2px solid red;
  position: absolute; /* to Content */
  min-width: 100%;
  max-height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const ModalBack = styled.div`
  position: absolute; /* to Content */
  background-color: black;
  opacity: 0.7;
  width: 100%;
  height: 100%;
`;
const ModalBox = styled.div`
  position: relative; /* for closeBtn */
  background-color: white;
  z-index: 2;
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.19);
  display: flex;
  flex-flow: column nowrap;
  padding: 20px;
  gap: 5px;
  border-radius: 15px;
  flex: 1 1 auto;
  margin: 50px;
  min-width: 850px;
`;

const CloseBtn = styled.button`
  --circle: 30px;
  padding: 10px;
  position: sticky; /* to ModalBox */
  top: 0;
  align-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  border-radius: 50%;
  font-size: 16pt;
  height: var(--circle);
  width: var(--circle);

  &:hover {
    padding: 0;
    background-color: rgba(255, 0, 0, 0.2);
    transform: scale(1.5);
    aspect-ratio: 1/1;
    color: red;
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

  &:hover {
    opacity: 1;
  }
`;

const ModalIcon = styled.div`
  flex: 0 0 100px;
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
  flex: 1 0 5px;
  margin-top: 10px;
  width: 80%;
  background: rgb(43, 42, 42);
  height: 5px;
  border-radius: 50%;
  filter: blur(2.5px);
`;

const Title = styled.h1``;

const SubTitle = styled.h3``;

const Options = styled.div`
  display: flex;
  flex-flow: column wrap;
  height: calc(100% - 100px);
  max-width: 100%;
  min-width: 800px;
  flex: 1 1 auto;
  align-items: center;
  align-content: space-around;
  gap: 10px;
  @media screen and (max-width: 950px) {
    .dividers {
      display: block;
    }
  }
`;

const OptionBox = styled.div`
  padding: 5px 0;
  min-width: 400px;
`;

const OptionTitle = styled.h2`
  //border-bottom: 1px solid currentColor;
  margin-bottom: 3px;
`;

const OptionSubtitle = styled.p`
  font-variant: small-caps;
  margin-bottom: 5px;
`;
const OptionVS = styled.p`
  text-transform: capitalize;
  padding: 10px 0;
  display: flex;
  align-items: center;
  width: 100%;

  &::before,
  &::after {
    content: "";
    flex: 1;
    margin: 0 5px;
    height: 1px;
  }
  &::before {
    background: linear-gradient(to right, transparent, var(--text-color) 20% 80%);
  }
  &::after {
    background: linear-gradient(to left, transparent, var(--text-color) 20% 80%);
  }
`;

const Option = styled.div`
  margin: 5px 0;
  border-radius: 15px;
  background-color: whitesmoke;
  display: flex;
  flex-flow: column nowrap;
  padding: 15px 5px;
  width: 100%;
  height: auto;
`;

const LoginBtn = styled.button`
  margin: 10px 0 0;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  &.register {
    display: inline;
    font-variant: small-caps;
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    text-decoration: underline;

    &:hover {
      font-weight: bold;
    }
  }
`;

const LoginForm = styled.form`
  align-self: stretch;
  padding: 20px 0;
  text-align: left;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  gap: 10px;
`;

const UserInput = styled.input`
  width: 100%;
  padding: 5px;
  font-size: smaller;
  display: flex;

  &.submit {
    width: auto;
    align-self: center;
    padding: 5px 10px;
  }
`;

const InputLabel = styled.label`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-self: stretch;
`;

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  gap: 5px;
`;

const Divider = styled.div`
  position: relative;

  &.y {
    width: 1px;
    margin-right: 10px;
  }

  &.y::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 1px;
    margin-left: 5px;
    background: linear-gradient(transparent, var(--text-color) 5% 95%, transparent);
  }

  &.x {
    align-self: stretch;
    height: 1px;
    margin-bottom: 10px;
  }

  &.x::before {
    content: "";
    position: absolute;
    top: 0;
    left: -2%;
    right: -2%;
    width: 104%;
    height: 1px;
    margin-top: 5px;
    background: linear-gradient(to right, transparent, var(--text-color) 20% 80%, transparent);
  }

  &.stopper::after {
    --stopWidth: 10px;
    --stopHeight: 6px;
    content: "";
    position: absolute;
    z-index: 1;
    top: calc(0px - var(--stopHeight) / 2);
    left: calc(50% - var(--stopWidth) / 2);
    width: var(--stopWidth);
    height: var(--stopHeight);
    background-color: white;
    border-left: 1px solid rgb(48, 49, 51);
    border-right: 1px solid rgb(48, 49, 51);
  }

  &.divider {
    display: none;
  }
`;
