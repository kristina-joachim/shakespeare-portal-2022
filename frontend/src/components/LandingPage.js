import styled from "styled-components";

const LandingPage = () => {
  return (
    <>
      <Content>
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
      </Content>
    </>
  );
};

export default LandingPage;

const Content = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  flex: 1;
  border: 1px solid red;
  gap: 5px;
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
