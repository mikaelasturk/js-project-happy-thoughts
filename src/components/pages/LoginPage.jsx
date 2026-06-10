import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { userStore } from '../../stores/userStore'
import { loginUser } from '../../data/api/api'

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.77 21.77 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 7 11 7a21.31 21.31 0 0 1-2.17 3.19" />
    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
)

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  gap: 16px;
`

const PageHeader = styled.header`
  text-align: center;
`

const PageHeaderTitle = styled.h1`
  margin: 0;
`

const PageHeaderText = styled.p`
  margin: 4px 0 0;
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

const StyledForm = styled.form`
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

const PasswordField = styled.div`
  position: relative;
`

const PasswordInput = styled(Input)`
  padding-right: 48px;
`

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  color: #111;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    height: 20px;
  }
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

const Meta = styled.p`
  margin: 10px 0 0;
`

const ErrorText = styled.p`
  color: #b00020;
  margin: 0;
`

export const LoginPage = () => {
  const navigate = useNavigate()
  const { setAuth } = userStore()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const cleanIdentifier = identifier.trim()
    if (!cleanIdentifier || !password.trim()) return

    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const data = await loginUser({
        identifier: cleanIdentifier,
        password,
      })

      const response = data?.response || {}
      setAuth({
        user: {
          id: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          username: response.username,
          city: response.cityValue,
        },
        token: response.accessToken,
      })
      navigate('/')
    } catch (error) {
      setErrorMessage(error.message || 'Kunde inte logga in')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Wrapper>
      <PageHeader>
        <PageHeaderTitle>Välkommen tillbaka!</PageHeaderTitle>
      </PageHeader>
      <Card>
        <Title>Logga in</Title>
        <StyledForm onSubmit={handleSubmit} >
          <Label htmlFor="login-identifier">
            Email eller användarnamn
            <Input
              id="login-identifier"
              name="identifier"
              type="text"
              autoComplete="username" 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="namn@mail.se eller användarnamn"
              required
            />
          </Label>

          <Label htmlFor="login-password">
            Lösenord
            <PasswordField>
              <PasswordInput
                id="login-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <TogglePasswordButton
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Dölj lösenord' : 'Visa lösenord'}
              >
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
              </TogglePasswordButton>
            </PasswordField>
          </Label>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Loggar in...' : 'Logga in'}
          </Button>
          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        </StyledForm>

        <Meta>
          <Link to="/forgot-password">Glömt lösenord?</Link>
        </Meta>

        <Meta>
          Har du inget konto? <Link to="/signup">Skapa konto</Link>
        </Meta>
      </Card>
    </Wrapper>
  )
}
