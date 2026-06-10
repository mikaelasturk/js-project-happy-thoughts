import styled from "styled-components";

export const StyledSection = styled.div.attrs(({ $variant }) => ({
  'data-variant': $variant,
}))`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px;
  gap: 24px; 
  margin-right: 8px;

  ${({ $variant }) => $variant === "contact" && `
    gap: 8px;
    margin: 16px 0;
  `}

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