import styled from "styled-components";

const StyledSectionTitle = styled.h2`
  color: ${({ theme, variant }) => variant ? theme.sections[variant].headingClr: "inherit"};
  text-align: center;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet})  {
    
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
  
  }
`

export const SectionTitle = ({ title, variant }) => {
  return (
    <StyledSectionTitle variant={variant}>
      {title}
    </StyledSectionTitle>
  )
}
