import { StyledSection } from '../../styles/styles'
import { InputForm } from '../cards/cards'

export const InputSection = ({ variant, onSendMessage }) => {
  return (
    <StyledSection variant={variant}>
      <InputForm variant={variant} onSendMessage={onSendMessage} />
    </StyledSection>
  )
}
