export const theme = {
  breakpoints: {
    mobile: "360px",
    tablet: "768px",
    desktop: "1024px",
    desktopLarge: "1440px",
  },

  //---------------//
  // Button themes //
  //---------------//
  buttons: {
    demo: {
      icon: "svg here?",  
      bgClr: "var(--section1-btn-bg-clr)",
      textClr: "var(--section1-btn-txt-clr)",
      hoverBgClr: "var(--demo-btn-hover-bg-clr)",
      hoverTextClr: "var(--demo-btn-hover-txt-clr)",
    },
    code: {
      icon: "svg here?",  
      bgClr: "var(--section1-btn-bg-clr)",
      textClr: "var(--section1-btn-txt-clr)",
      hoverBgClr: "var(--code-btn-hover-bg-clr)",
      hoverTextClr: "var(--code-btn-hover-txt-clr)",
    },
    article: {
      icon: "svg here?",
      bgClr: "var(--section3-btn-bg-clr)",
      textClr: "var(--section3-btn-txt-clr)",
      hoverBgClr: "var(--article-btn-hover-bg-clr)",
      hoverTextClr: "var(--article-btn-hover-txt-clr)",
    },
  }, 

  //----------------//
  // Section themes //
  //----------------//
  sections: {
    hero: {
      bgClr: "var(--section1-bg-clr)",
      textClr: "var(--section1-txt-clr)",
      headingClr: "var(--section1-highlight-clr)",
      accentClr: "var(--acc-1st-clr)",
    },
    tech: {
      bgClr: "var(--section2-bg-clr)",
      textClr: "var(--section2-txt-clr)",
      headingClr: "var(--section2-heading-clr)",
    },
    projects: {
      bgClr: "var(--section1-bg-clr)",
      textClr: "var(--section1-txt-clr)",
      headingClr: "var(--section1-highlight-clr)",
    },
    articles: {
      bgClr: "var(--section3-bg-clr)",
      textClr: "var(--section3-txt-clr)",
      headingClr: "var(--section3-highlight-clr)",
    },
    skills: {
      bgClr: "var(--section2-bg-clr)",
      textClr: "var(--section2-txt-clr)",
      headingClr: "var(--section2-heading-clr)",
      subBgClr: [
        {
          id: "code", 
          bgClr: "var(--section2-subheading1-bg-clr)",
          textClr: "var(--section2-subheading1-txt-clr)"  

        },
        { 
          id: "toolbox", 
          bgClr: "var(--section2-subheading2-bg-clr)",
          textClr: "var(--section2-subheading2-txt-clr)"  
        },
        {
          id: "upcoming", 
          bgClr: "var(--section2-subheading3-bg-clr)",
          textClr: "var(--section2-subheading3-txt-clr)"    
        },
        {
          id: "more", 
          bgClr: "var(--section2-subheading4-bg-clr)",
          textClr: "var(--section2-subheading4-txt-clr)"  
        },  
      ],
    },
    contact: {
      bgClr: "var(--section1-bg-clr)",
      textClr: "var(--section1-txt-clr)",
      headingClr: "var(--section1-highlight-clr)",
    },
  },
};  