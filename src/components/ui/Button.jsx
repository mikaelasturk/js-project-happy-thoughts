import { StyledButton } from '../../styles/styles'


export const Button = ({ variant, type, text, onClick, active } ) => {
  return (
    <StyledButton 
    variant={variant}
    type={type}
    onClick={onClick}
    active={active}>
      {text}
    </StyledButton>
  )
}