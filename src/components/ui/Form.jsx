import { useState } from 'react'
import styled from 'styled-components'

import { Button, InputField } from './ui'
import { contentStore } from '../../stores/contentStore'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Form = ({ onFormSubmit }) => {
  const [message, setMessage] = useState('')
  const { content } = contentStore();
  const MIN = 5
  const MAX = 140

  const submitMessage = () => {
    const trimmed = message.trim()
    const length = trimmed.length
    if (length < MIN || length > MAX) return
    onFormSubmit(trimmed)
    setMessage('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    submitMessage()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submitMessage()
    }
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <InputField
        id="message"
        labelText={content.formLabel}
        type="textarea"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={content.formPlaceholder}
        required={true}
        minLength={MIN}
        maxLength={MAX}
      />
      <Button
        variant="input"
        type="submit"
        text={content.formButton}
      />
    </StyledForm>
  )
}
