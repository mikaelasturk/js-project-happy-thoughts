import { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { StyledCard } from '../../styles/styles'
import { BodyText } from '../typography/typography'
import { Button } from '../ui/ui'
import { userStore } from '../../stores/userStore'

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
  margin-top: auto;
`

const MetaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
`

const MessageRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`

const MessageText = styled.div`
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
  word-break: break-word;
`

const EditTextarea = styled.textarea`
  width: 100%;
  border: 1px solid var(--border-clr);
  border-radius: 8px;
  padding: 8px;
  font: inherit;
  font-size: 1rem;
  resize: vertical;
  min-height: 72px;
  background: var(--1st-bg-clr);
  color: var(--font-clr);
`

const EditActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 6px;
  flex-wrap: wrap;
`

const IconButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--font-clr);
  padding: 4px;
  opacity: 0.6;
  display: inline-flex;
  align-items: center;

  &:hover {
    opacity: 1;
  }
`

const EditCharCount = styled.span`
  font-size: 0.8rem;
  opacity: 0.6;
  align-self: center;
`

const PencilIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
)

const UsernameLink = styled(Link)`
  color: var(--font-clr);
  text-decoration: none;
  font-weight: inherit;
  font-size: inherit;

  &:hover {
    text-decoration: underline;
  }
`

const timeAgo = (timestamp) => {
  const diffMs = Date.now() - new Date(timestamp).getTime();
  
  const seconds = Math.floor(Math.max(0, diffMs) / 1000);
  if (seconds === 0) return `Just now`
  if (seconds === 1) return `${seconds} second ago`
  if (seconds < 60) return `${seconds} seconds ago`

  const minutes = Math.floor(seconds / 60)
   if (minutes === 1) return `${minutes} minute ago`
  if (minutes < 60) return `${minutes} minutes ago`

  const hours = Math.floor(minutes / 60)
  if (hours === 1) return `${hours} hour ago`
  if (hours < 24) return `${hours} hours ago`

  const days = Math.floor(hours / 24)
  if (days === 1) return `${days} day ago`
  if (days < 30) return `${days} days ago`

  const months = Math.floor(days / 30)
  if (months === 1) return `${months} month ago`
  if (months < 12) return `${months} months ago`

  const years = Math.floor(months / 12)
  if (years === 1) return `${years} year ago`
  return `${years} years ago`
}

export const MessageCard = ({ variant, message, onLike, onDelete, onUpdate, isNew, viewMode }) => {
  const user = userStore((state) => state.user)
  const authorName = message.username || 'Anonymous'
  const isAnonymous = !message.username
  const isOwner = Boolean(
    user?.username && !isAnonymous && message.username === user.username,
  )

  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(message.text)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    const trimmed = editText.trim()
    if (!trimmed || trimmed === message.text) {
      setIsEditing(false)
      return
    }
    setIsSaving(true)
    try {
      await onUpdate?.(message.id, trimmed)
      setIsEditing(false)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setEditText(message.text)
    setIsEditing(false)
  }

  const handleDelete = () => {
    const confirmed = window.confirm('Vill du verkligen ta bort meddelandet?')
    if (!confirmed) return
    onDelete(message.id)
  }

  return (
    <StyledCard $variant={variant} $viewMode={viewMode}>
      <MessageRow>
        <MessageText>
          {isEditing ? (
            <>
              <EditTextarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                maxLength={140}
                autoFocus
              />
              <EditActions>
                <Button
                  variant={variant}
                  text={isSaving ? 'Sparar...' : 'Spara'}
                  onClick={handleSave}
                  disabled={isSaving || editText.trim().length < 5}
                />
                <Button variant={variant} text="Avbryt" onClick={handleCancel} />
                <EditCharCount>{editText.length}/140</EditCharCount>
              </EditActions>
            </>
          ) : (
            <BodyText whiteSpace="pre-wrap" text={message.text} />
          )}
        </MessageText>

        {isOwner && (
          <>
            <Button
              variant={variant}
              text={<PencilIcon />}
              onClick={() => (isEditing ? handleCancel() : setIsEditing(true))}
              aria-label="Redigera thought"
              title={isEditing ? 'Avbryt redigering' : 'Redigera'}
            />
            <Button
              variant={variant}
              text={<TrashIcon />}
              onClick={handleDelete}
              aria-label="Ta bort thought"
              title="Ta bort"
            />
          </>
        )}
      </MessageRow>

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
        <MetaWrapper>
          <BodyText text={timeAgo(message.thoughtCreatedAt)} />
          {message.username && message.username.toLowerCase() !== 'anonymous' ? (
            <p>by <UsernameLink to={`/users/${message.username}`}>{authorName}</UsernameLink></p>
          ) : (
            <BodyText text={`by ${authorName}`} />
          )}
        </MetaWrapper>
      </Wrapper>
    </StyledCard>
  )
}
