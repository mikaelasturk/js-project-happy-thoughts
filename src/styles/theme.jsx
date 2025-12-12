export const theme = {
  breakpoints: {
    mobile: "360px",
    tablet: "768px",
    desktop: "1024px",
    desktopLarge: "1440px",
  },

  backgroundClr: "var(--1st-bg-clr)",

  //----------------//
  // Section themes //
  //----------------//
  sections: {
    input: {
      bgClr: "var(--2nd-bg-clr)",
      textClr: "var(--font-clr)",
      borderClr: "var(--border-clr)",
      button: {
        bgClr: "var(--1st-btn-bg-clr)",
        textClr: "var(--1st-btn-txt-clr)",
        padding: "var(--btn-padding)",
        borderRadius: "var(--btn-border-radius)"
      }
    },
    message: {
      bgClr: "var(--1st-bg-clr)",
      textClr: "var(--font-clr)",
      borderClr: "var(--border-clr)",
      button: {
        bgClr: "var(--2nd-btn-bg-clr)",
        hoverBgClr: "var(--2nd-btn-bg-clr-hover)",
        activeBgClr: "var(--2nd-btn-bg-clr-hover)",
        padding: "10px 14px",
        borderRadius: "var(--btn-border-radius)"
      }
    }
  },
};  