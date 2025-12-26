import { StyledSection } from '../../styles/styles'
import { MessageCard } from '../cards/cards'
import { SpinnerLoader } from "../ui/ui";

export const MessageSection = ({ variant, messages, onLike, isLoading }) => {
  return (
    <StyledSection variant={variant}>
      {messages.map((message) => (
        <MessageCard 
        key={message.id} 
        variant={variant} 
        message={message} 
        onLike={onLike}
        />
      ))}
      {isLoading && <SpinnerLoader />}
    </StyledSection>
  )
}
