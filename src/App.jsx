import { ThemeProvider } from 'styled-components'
import { theme, GlobalStyle } from './styles/styles'
// import { 
//   HeroSection, 
//   TechSection, 
//   ProjectSection, 
//   WavePathSection,
//   ArticleSection, 
//   SkillsSection, 
//   ContactSection 
// } from './components/sections/sections.js'

export const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <header>
          <h1>Happy Thoughts</h1>
        </header>
        <main> 
        </main>
        <footer>
        </footer>
      </ThemeProvider>
    </>

  )
}