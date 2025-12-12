import { createGlobalStyle } from "styled-components"


export const GlobalStyle = createGlobalStyle`
  :root {

    /* ------------- */
    /* Font settings */
    /* ------------- */ 
    
    --font-family: "Roboto Mono", monospace, system-ui, Avenir, Helvetica, Arial, sans-serif;
    --number-font-family: "Roboto", sans-serif; 

    --font-heading: var(--font-family);
    --font-txt: var(--font-family);
    --weight-normal: 400;
    --weight-semibold: 550;
    --weight-bold: 670;
    /* --xxs-font-size: 18px;
    --xs-font-size: 24px;
    --s-font-size: 32px;
    --m-font-size: 50px;
    --l-font-size: 68px;
    --xl-font-size: 80px; */
    
    --h1-font-weight: var(--weight-bold);
    --h2-font-weight: var(--weight-bold);
    --h3-font-weight: var(--weight-semibold);

    /* ------ */
    /* Mobile */
    /* ------ */
    --h1-font-size-mobile: 50px;
    --h2-font-size-mobile: 50px;
    --h3-font-size-mobile: 24px;
    --p-font-size-mobile: 18px;

    /* ------ */
    /* Tablet */
    /* ------ */
    --h1-font-size-tablet: 55px;
    --h2-font-size-tablet: 55px;
    --h3-font-size-tablet: 24px;
    --p-font-size-tablet: 18px;

    /* ------- */
    /* Desktop */
    /* ------- */
    --h1-font-size-desktop: 68px;
    --h2-font-size-desktop: 68px;
    --h3-font-size-desktop: 28px;
    --p-font-size-desktop: 20px;

    /* ------------- */
    /* Desktop large */
    /* ------------- */
    --h1-font-size-desktopL: 80px;
    --h2-font-size-desktopL: 80px;
    --h3-font-size-desktopL: 32px;
    --p-font-size-desktopL: 28px;

    /* ----------- */
    /* Main colors */
    /* ----------- */
    --1st-clr: #000000; // txt clr
    --2nd-clr: #FFFFFF; // bg clr
    --3rd-clr: #E9E9E9; // btn bg like
    --4th-clr: #FFADAC; // btn bg clr send / btn hover like
    --5th-clr: #F2F0F0; // 2nd bg clr

    /* ------------------ */
    /*       Colors       */
    /* ------------------ */
    --1st-bg-clr: var(--2nd-clr);
    --2nd-bg-clr: var(--5th-clr);
    --highlight-clr: var(--4th-clr);
    --border-clr: var(--1st-clr);
    --font-clr: var(--1st-clr);


    /* ---------------------- */
    /* SoMe links/icon colors */
    /* ---------------------- */
    --icon-clr: #D0D0D0;
    --icon-hover-clr: #000000;

    /* -------------- */
    /* Button styling */
    /* -------------- */
    --1st-btn-bg-clr: var(--highlight-clr);
    --1st-btn-txt-clr: var(--font-clr);
    --2nd-btn-bg-clr: var( --3rd-clr);
    --2nd-btn-bg-clr-hover: var(--highlight-clr);
    --btn-border-radius: 50px;
    --btn-font-size: 20px;
    --btn-font-weight: var(--weight-semibold);
    --btn-font: var(--font-heading);
    --btn-margin: 0px;
    --btn-padding: 12px 28px;
  }
  /* --------- */
  /*   Reset   */
  /* --------- */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    min-height: 100vh;
    line-height: 1.5;
    font-family: var(--font-txt);
    max-width: 100vw;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
    font-family: var(--font-heading);
    line-height: 1.2;
  }


  ul, ol {
    list-style: none;
  }

  h1 {
    font-size: var(--h1-font-size-mobile);
    font-weight: var(--h1-font-weight);
  }
    
  h2 {
    font-size: var(--h2-font-size-mobile);
    font-weight: var(--h2-font-weight);
  }
    
  h3 {
    font-size: var(--h3-font-size-mobile);
    font-weight: var(--h3-font-weight);
  }

  p {
    overflow-wrap: break-word;
    font-size: var(--p-font-size-mobile);
  }
  

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    h1 {
      font-size: var(--h1-font-size-tablet);
    }
      
    h2 {
      font-size: var(--h2-font-size-tablet);
    }
      
    h3 {
      font-size: var(--h3-font-size-tablet);
    }

    p {
      font-size: var(--p-font-size-tablet);
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    h1 {
      font-size: var(--h1-font-size-desktop);
    }
      
    h2 {
      font-size: var(--h2-font-size-desktop);
    }
      
    h3 {
      font-size: var(--h3-font-size-desktop);
    }

    p {
      font-size: var(--p-font-size-desktop);
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktopLarge}) {
     h1 {
      font-size: var(--h1-font-size-desktopL);
    }
      
    h2 {
      font-size: var(--h2-font-size-desktopL);
    }
      
    h3 {
      font-size: var(--h3-font-size-desktopL);
    }

    p {
      font-size: var(--p-font-size-desktopL);
    }
  }
`