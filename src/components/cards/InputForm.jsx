// InputForm.jsx
import { StyledCard } from '../../styles/styles'
import { Form } from '../ui/ui'

export const InputForm = ({ variant, onSendMessage }) => {
  return (
    <StyledCard variant={variant}>
      <Form onSendMessage={onSendMessage} />
    </StyledCard>
  )
}
