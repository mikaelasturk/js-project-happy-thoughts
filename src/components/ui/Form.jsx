import { useState } from 'react'
import styled from 'styled-components'
import { Button, InputField } from './ui'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Form = ({ onFormSubmit }) => {
  const [message, setMessage] = useState('')

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
        labelText="What's making you happy right now?"
        type="textarea"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your happy thought here..."
        required={true}
        minLength={MIN}
        maxLength={MAX}
      />

      <Button
        variant="input"
        type="submit"
        text="❤️ Send Happy Thought ❤️"
      />
    </StyledForm>
  )
}
