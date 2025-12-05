import styled from "styled-components"
import { CardImage, Tag, Button, SvgIcon } from "../ui/ui"
import { CardTitle, BodyText } from "../typography/typography"
import { DocumentIcon } from "../svg-icons/svg-icons"

const StyledArticleCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px; 
`

export const ArticleCard = ({ article }) => {
  return (
    <StyledArticleCard>
      <CardImage src={article.image} alt={article.alt}/>
      <Tag tag={article.date} />
      <CardTitle title={article.name} />
      <BodyText text={article.description} />
      <Button href={article.link} text= "Read article" variant="article">
        <SvgIcon icon={<DocumentIcon />} width="44" viewBox="0 0 50 50" />
      </Button>
    </StyledArticleCard>
  )
}