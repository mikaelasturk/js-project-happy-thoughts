import styled from "styled-components"

const StyledButton = styled.a`
  background-color: ${({ theme, variant }) => variant ? theme.buttons[variant].bgClr : "inherit"};
  color: ${({ theme, variant }) => variant ? theme.buttons[variant].textClr : "inherit"};
  border-radius: var(--btn-border-radius);
  font-size: var(--btn-font-size);
  font-weight: var(--btn-font-weight);
  font-family: var(--btn-font);
  margin: var(--btn-margin);
  padding: var(--btn-padding);
  text-decoration: none;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  margin-bottom: 1rem;
  max-width: fit-content;


  &:hover {
    background-color: ${({ theme, variant }) => variant ? theme.buttons[variant].hoverBgClr : "inherit"};
    color: ${({ theme, variant }) => variant ? theme.buttons[variant].hoverTextClr : "inherit"};
  }
`

export const Button = ({ href, children, text, variant } ) => {
  return (
    <StyledButton href={href} variant={variant}>
      {children}
      {text}
    </StyledButton>
  )
}