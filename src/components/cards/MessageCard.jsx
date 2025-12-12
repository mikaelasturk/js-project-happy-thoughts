// MessageCard.jsx
import { StyledCard } from '../../styles/styles'
import { BodyText } from '../typography/typography'

export const MessageCard = ({ variant, message }) => {
  return (
    <StyledCard variant={variant}>
      <BodyText text={message.text} />
    </StyledCard>
  )
}
