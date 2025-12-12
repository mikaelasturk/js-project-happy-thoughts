import styled from "styled-components"

const StyledBodyText = styled.p`

  text-align: ${({ textAlign }) => textAlign === "center" ? "center" : "left"};
   white-space: pre-wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
   
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
   
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
   
  }
 
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
  
  }
`

export const BodyText = ({ text, textAlign }) => {
  return (
    <StyledBodyText textAlign={textAlign}>
      {text} 
    </StyledBodyText>
  )
}