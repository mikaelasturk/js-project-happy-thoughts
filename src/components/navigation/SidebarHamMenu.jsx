// [ ] Lägg till contentStore
// [ ] Ändra till rätt färger i theme

import styled from "styled-components"
import { NavLink } from "react-router-dom"


const StyledButton = styled.button`
  color: ${({ theme }) => theme.navbar.txtClr};
  background-color: transparent;
  border: none;
  z-index: 4001;
  position: relative;
  margin-left: 20px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`

const StyledNavContent = styled.div`
  position: absolute;
  z-index: 4000;
  padding: 0 24px 42px 24px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.konto.mainPage.bgClr};
  align-items: center;
  width: 100vw;
  height: 50vh;
  transition: transform 0.3s ease-in-out, opacity 0.5s ease;
  transform: ${({ $expanded }) => ($expanded ? "translateY(0)" : "translateY(-100%)")};
  opacity: ${({ $expanded }) => ($expanded ? "1" : "0")};
  pointer-events: ${({ $expanded }) => ($expanded ? "all" : "none")};
  visibility: ${({ $expanded }) => ($expanded ? "visible" : "hidden")}; // För att förhindra att tabba genom menyn när den är stängd
`

const StyledSpan = styled.span`
  display: block;
  height: 4px;
  width: 40px;
  background: ${({ theme }) => theme.konto.sidebar.links.borderClrActive};
  margin: 8px 0;
  border-radius: 2px;
  transition: transform 0.4s ease, opacity 0.3s ease;
`

const StyledFirstSpan = styled(StyledSpan)`
  transform: ${({ $expanded }) => ($expanded ? "translateY(12px) rotate(45deg)" : "initial")};
`

const StyledSecondSpan = styled(StyledSpan)`
  opacity: ${({ $expanded }) => ($expanded ? "0" : "initial")};
`

const StyledThirdSpan = styled(StyledSpan)`
  transform: ${({ $expanded }) => ($expanded ? "translateY(-12px) rotate(-45deg)" : "initial")};
`

const StyledHamList = styled.ul`
  list-style: none;
  padding-top: 100px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const StyledNavLink = styled(NavLink)`
  display: block;
  padding: 14px 14px;
  background: ${({ theme }) => theme.konto.sidebar.links.bgClr};
  color: ${({ theme }) => theme.konto.sidebar.links.txtClr};
  text-transform: uppercase;
  letter-spacing: 2.5px;
  border: 1px solid transparent;

  &.active {
    border-color: ${({ theme }) => theme.konto.sidebar.links.borderClrActive};
  }
`

export const SidebarHamMenu = ({ expanded, onToggle }) => {
  return (
    <>
      <StyledButton
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-label="Main menu"
        aria-controls="hamMenuList"
      >
        <StyledFirstSpan $expanded={expanded} aria-hidden="true" />
        <StyledSecondSpan $expanded={expanded} aria-hidden="true" />
        <StyledThirdSpan $expanded={expanded} aria-hidden="true" />
      </StyledButton>
      <StyledNavContent $expanded={expanded}>
        <StyledHamList id="hamMenuList">
          <li><StyledNavLink to="/konto/mina-sidor" onClick={() => onToggle(false)}>MINA SIDOR</StyledNavLink></li>
          <li><StyledNavLink to="/konto/medlemskap" onClick={() => onToggle(false)}>MEDLEMSKAP</StyledNavLink></li>
          <li><StyledNavLink to="/konto/events" onClick={() => onToggle(false)}>EVENTS</StyledNavLink></li>
          <li><StyledNavLink to="/konto/erbjudanden" onClick={() => onToggle(false)}>ERBJUDANDEN</StyledNavLink></li>
        </StyledHamList>
      </StyledNavContent>
    </>
  )
}
