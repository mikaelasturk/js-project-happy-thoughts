import styled from 'styled-components'
import { Avatar } from '../ui/ui'
import { BodyText, PageTitle } from '../typography/typography'
import { intro, role, description } from "../../data/aboutMe"
import { StyledSection } from '../../styles/StyledSection'
import { ArrowDown } from '../svg-icons/svg-icons'
import { ArrowDownSectionLink } from '../ui/ui'


// Don't show from Tablet breakpoint and up
const MobileLayout = styled.div`
  display: block;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`
// Don't show up until Tablet breakpoint
const DesktopLayout = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`
// Grouping intro and PageTitle
const StyledContainer1 = styled.div`
  display: flex;
  flex-direction: column;
`

// Grouping Avatar and description
const StyledContainer2 = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
`

export const HeroSection = ({ variant }) => {
  return (
    <>
      <MobileLayout >  
        <StyledSection variant={variant} 
        padding="56px 16px" 
        gap="32px">
          <Avatar />
          <StyledContainer1>
            <BodyText text={intro} weight="semibold" fontFam="heading" />
            <PageTitle title={role} variant={variant} />
          </StyledContainer1>
          <BodyText text={description} />
        </StyledSection>
        <ArrowDownSectionLink>
          <ArrowDown />
        </ArrowDownSectionLink>
      </MobileLayout >
      <DesktopLayout >
        <StyledSection variant={variant} 
        paddingTablet="120px 32px" 
        paddingDesktop="330px 160px 180px"
        paddingDesktopL="330px 230px"
        gapTablet="44px">
          <StyledContainer1>
            <BodyText text={intro} weight="semibold" fontFam="heading"
            fontSizeT="tablet"
            fontSizeD="desktop" />
            <PageTitle title={role} variant={variant} />
          </StyledContainer1>
          <StyledContainer2>
            <Avatar />
            <BodyText text={description} />
          </StyledContainer2>
        </StyledSection>
        <ArrowDownSectionLink>
          <ArrowDown />
        </ArrowDownSectionLink>
      </DesktopLayout >
    </>
  )
}