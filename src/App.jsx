import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { theme, GlobalStyle } from './styles/styles'
import { BodyWrapper } from './components/layout/layout'
import { 
  HeroSection,
  InputSection,
  MessageSection,
  ContactSection
} from './components/sections/sections'

export const App = () => {

 const [messages, setMessages] = useState([])

  const addMessage = (text) => {
    const newMessage = {
      id: crypto.randomUUID(),
      text,
      createdAt: Date.now(),
      likes: 0
    }
    setMessages((prev) => [newMessage, ...prev])
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
            <InputSection variant="input" onSendMessage={addMessage} />
            <MessageSection variant="message" messages={messages} />
          </main>
          <footer>
            <ContactSection />
          </footer>
        </BodyWrapper>
      </ThemeProvider>
    </>

  )
}