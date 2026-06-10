import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'

import { theme, GlobalStyle } from '../../styles/styles'
import { Navbar } from '../navigation/Navbar'
import { ContactSection } from '../sections/sections'
import { BodyWrapper } from './BodyWrapper'

const PageShell = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  padding-bottom: 180px;
`

const LayoutFooter = styled.footer`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 950;
  background: var(--1st-bg-clr);
  border-top: 1px solid var(--border-clr);
`

export const AppLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      return localStorage.getItem('happy-thoughts-theme') === 'dark'
    } catch {
      return false
    }
  })

  useEffect(() => {
    const mode = isDarkMode ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', mode)
    localStorage.setItem('happy-thoughts-theme', mode)
  }, [isDarkMode])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageShell>
        <BodyWrapper>
          <Navbar
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
          />
          <Outlet />
        </BodyWrapper>
        <LayoutFooter>
          <ContactSection variant="contact"/>
        </LayoutFooter>
      </PageShell>
    </ThemeProvider>
  )
}
