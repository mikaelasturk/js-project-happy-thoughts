import { StyledButton } from '../../styles/styles'


export const Button = ({ variant, type, text } ) => {
  return (
    <StyledButton 
    variant={variant}
    type={type}>
      {text}
    </StyledButton>
  )
}