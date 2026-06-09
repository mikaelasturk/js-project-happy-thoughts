
import { BodyText, PageTitle } from '../typography/typography'
import { StyledSection } from '../../styles/styles'
import { contentStore } from '../../stores/contentStore'

export const HeroSection = ({ variant }) => {
  const { content } = contentStore();
  return (
    <StyledSection $variant={variant} id="hero-section" >
      <PageTitle 
        variant={variant} 
        title={content.heroTitle}
      />
      <BodyText 
        variant={variant} textAlign="center" 
        text={content.heroBody}
      />
    </StyledSection>
  )
}