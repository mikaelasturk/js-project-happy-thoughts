import styled from 'styled-components'
import { Avatar } from '../ui/ui'
import { SectionTitle, BodyText } from '../typography/typography'
import { SocialMediaContainer } from '../cards/cards'
import aboutMe from '../../data/aboutMe'
import { StyledSection } from '../../styles/StyledSection'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
`



export const ContactSection = ({ variant }) => {
  return (
     <StyledSection variant={variant} gap="56px" padding="120px 16px">
      <SectionTitle title="Let's talk!" variant={variant} />
      <Avatar />
      <StyledDiv>
        <BodyText text={aboutMe.name} weight="semibold" fontSizeT="tablet"
        fontSizeD="desktop"fontFam="heading"/>
        <BodyText text={aboutMe.phone} weight="semibold" fontSizeT="tablet"
        fontSizeD="desktop"fontFam="heading"/>
        <BodyText text={aboutMe.email} weight="semibold" fontSizeT="tablet"
        fontSizeD="desktop"fontFam="heading"/>
      </StyledDiv>
      <SocialMediaContainer />
    </StyledSection>
  )
}