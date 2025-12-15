// InputForm.jsx
import { StyledCard } from '../../styles/styles'
import { Form } from '../ui/ui'

export const FormCard = ({ variant, onFormSubmit }) => {
  return (
    <StyledCard variant={variant}>
      <Form onFormSubmit={onFormSubmit} />
    </StyledCard>
  )
}
