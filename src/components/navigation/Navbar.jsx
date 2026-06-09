import styled from 'styled-components'
import { NavLink, useNavigate } from 'react-router-dom'
import { userStore } from '../../stores/userStore'

const StyledNavbar = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid #d8d8d8;
  background: rgba(255, 255, 255, 0.96);
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

const NavLinks = styled.div`
  display: flex;
  gap: 10px;
`

const StyledNavLink = styled(NavLink)`
  color: #111;
  text-decoration: none;
  padding: 4px 8px;
  border: 1px solid transparent;
  border-radius: 999px;

  &:hover,
  &:focus-visible {
    border-color: #111;
  }

  &.active {
    background: #111;
    color: #fff;
  }
`

const AuthButton = styled.button`
  border: 1px solid #111;
  border-radius: 999px;
  padding: 6px 14px;
  background: #fff;
  color: #111;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: #111;
    color: #fff;
  }
`

export const Navbar = () => {
  const navigate = useNavigate()
  const { user, token, logout } = userStore()

  const isLoggedIn = Boolean(
    token || user?.accessToken || user?.savedUser?.accessToken,
  )

  const handleAuthClick = () => {
    if (isLoggedIn) {
      logout()
      return
    }

    navigate('/login')
  }

  return (
    <StyledNavbar aria-label="Top navigation">
      <LeftGroup>
        <Brand>Happy Thoughts</Brand>
        <NavLinks>
          <StyledNavLink to="/" end>Hem</StyledNavLink>
        </NavLinks>
      </LeftGroup>
      <AuthButton type="button" onClick={handleAuthClick}>
        {isLoggedIn ? 'Logga ut' : 'Logga in'}
      </AuthButton>
    </StyledNavbar>
  )
}
