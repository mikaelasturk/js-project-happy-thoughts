import { StyledSection } from '../../styles/styles'
import { MessageCard } from '../cards/cards'

export const MessageSection = ({ variant, messages }) => {
  return (
    <StyledSection variant={variant}>
      {messages.map((message) => (
        <MessageCard key={message.id} variant={variant} message={message} />
      ))}
    </StyledSection>
  )
}
