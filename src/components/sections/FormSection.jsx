import { StyledSection } from '../../styles/styles'
import { FormCard } from '../cards/cards'

export const FormSection = ({ variant, onFormSubmit }) => {
  return (
    <StyledSection variant={variant}>
      <FormCard variant={variant} onFormSubmit={onFormSubmit} />
    </StyledSection>
  )
}
