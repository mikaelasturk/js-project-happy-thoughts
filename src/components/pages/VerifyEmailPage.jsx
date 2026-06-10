import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

import { verifyEmail } from '../../data/api/api'

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

const Message = styled.p`
  margin: 0;
`

const ErrorText = styled.p`
  color: #b00020;
  margin: 0;
`

const SuccessText = styled.p`
  color: #0c7d2b;
  margin: 0;
`

export const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''

  const [isVerifying, setIsVerifying] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const run = async () => {
      if (!token) {
        setErrorMessage('Verifieringstoken saknas i länken')
        setIsVerifying(false)
        return
      }

      try {
        const data = await verifyEmail({ token })
        setSuccessMessage(data?.message || 'E-post verifierad. Du kan nu logga in.')
      } catch (error) {
        setErrorMessage(error.message || 'Kunde inte verifiera e-post')
      } finally {
        setIsVerifying(false)
      }
    }

    run()
  }, [token])

  return (
    <Wrapper>
      <Card>
        <Title>Verifiera e-post</Title>
        {isVerifying && <Message>Verifierar...</Message>}
        {!isVerifying && successMessage && <SuccessText>{successMessage}</SuccessText>}
        {!isVerifying && errorMessage && <ErrorText>{errorMessage}</ErrorText>}

        <Message>
          Tillbaka till <Link to="/login">logga in</Link>
        </Message>
      </Card>
    </Wrapper>
  )
}
