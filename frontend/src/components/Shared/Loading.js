import styled from "styled-components";

const Loading = () => {
  return (
    <>
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    </>
  );
};

export default Loading;

const LoaderWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Loader = styled.span`
  border: 5px solid white;
  border-top: 5px solid var(--purple-color);
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: loading 2s linear infinite;

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
