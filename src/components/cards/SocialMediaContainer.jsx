import  styled from "styled-components"
import { LinkedInIcon, GithubIcon, StackOverflowIcon, TwitterIcon, InstagramIcon,  } from "../svg-icons/svg-icons"
import { SvgIcon } from "../ui/SvgIcon"

const SocialMediaWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;

  a {
    color: #D0D0D0;
    transition: color 0.3s ease;

    &:hover {
      color: #000000;
    }
  }
`

export const SocialMediaContainer = () => {
  return (
    <SocialMediaWrapper>
      <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
        <LinkedInIcon />
      </a>
      <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer">
        <SvgIcon width="32" viewBox="0 0 32 32" icon={<GithubIcon />} />
      </a>
      <a href="https://stackoverflow.com/users/yourprofile" target="_blank" rel="noopener noreferrer">
        <StackOverflowIcon />
      </a>
      <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
        <TwitterIcon />
      </a>
      <a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
        <InstagramIcon />
      </a>  
    </SocialMediaWrapper>
  )
}
