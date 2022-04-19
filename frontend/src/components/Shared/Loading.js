import styled from "styled-components";

const Loading = ({ type = "full" }) => {
  return (
    <>
      <LoaderWrapper>
        <Loader size={type} />
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
  border: ${(props) => (props.size === "inline" ? "2px" : "5px")} solid white;
  border-top: ${(props) => (props.size === "inline" ? "2px" : "5px")} solid var(--purple-color);
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  width: ${(props) => (props.size === "inline" ? "100%" : "100px")};
  height: auto;
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
