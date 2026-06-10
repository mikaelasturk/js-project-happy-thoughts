import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { userStore } from '../../stores/userStore'

const iconEnter = keyframes`
  0% {
    opacity: 0;
    transform: rotate(-70deg) scale(0.78);
  }
  100% {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
`

const SunIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
  </svg>
)

const StyledNavbar = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid var(--border-clr);
  background: color-mix(in srgb, var(--1st-bg-clr) 94%, transparent);
  backdrop-filter: blur(6px);
`

const Brand = styled.span`
  font-weight: 700;
  letter-spacing: 0.4px;
`

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const NavLinks = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 767px) {
    display: none;
  }
`

const StyledNavLink = styled(NavLink)`
  color: var(--font-clr);
  text-decoration: none;
  padding: var(--btn-padding);
  border: 1px solid transparent;
  border-radius: 999px;

  &:hover,
  &:focus-visible {
    border-color: var(--border-clr);
  }

  &.active {
    background: var(--1st-clr);
    color: var(--2nd-clr);
  }
`

const AuthButton = styled.button`
  border: 1px solid var(--border-clr);
  border-radius: 999px;
  padding: var(--btn-padding);
  background: var(--1st-bg-clr);
  color: var(--font-clr);
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: var(--1st-clr);
    color: var(--2nd-clr);
  }

  @media (max-width: 767px) {
    display: none;
  }
`

const ModeButton = styled.button`
  width: 48px;
  height: 48px;
  border: 2px solid transparent;
  border-radius: 999px;
  padding: 8px;
  background: transparent;
  color: var(--font-clr);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, color 0.3s ease;

  &:hover {
    transform: scale(1.1) rotate(15deg);
    box-shadow: 0 4px 12px color-mix(in srgb, var(--font-clr) 18%, transparent);
    border-color: var(--font-clr);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid var(--highlight-clr);
    outline-offset: 2px;
  }
`

const MenuButton = styled.button`
  border: none;
  background: transparent;
  color: var(--font-clr);
  z-index: 4001;
  position: relative;
  display: none;
  padding: 0;
  margin-left: 4px;
  cursor: pointer;

  @media (max-width: 767px) {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const MenuLine = styled.span`
  display: block;
  height: 3px;
  width: 28px;
  background: var(--font-clr);
  margin: 3px 0;
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.2s ease;
`

const FirstLine = styled(MenuLine)`
  transform: ${({ $expanded }) => ($expanded ? 'translateY(9px) rotate(45deg)' : 'none')};
`

const SecondLine = styled(MenuLine)`
  opacity: ${({ $expanded }) => ($expanded ? '0' : '1')};
`

const ThirdLine = styled(MenuLine)`
  transform: ${({ $expanded }) => ($expanded ? 'translateY(-9px) rotate(-45deg)' : 'none')};
`

const MobileMenu = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  z-index: 3999;
  padding: 22px 16px 26px;
  background: var(--1st-bg-clr);
  border-bottom: 1px solid var(--border-clr);
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.28s ease-in-out, opacity 0.28s ease;
  transform: ${({ $expanded }) => ($expanded ? 'translateY(0)' : 'translateY(-12px)')};
  opacity: ${({ $expanded }) => ($expanded ? '1' : '0')};
  pointer-events: ${({ $expanded }) => ($expanded ? 'all' : 'none')};
  visibility: ${({ $expanded }) => ($expanded ? 'visible' : 'hidden')};

  @media (min-width: 768px) {
    display: none;
  }
`

const MobileLink = styled(NavLink)`
  color: var(--font-clr);
  text-decoration: none;
  padding: var(--btn-padding);
  border: 1px solid var(--border-clr);
  border-radius: 999px;
  text-align: center;
  font-weight: 600;

  &.active {
    background: var(--1st-clr);
    color: var(--2nd-clr);
  }
`

const MobileAuthButton = styled.button`
  border: 1px solid var(--border-clr);
  border-radius: 999px;
  padding: var(--btn-padding);
  background: var(--1st-bg-clr);
  color: var(--font-clr);
  cursor: pointer;
  font-weight: 600;
`

const ModeIcon = styled.span`
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  transition: transform 0.3s ease;
  animation: ${iconEnter} 220ms ease-out;

  svg {
    width: 100%;
    height: 100%;
    transition: color 0.3s ease;
  }

  ${ModeButton}:hover & {
    transform: rotate(-15deg);
  }
`

export const Navbar = ({ isDarkMode, onToggleDarkMode }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, token, logout } = userStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isLoggedIn = Boolean(
    token || user?.accessToken || user?.savedUser?.accessToken,
  )
  const username = user?.username || user?.savedUser?.username
  const myThoughtsPath = username ? `/users/${encodeURIComponent(username)}` : null

  const handleAuthClick = () => {
    if (isLoggedIn) {
      logout()
      setIsMenuOpen(false)
      return
    }

    navigate('/login')
    setIsMenuOpen(false)
  }

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const mediaQuery = window.matchMedia('(min-width: 768px)')

    const closeOnDesktop = (event) => {
      if (event.matches) setIsMenuOpen(false)
    }

    if (mediaQuery.matches) setIsMenuOpen(false)

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', closeOnDesktop)
      return () => mediaQuery.removeEventListener('change', closeOnDesktop)
    }

    mediaQuery.addListener(closeOnDesktop)
    return () => mediaQuery.removeListener(closeOnDesktop)
  }, [])

  return (
    <StyledNavbar aria-label="Top navigation">
      <LeftGroup>
        <Brand>Happy Thoughts</Brand>
        <NavLinks>
          <StyledNavLink to="/" end>Hem</StyledNavLink>
          {isLoggedIn && myThoughtsPath && (
            <StyledNavLink to={myThoughtsPath}>Mina thoughts</StyledNavLink>
          )}
          {isLoggedIn && <StyledNavLink to="/konto">Konto</StyledNavLink>}
        </NavLinks>
      </LeftGroup>
      <RightGroup>
        <ModeButton
          type="button"
          onClick={onToggleDarkMode}
          aria-label={isDarkMode ? 'Växla till ljust läge' : 'Växla till mörkt läge'}
          title={isDarkMode ? 'Ljust läge' : 'Mörkt läge'}
        >
          <ModeIcon key={isDarkMode ? 'sun' : 'moon'}>{isDarkMode ? <SunIcon /> : <MoonIcon />}</ModeIcon>
        </ModeButton>
        <AuthButton type="button" onClick={handleAuthClick}>
          {isLoggedIn ? 'Logga ut' : 'Logga in'}
        </AuthButton>
        <MenuButton
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-label="Main menu"
          aria-controls="mobile-nav-menu"
        >
          <FirstLine $expanded={isMenuOpen} aria-hidden="true" />
          <SecondLine $expanded={isMenuOpen} aria-hidden="true" />
          <ThirdLine $expanded={isMenuOpen} aria-hidden="true" />
        </MenuButton>
      </RightGroup>
      <MobileMenu id="mobile-nav-menu" $expanded={isMenuOpen}>
        <MobileLink to="/" end>Hem</MobileLink>
        {isLoggedIn && myThoughtsPath && (
          <MobileLink to={myThoughtsPath}>Mina thoughts</MobileLink>
        )}
        {isLoggedIn && <MobileLink to="/konto">Konto</MobileLink>}
        <MobileAuthButton type="button" onClick={handleAuthClick}>
          {isLoggedIn ? 'Logga ut' : 'Logga in'}
        </MobileAuthButton>
      </MobileMenu>
    </StyledNavbar>
  )
}
