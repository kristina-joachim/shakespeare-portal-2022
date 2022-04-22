import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MyContext } from "../../context/Context";
import { ACTIONS } from "./constants";
import { BiMessageSquareError } from "react-icons/bi";
const Error = () => {
  const {
    state: { status, error },
  } = useContext(MyContext);

  const goTo = useNavigate();

  useEffect(() => {
    if (status !== ACTIONS.ERROR) goTo("/home");
  }, []);

  return (
    <>
      {error && (
        <Content>
          <Website src="https://www.ecoleshakespeare.com?lang=en" />
          <Modal>
            <ModalBack />
            <ModalBox>
              <ModalHead>
                <Title>
                  <BiMessageSquareError class="icon" />
                  Error {error.status}
                </Title>
                <Logo src="./assets/Shakespeare_Logo.png" />
              </ModalHead>
              <SubTitle>An error occured while attempting the {error.attemptedAction} action.</SubTitle>
              <QuoteBlock>
                <code>{error.message}</code>
              </QuoteBlock>
              <SubTitle>See further error details below.</SubTitle>
              <ErrorBox>
                {Object.entries(error.debug).map(([key, value]) => {
                  return (
                    <ErrorMsg>
                      <span>{key}:</span>
                      {value}
                    </ErrorMsg>
                  );
                })}
              </ErrorBox>
              <Reload
                onClick={() => {
                  window.location.reload();
                }}
              >
                Reload page
              </Reload>
            </ModalBox>
          </Modal>
        </Content>
      )}
    </>
  );
};

export default Error;

const Content = styled.div`
  flex: 1;
  position: relative; /* for Modal */
  display: flex;
  width: 100%;
  height: 100%;
`;
const Website = styled.iframe`
  flex: 1;
  border: none;
`;

const Modal = styled.div`
  position: absolute; /* to Content */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-flow: row nowrap;
  align-items: center;
  padding: 50px;
`;
const ModalBack = styled.div`
  position: absolute; /* to Content */
  background-color: black;
  opacity: 0.7;
  width: 100%;
  height: 100%;
`;
const ModalBox = styled.div`
  position: relative;
  background-color: white;
  z-index: 2;
  box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.19);
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  justify-content: center;
  padding: 0px 5% 5%;
  gap: 5px;
  width: 70%;
  min-height: 70%;
  height: max-content;
  border-radius: 15px;

  @media screen and (max-width: 800px) {
    padding: 20px;
  }
`;

const ModalHead = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled.img`
  width: 50%;
  height: auto;
  max-height: 125;
  padding: 0 5px;
  object-fit: contain;
  opacity: 0.4;
  z-index: -10;
`;
const Title = styled.h1`
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;

  .icon {
    display: inline;
    margin-right: 5px;
  }
`;

const SubTitle = styled.h4``;

const ErrorBox = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 10px;
  margin-right: 10px;
  border-left: 10px solid var(--cGrey);
  padding: 10px;
  min-height: 100px;
  max-height: 100%;
  border-radius: 2px 5px 5px 2px;
  background-color: darkgrey;
  display: flex;
  flex-flow: column wrap;
  align-content: space-between;
  word-break: break-word;
`;
const ErrorMsg = styled.p`
  white-space: normal;
  font-family: monospace;
  display: block;
  line-height: 1.1;
  span {
    margin-right: 5px;
    font-family: monospace;
    font-weight: bold;
  }
`;

const Reload = styled.button`
  align-self: center;
`;

const QuoteBlock = styled.blockquote`
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 20px;
  margin-right: 20px;
  border-left: 10px solid var(--cLightGrey);
  padding: 10px;
`;
