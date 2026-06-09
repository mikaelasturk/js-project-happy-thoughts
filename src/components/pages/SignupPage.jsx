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

export const SignupPage = () => {
  const navigate = useNavigate()
  const { setUser, setToken } = userStore()
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const cleanName = name.trim()
    const cleanUsername = username.trim()
    const cleanEmail = email.trim()
    if (!cleanName || !cleanUsername || !cleanEmail || !password.trim()) return

    setUser({
      name: cleanName,
      username: cleanUsername,
      email: cleanEmail,
    })
    setToken('local-session-token')
    navigate('/')
  }

  return (
    <Wrapper>
      <PageHeader>
        <PageHeaderTitle>Skapa konto</PageHeaderTitle>
        <PageHeaderText>Borja dela dina happy thoughts.</PageHeaderText>
      </PageHeader>
      <Card>
        <Title>Skapa konto</Title>
        <StyledForm onSubmit={handleSubmit}>
          <Label htmlFor="signup-name">
            Namn
            <Input
              id="signup-name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Label>

          <Label htmlFor="signup-email">
            E-post
            <Input
              id="signup-email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Label>

          <Label htmlFor="signup-username">
            Användarnamn
            <Input
              id="signup-username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Label>

          <Label htmlFor="signup-password">
            Losenord
            <Input
              id="signup-password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </Label>

          <Button type="submit">Skapa konto</Button>
        </StyledForm>

        <Meta>
          Har du redan konto? <Link to="/login">Logga in</Link>
        </Meta>
      </Card>
    </Wrapper>
  )
}
