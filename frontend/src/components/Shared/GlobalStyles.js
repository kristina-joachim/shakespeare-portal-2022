import { createGlobalStyle } from "styled-components";

// export const breakpoints = { tablet: "600px" };

const GlobalStyles = createGlobalStyle`
  :root {
    --main-font: Poppins, Tahoma, sans-serif;
    --header-font: Quicksand, Geneva, sans-serif;
    --text-color: #333;
    --main-color:#4d4b5c;
    --purple-color: #67536e;
    --light-gray-color: #cbbad1; 
    --cPurple: hsl(258deg, 100%, 50%);
    --cLightPurple: #eee8fe;
    --cLightGrey: #e8e9f0;
    --cGrey: #4e515a;
    --nav-back: white;
    --shakes-blue1: #ace1fa;
    --shakes-blue2: #7bd3f7;
    --shakes-blue3: #00aeef;
    --shakes-grey: #d7dee0;
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
    font-family: var(--main-font);
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
  
  button, input[type='button'], input[type='reset'], input[type='submit']{
    border: 1px solid grey;
    background: lightGrey;
    padding: 10px 20px;
    border-radius: 10px;
    &:hover { 
      opacity: 0.8;
      cursor: pointer;
    }
    
    &:disabled { 
      cursor: not-allowed;
    }
  }

  p {
    overflow-wrap: break-word;
  }
  
  h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
    font-family: var(--header-font);
  }
  
  #root, #__next {
    isolation: isolate;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  a:visited {
    color: initial;
  }

  
  #root {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    height: 100%;
    min-width: 500px;
    min-height: 100%;
    overflow: auto;
    font-family: var(--main-font);
    color: var(--text-color);
  }
  `;

export default GlobalStyles;
