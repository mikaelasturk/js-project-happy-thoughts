import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

import { resetPassword } from '../../data/api/api'

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

const ErrorText = styled.p`
  color: #b00020;
  margin: 0;
`

const SuccessText = styled.p`
  color: #0c7d2b;
  margin: 0;
`

const HelperText = styled.p`
  margin: 8px 0 0;
`

export const ResetPasswordPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!token) {
      setErrorMessage('Saknar token i länken')
      return
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Lösenorden matchar inte')
      return
    }

    setErrorMessage('')
    setSuccessMessage('')
    setIsSubmitting(true)

    try {
      const data = await resetPassword({ token, newPassword })
      setSuccessMessage(data?.message || 'Lösenordet är uppdaterat')
      setTimeout(() => navigate('/login'), 1200)
    } catch (error) {
      setErrorMessage(error.message || 'Kunde inte återställa lösenordet')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Wrapper>
      <Card>
        <Title>Återställ lösenord</Title>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="reset-password">
            Nytt lösenord
            <Input
              id="reset-password"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              minLength={8}
              required
            />
          </Label>

          <Label htmlFor="reset-password-confirm">
            Bekräfta nytt lösenord
            <Input
              id="reset-password-confirm"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              minLength={8}
              required
            />
          </Label>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sparar...' : 'Uppdatera lösenord'}
          </Button>

          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
          {successMessage && <SuccessText>{successMessage}</SuccessText>}
        </Form>

        <HelperText>
          Tillbaka till <Link to="/login">logga in</Link>
        </HelperText>
      </Card>
    </Wrapper>
  )
}
