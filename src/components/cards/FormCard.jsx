// InputForm.jsx
import { StyledCard } from '../../styles/styles'
import { Form } from '../ui/ui'

export const FormCard = ({ variant, onSendMessage }) => {
  return (
    <StyledCard variant={variant}>
      <Form onSendMessage={onSendMessage} />
    </StyledCard>
  )
}
