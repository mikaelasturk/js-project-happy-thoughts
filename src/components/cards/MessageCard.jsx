import styled from 'styled-components'
import { StyledCard } from '../../styles/styles'
import { BodyText } from '../typography/typography'
import { Button } from '../ui/ui'

const LikesWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`

const timeAgo = (timestamp) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)

  if (seconds < 60) return `${seconds} seconds ago`

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} minutes ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hours ago`

  const days = Math.floor(hours / 24)
  if (days < 30) return `${days} days ago`

  const months = Math.floor(days / 30)
  if (months < 12) return `${months} months ago`

  const years = Math.floor(months / 12)
  return `${years} years ago`
}

export const MessageCard = ({ variant, message, onLike, isNew }) => {
  return (
    <StyledCard variant={variant}>
      <BodyText whiteSpace="pre-wrap" text={message.text} />

      <Wrapper>
        <LikesWrapper>
          <Button 
          variant={variant}
          text="❤️"
          onClick={() => onLike(message.id)}
          active={message.liked}
          isNew={isNew}
          /> 
          <BodyText text={`x ${message.likes}`} />
        </LikesWrapper>
        <BodyText 
        text={timeAgo(message.createdAt)} 
        />
      </Wrapper>
    </StyledCard>
  )
}
