import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { userStore } from '../../stores/userStore'

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

const Button = styled.button`
  border: 1px solid #111;
  border-radius: 999px;
  padding: 8px 14px;
  background: #111;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
`

const Meta = styled.p`
  margin: 10px 0 0;
`

export const LoginPage = () => {
  const navigate = useNavigate()
  const { setUser, setToken } = userStore()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const cleanIdentifier = identifier.trim()
    if (!cleanIdentifier || !password.trim()) return

    const isEmail = cleanIdentifier.includes('@')
    setUser(
      isEmail
        ? { email: cleanIdentifier }
        : { username: cleanIdentifier },
    )
    setToken('local-session-token')
    navigate('/')
  }

  return (
    <Wrapper>
      <PageHeader>
        <PageHeaderTitle>Logga in</PageHeaderTitle>
        <PageHeaderText>Valkommen tillbaka.</PageHeaderText>
      </PageHeader>
      <Card>
        <Title>Logga in</Title>
        <StyledForm onSubmit={handleSubmit}>
          <Label htmlFor="login-identifier">
            E-post eller användarnamn
            <Input
              id="login-identifier"
              name="identifier"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="namn@mail.se eller användarnamn"
              required
            />
          </Label>

          <Label htmlFor="login-password">
            Lösenord
            <Input
              id="login-password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </Label>

          <Button type="submit">Logga in</Button>
        </StyledForm>

        <Meta>
          Har du inget konto? <Link to="/signup">Skapa konto</Link>
        </Meta>
      </Card>
    </Wrapper>
  )
}
