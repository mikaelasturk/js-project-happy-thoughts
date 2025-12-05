import styled from "styled-components";

const StyledSectionTitle = styled.h2`
  color: ${({ theme, variant }) => variant ? theme.sections[variant].headingClr: "inherit"};
  text-align: center;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet})  {
    text-align: ${({ textAlign }) => textAlign === "left" ? "left" : "center"}; 
  }

   @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    margin-bottom: ${({ marginBottom }) => marginBottom === "0" ? "0" : "60px"};
    
  }


`

export const SectionTitle = ({ title, variant, textAlign, marginBottom }) => {
  return (
    <StyledSectionTitle variant={variant} textAlign={textAlign} marginBottom={marginBottom}>
      {title}
    </StyledSectionTitle>
  )
}
