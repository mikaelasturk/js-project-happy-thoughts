import styled from 'styled-components'
import aboutMe from '../../data/aboutMe'

export const StyledAvatar = styled.img`
  width: 164px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  object-fit: cover;
  object-position: 50% 35%;
  flex-shrink: 0;
  display: block;
  margin: 0 auto;
  
`;

export const Avatar = () => {
  return (
    <StyledAvatar src={aboutMe.avatar} alt={aboutMe.name} />
  )
}