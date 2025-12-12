import styled, { keyframes } from "styled-components";

const popIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${({ theme, variant }) => variant ? theme.sections[variant].bgClr : "inherit"};
  color: ${({ theme, variant }) => variant ? theme.sections[variant].textClr : "inherit"};
  border: 2px solid black;
  box-shadow: 12px 12px 0 -4px #000;
  padding: 24px;
  gap: 8px;
  border-radius: 2px;
  width: 100%;
  min-width: 200px;
  max-width: 700px;
  margin: 0 auto;
  animation: ${popIn} 400ms ease-out;

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