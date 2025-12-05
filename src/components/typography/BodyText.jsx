import styled from "styled-components"

const StyledBodyText = styled.p`
  font-weight: ${({ weight }) => weight === "lightsemibold" ? "450" : weight === "semibold" ? "550" : 'inherit'};
  font-family: ${({ fontFam }) => fontFam === "heading" ? "var(--font-heading)" : "inherit"};
  font-size: ${({ fontSize }) => fontSize === "xs" ? "21px" : "inherit"};
  text-align: ${({ textAlign }) => textAlign === "center" ? "center" : "left"};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ fontSize }) => fontSize === "xs" ? "18px" : "inherit"};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ fontSizeT }) => fontSizeT === "tablet" ? "24px" : "inherit"};  
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ fontSizeD }) => fontSizeD === "desktop" ? "28px" : "inherit"};
    text-align: ${({ textAlignD }) => textAlignD === "center" ? "center" : "left"};
  }
 
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: ${({ fontSizeD }) => fontSizeD === "desktop" ? "34px" : "18px"};
  }

`

export const BodyText = ({ text, weight, fontFam, fontSize, fontSizeT, fontSizeD, textAlign, textAlignD }) => {
  return (
    <StyledBodyText weight={weight} fontFam={fontFam} fontSize={fontSize} fontSizeT={fontSizeT} fontSizeD={fontSizeD} textAlign={textAlign} textAlignD={textAlignD}>
      {text}
    </StyledBodyText>
  )
}