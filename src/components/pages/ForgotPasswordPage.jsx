import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { forgotPassword } from '../../data/api/api'

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  gap: 16px;
`

const Card = styled.section`
  width: min(100%, 460px);
  background: #fff;
  border: 1px solid #d8d8d8;
  border-radius: 12px;
  padding: 18px;
`

const Title = styled.h1`
  margin: 0 0 12px;
  font-size: 1.4rem;
`

const Form = styled.form`
  display: grid;
  gap: 10px;
`

const Label = styled.label`
  display: grid;
  gap: 6px;
  font-weight: 600;
`

const Input = styled.input`
  width: 100%;
  border: 1px solid #c9c9c9;
  border-radius: 8px;
  padding: 10px;
`

const Button = styled.button`
  border: 1px solid #111;
  border-radius: 999px;
  padding: var(--btn-padding);
  background: #111;
  color: #fff;
  cursor: pointer;
  font-weight: 600;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const HelperText = styled.p`
  margin: 8px 0 0;
  word-break: break-all;
`

const ErrorText = styled.p`
  color: #b00020;
  margin: 0;
`

const SuccessText = styled.p`
  color: #0c7d2b;
  margin: 0;
`

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [devResetLink, setDevResetLink] = useState('')
  const [devEmailPreviewUrl, setDevEmailPreviewUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const cleanEmail = email.trim().toLowerCase()
    if (!cleanEmail) return

    setErrorMessage('')
    setSuccessMessage('')
    setDevResetLink('')
    setDevEmailPreviewUrl('')
    setIsSubmitting(true)

    try {
      const data = await forgotPassword({ email: cleanEmail })
      setSuccessMessage(data?.message || 'Om kontot finns har instruktioner skickats till e-postadressen.')
      if (data?.devResetLink) setDevResetLink(data.devResetLink)
      if (data?.devEmailPreviewUrl) setDevEmailPreviewUrl(data.devEmailPreviewUrl)
    } catch (error) {
      setErrorMessage(error.message || 'Kunde inte skicka återställningslänk')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Wrapper>
      <Card>
        <Title>Glömt lösenord</Title>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="forgot-email">
            E-post
            <Input
              id="forgot-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="namn@mail.se"
              required
            />
          </Label>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Skickar...' : 'Skicka återställningslänk'}
          </Button>

          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
          {successMessage && <SuccessText>{successMessage}</SuccessText>}
          {devResetLink && (
            <HelperText>
              Dev-länk: <a href={devResetLink}>{devResetLink}</a>
            </HelperText>
          )}
          {devEmailPreviewUrl && (
            <HelperText>
              Mail-preview: <a href={devEmailPreviewUrl} target="_blank" rel="noreferrer">Öppna testmail</a>
            </HelperText>
          )}
        </Form>

        <HelperText>
          Tillbaka till <Link to="/login">logga in</Link>
        </HelperText>
      </Card>
    </Wrapper>
  )
}
