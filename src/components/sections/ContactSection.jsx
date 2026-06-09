
import { SocialMediaContainer } from '../cards/cards'
import { StyledSection } from '../../styles/styles'
import { BodyText } from '../typography/typography'
import { contentStore } from '../../stores/contentStore'

export const ContactSection = ({ variant }) => {
  const { content } = contentStore();
  return (
    <StyledSection $variant={variant} id="contact-section">
      <SocialMediaContainer />
      <BodyText textAlign="center" text={content.copyright} />
    </StyledSection>
  )
}