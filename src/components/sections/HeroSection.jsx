import { BodyText, PageTitle } from '../typography/typography'
import { StyledSection } from '../../styles/StyledSection'

export const HeroSection = ({ variant }) => {
  return (
    <StyledSection variant={variant} id="hero-section" >
      <PageTitle 
      variant={variant} 
      title="Welcome to Happy Thoughts!"/>
      <BodyText 
      variant={variant} textAlign="center" 
      text="Share your happy thoughts and spread positivity. Connect with others and brighten someone's day!"/>
    </StyledSection>
      
  )
}