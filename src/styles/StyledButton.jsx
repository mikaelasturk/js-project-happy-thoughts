import styled from "styled-components"

export const StyledButton = styled.button`
  background-color: ${({ theme, variant }) => variant ? theme.sections[variant].button.bgClr : "inherit"};
  color: ${({ theme, variant }) => variant ? theme.sections[variant].button.textClr : "inherit"};
  border-radius: var(--btn-border-radius);
  border: none;
  margin: var(--btn-margin);
  padding: var(--btn-padding);
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  /* margin-bottom: 1rem; */
  max-width: fit-content;
  cursor: pointer;


  &:hover {
    background-color: ${({ theme, variant }) => variant ? theme.sections[variant].button.hoverBgClr : "inherit"};
    color: ${({ theme, variant }) => variant ? theme.sections[variant].button.hoverTextClr : "inherit"};
  }
`