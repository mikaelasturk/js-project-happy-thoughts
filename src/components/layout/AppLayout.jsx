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
  background: #fff;
  border-top: 1px solid #d8d8d8;
`

export const AppLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageShell>
        <BodyWrapper>
          <Navbar />
          <Outlet />
        </BodyWrapper>
        <LayoutFooter>
          <ContactSection variant="contact"/>
        </LayoutFooter>
      </PageShell>
    </ThemeProvider>
  )
}
