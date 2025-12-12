import styled from "styled-components"

const StyledBodyText = styled.p`

  text-align: ${({ textAlign }) => textAlign === "center" ? "center" : textAlign === "right" ? "right" : "left"};
  margin-left: ${({ marginLeft }) => marginLeft === "auto" ? "auto" : "0"};
  white-space: ${({ whiteSpace }) => whiteSpace === "pre-wrap" ? "pre-wrap" : "normal"};;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
   
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
   
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
   
  }
 
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
  
  }
`

export const BodyText = ({ text, textAlign, marginLeft, whiteSpace }) => {
  return (
    <StyledBodyText 
    textAlign={textAlign} 
    marginLeft={marginLeft}
    whiteSpace={whiteSpace}>
      {text} 
    </StyledBodyText>
  )
}