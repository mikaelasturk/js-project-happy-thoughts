import styled from "styled-components";

export const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px;
  gap: 24px; 
  margin-right: 8px;

  /* Tablet and up --> */
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    justify-content: center;

  }

  /* Desktop and up --> */
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
  }
    
  /* Desktop Large and up --> */
  @media (min-width: ${({ theme }) => theme.breakpoints.desktopLarge}) {
  }
`