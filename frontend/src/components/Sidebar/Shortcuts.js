import styled from "styled-components";
import { SiMicrosoftoutlook, SiMicrosoftteams } from "react-icons/si";

const Shortcuts = () => {
  return (
    <>
      <Content>
        <QuickLink href="https://outlook.office.com/mail/" target="_blank">
          <SiMicrosoftoutlook className="icon" />
          <Desc>Outlook</Desc>
        </QuickLink>
        <QuickLink href="https://teams.office.com/" target="_blank">
          <SiMicrosoftteams className="icon" />
          <Desc>Ms Teams</Desc>
        </QuickLink>
      </Content>
    </>
  );
};

export default Shortcuts;

const Content = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 30px;
  border-radius: 15px;
  padding: 5px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  background-color: whitesmoke;

  &::before {
    content: "Shortcuts";
    font-size: 10px;
    position: absolute;
    text-align: right;
    bottom: -10px;
    right: 5px;
  }
  @media screen and (max-width: 600px) {
    align-items: center;

    &::before {
      text-align: center;
      right: auto;
    }
  }
`;

const QuickLink = styled.a`
  align-self: flex-start;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  &:hover {
    color: var(--shakes-blue3);
    .icon {
      background-color: var(--shakes-blue1);
    }
  }
  .icon {
    font-size: 25pt;
    padding: 5px;
    border-radius: 50%;
    aspect-ratio: 1/1;
  }
  p {
    font-size: smaller;
  }
`;

const Desc = styled.p`
  font-size: 16pt;
  padding: 0 10px;
  font-variant: small-caps;

  @media screen and (max-width: 600px) {
    display: none;
  }
`;
