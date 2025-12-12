import { useState, useRef } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme, GlobalStyle } from './styles/styles'
import { BodyWrapper } from './components/layout/layout'
import { 
  HeroSection,
  FormSection,
  MessageSection,
  ContactSection
} from './components/sections/sections'

export const App = () => {

  const [messages, setMessages] = useState([])
 const idRef = useRef(0)

  const addMessage = (text) => {
    const newMessage = {
      id: idRef.current,
      text,
      createdAt: Date.now(),
      likes: 0,
      liked: false
    }
    setMessages((prev) => [newMessage, ...prev])
    idRef.current += 1
  }

  const addLike = (id) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id
          ? {
              ...msg,
              likes: msg.likes + 1,
              liked: true
            }
          : msg
      )
    )
  } 


  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <BodyWrapper>
          <header>
            <HeroSection />
          </header>
          <main> 
            <FormSection 
            variant="input" 
            onSendMessage={addMessage} />
            <MessageSection 
            variant="message" 
            messages={messages} 
            onLike={addLike} 
            />
          </main>
          <footer>
            <ContactSection />
          </footer>
        </BodyWrapper>
      </ThemeProvider>
    </>

  )
}