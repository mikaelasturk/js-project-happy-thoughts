import { StyledSection } from '../../styles/styles'
import { FormCard } from '../cards/cards'

export const FormSection = ({ variant, onSendMessage }) => {
  return (
    <StyledSection variant={variant}>
      <FormCard variant={variant} onSendMessage={onSendMessage} />
    </StyledSection>
  )
}
