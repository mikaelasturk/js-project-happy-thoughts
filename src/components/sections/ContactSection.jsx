import { SocialMediaContainer } from '../cards/cards'
import { StyledSection } from '../../styles/styles'
import { BodyText } from '../typography/typography'

export const ContactSection = ({ variant }) => {
  return (
     <StyledSection variant={variant} id="contact-section">
      <SocialMediaContainer />
      <BodyText text="© 2025 Mikaela Sturk. All rights reserved." />
    </StyledSection>
  )
}