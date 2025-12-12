import styled from "styled-components";

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${({ theme, variant }) => variant ? theme.sections[variant].bgClr : "inherit"};
  color: ${({ theme, variant }) => variant ? theme.sections[variant].textClr : "inherit"};
  padding: 8px;
  gap: 8px;

  /* Tablet and up --> */
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    
  }

  /* Desktop and up --> */
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    
  }

  /* Desktop Large and up --> */
  @media (min-width: ${({ theme }) => theme.breakpoints.desktopLarge}) {
    
  }
`