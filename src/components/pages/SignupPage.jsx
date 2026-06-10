import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { signupUser } from '../../data/api/api'
import swedishCities from '../../data/swedishCities.json'

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

const Select = styled.select`
  width: 100%;
  border: 1px solid #c9c9c9;
  border-radius: 8px;
  padding: 10px;
  background: #fff;
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

export const SignupPage = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [cityValue, setCityValue] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showProfileFields, setShowProfileFields] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [devVerificationLink, setDevVerificationLink] = useState('')
  const [devEmailPreviewUrl, setDevEmailPreviewUrl] = useState('')

  const passwordsDoNotMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password !== confirmPassword

  const stepOneReady =
    email.trim().length > 0 &&
    password.trim().length >= 8 &&
    confirmPassword.trim().length >= 8 &&
    !passwordsDoNotMatch

  const handleContinue = () => {
    if (!stepOneReady) {
      if (passwordsDoNotMatch) {
        setErrorMessage('Lösenorden matchar inte')
      }
      return
    }

    setErrorMessage('')
    setShowProfileFields(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!showProfileFields) {
      handleContinue()
      return
    }

    const cleanFirstName = firstName.trim()
    const cleanLastName = lastName.trim()
    const cleanUsername = username.trim()
    const cleanEmail = email.trim()
    const cleanPassword = password.trim()
    const cleanConfirmPassword = confirmPassword.trim()
    if (!cleanFirstName || !cleanLastName || !cleanUsername || !cityValue || !cleanEmail || !cleanPassword || !cleanConfirmPassword) return

    if (cleanPassword !== cleanConfirmPassword) {
      setErrorMessage('Lösenorden matchar inte')
      return
    }

    setErrorMessage('')
    setSuccessMessage('')
    setDevVerificationLink('')
    setDevEmailPreviewUrl('')
    setIsSubmitting(true)

    try {
      const data = await signupUser({
        firstName: cleanFirstName,
        lastName: cleanLastName,
        username: cleanUsername,
        cityValue,
        email: cleanEmail,
        password: cleanPassword,
      })
      setSuccessMessage(data?.message || 'Konto skapat. Verifiera din e-post innan inloggning.')
      if (data?.devVerificationLink) setDevVerificationLink(data.devVerificationLink)
      if (data?.devEmailPreviewUrl) setDevEmailPreviewUrl(data.devEmailPreviewUrl)

      setShowProfileFields(false)
      setFirstName('')
      setLastName('')
      setUsername('')
      setCityValue('')
      setPassword('')
      setConfirmPassword('')

      setTimeout(() => navigate('/login'), 1800)
    } catch (error) {
      setErrorMessage(error.message || 'Kunde inte skapa konto')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Wrapper>
      <PageHeader>
        <PageHeaderTitle>Skapa konto</PageHeaderTitle>
        <PageHeaderText>Börja dela dina happy thoughts!</PageHeaderText>
      </PageHeader>
      <Card>
        <StyledForm onSubmit={handleSubmit} autoComplete="off">
          <Label htmlFor="signup-email">
            Email
            <Input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errorMessage) setErrorMessage('')
              }}
              required
            />
          </Label>

          <Label htmlFor="signup-password">
            Lösenord
            <PasswordField>
              <PasswordInput
                id="signup-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errorMessage) setErrorMessage('')
                }}
                required
                minLength={8}
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

          <Label htmlFor="signup-confirm-password">
            Bekräfta lösenord
            <PasswordField>
              <PasswordInput
                id="signup-confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  if (errorMessage) setErrorMessage('')
                }}
                required
                minLength={8}
              />
              <TogglePasswordButton
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? 'Dölj bekräfta lösenord' : 'Visa bekräfta lösenord'}
              >
                {showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />}
              </TogglePasswordButton>
            </PasswordField>
          </Label>

          {showProfileFields && (
            <>
              <Label htmlFor="signup-first-name">
                Förnamn
                <Input
                  id="signup-first-name"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value)
                    if (errorMessage) setErrorMessage('')
                  }}
                  required
                />
              </Label>

              <Label htmlFor="signup-last-name">
                Efternamn
                <Input
                  id="signup-last-name"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value)
                    if (errorMessage) setErrorMessage('')
                  }}
                  required
                />
              </Label>

              <Label htmlFor="signup-username">
                Användarnamn
                <Input
                  id="signup-username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    if (errorMessage) setErrorMessage('')
                  }}
                  required
                />
              </Label>

              <Label htmlFor="signup-city">
                Stad
                <Select
                  id="signup-city"
                  name="cityValue"
                  value={cityValue}
                  onChange={(e) => {
                    setCityValue(e.target.value)
                    if (errorMessage) setErrorMessage('')
                  }}
                  required
                >
                  <option value="">Välj stad</option>
                  {swedishCities.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                  ))}
                </Select>
              </Label>
            </>
          )}

          {showProfileFields ? (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Skapar konto...' : 'Skapa konto'}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleContinue}
              disabled={!stepOneReady}
            >
              Fortsätt
            </Button>
          )}
          {passwordsDoNotMatch && <ErrorText>Lösenorden matchar inte</ErrorText>}
          {successMessage && <p>{successMessage}</p>}
          {devVerificationLink && (
            <p>
              Dev-verifieringslänk: <a href={devVerificationLink}>{devVerificationLink}</a>
            </p>
          )}
          {devEmailPreviewUrl && (
            <p>
              Mail-preview: <a href={devEmailPreviewUrl} target="_blank" rel="noreferrer">Öppna testmail</a>
            </p>
          )}
          {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        </StyledForm>

        <Meta>
          Har du redan ett konto? <Link to="/login">Logga in</Link>
        </Meta>
      </Card>
    </Wrapper>
  )
}
