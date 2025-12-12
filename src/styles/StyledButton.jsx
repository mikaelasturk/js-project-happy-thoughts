import styled from "styled-components"

export const StyledButton = styled.button`
   background-color: ${({ theme, variant, active }) =>
      active
        ? theme.sections[variant].button.activeBgClr
        : theme.sections[variant].button.bgClr};
  color: ${({ theme, variant }) => variant ? theme.sections[variant].button.textClr : "inherit"};
  border-radius:  ${({ theme, variant }) => variant ? theme.sections[variant].button.borderRadius : "inherit"};
  border: none;
  padding: 16px 8px;
  margin: var(--btn-margin);
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  max-width: fit-content;
  cursor: pointer;


  &:hover {
    background-color: ${({ theme, variant }) => variant ? theme.sections[variant].button.hoverBgClr : "inherit"};
    color: ${({ theme, variant }) => variant ? theme.sections[variant].button.hoverTextClr : "inherit"};
  }
  
  @media (min-width: 360px) {
    padding: ${({ theme, variant }) => variant ? theme.sections[variant].button.padding : "inherit"};

  }

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