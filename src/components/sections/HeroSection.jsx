
import { BodyText, PageTitle } from '../typography/typography'
import { StyledSection } from '../../styles/styles'
import { contentStore } from '../../stores/contentStore'
import { userStore } from '../../stores/userStore'

export const HeroSection = ({ variant }) => {
  const { content } = contentStore();
  const user = userStore((state) => state.user);
  const displayName = user?.firstName;
  const heroTitle = displayName
    ? `Welcome to happythoughts, ${displayName}!`
    : content.heroTitle;

  return (
    <StyledSection $variant={variant} id="hero-section" >
      <PageTitle 
        variant={variant} 
        title={heroTitle}
      />
      <BodyText 
        variant={variant} textAlign="center" 
        text={content.heroBody}
      />
    </StyledSection>
  )
}