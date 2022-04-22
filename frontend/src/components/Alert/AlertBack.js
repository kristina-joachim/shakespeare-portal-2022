import styled from "styled-components";

const AlertBack = () => {
  return (
    <>
      <SVGBox>
        <MySVG xmlns="http://www.w3.org/2000/svg" viewBox="0, 0, 500, 725" preserveAspectRatio="meet">
          <polygon points="5,5 495,5, 330,505 170,505" />
          <ellipse cy="620" cx="250" rx="150" ry="100" />
          Sorry, your browser does not support inline SVG.
        </MySVG>
      </SVGBox>
    </>
  );
};

export default AlertBack;

const SVGBox = styled.div`
  border-radius: 15px;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  overflow: hidden;
`;
const MySVG = styled.svg`
  position: absolute;
  top: -10px;
  right: -25px;
  fill: rgba(255, 99, 71, 0.3);
  width: auto;
  height: 120%;
`;
