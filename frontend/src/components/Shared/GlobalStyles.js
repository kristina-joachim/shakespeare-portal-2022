import { createGlobalStyle } from "styled-components";

// export const breakpoints = { tablet: "600px" };

const GlobalStyles = createGlobalStyle`
  :root {
    --main-font: 'Helvetica', sans-serif;
    --main-color:#4d4b5c;
    --purple-color: #67536e;
    --text-color: #4d4b5c;  
    --light-gray-color: #cbbad1; 
  }

  /*
  Josh's Custom CSS Reset
  https://www.joshwcomeau.com/css/custom-css-reset/
*/
*, *::before, *::after {
  box-sizing: border-box;
}
* {
  margin: 0;
  padding: 0;
}
html, body {
  height: 100%;
}
body {
  line-height: 1;
  -webkit-font-smoothing: antialiased;
}
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
input, button, textarea, select {
  font: inherit;
}
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
#root, #__next {
  isolation: isolate;
}

  #root {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    min-height: 100%;
    font-family: var(--main-font);
  }

`;
export default GlobalStyles;
