import styled from 'styled-components'
import { SectionTitle } from "../typography/typography"
import { SkillColumn } from "../cards/cards"
import skills from "../../data/skills"
import { StyledSection } from '../../styles/StyledSection'

const GridContainer = styled.div`
  display: flex;  
  flex-direction: column;
  gap: 40px;

  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {      
    display: grid;
    width: fit-content;
    margin: 0 auto;
    grid-template-columns: repeat(2, 200px);
    column-gap: 20px;
    row-gap: 40px;
  }       

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {      
    grid-template-columns: repeat(4, 200px);
    column-gap: 40px;
  }
`
 

export const SkillsSection = ({ variant }) => {
  return (
    <StyledSection variant={variant} gap="56px" padding="120px 16px">
      <SectionTitle title="Skills" variant={variant} />
      <GridContainer>
        {skills.skillsList.map((skill, index) => (
          <SkillColumn 
          key={index} 
          colIndex={index}
          skillsList={skill}/>
        ))}
      </GridContainer>
    </StyledSection>
  )
}