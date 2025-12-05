import styled from "styled-components"

const StyledTag = styled.span`
  background-color: var(--tag-bg-clr);
  color: var(--tag-txt-clr);
  padding: 1px 8px;
  font-size: var(--tag-font-size);
  font-weight: var(--tag-font-weight);
  font-family: var(--tag-font);
  max-width: fit-content;
`

export const Tag = ({ tag }) => {
  return (
      <StyledTag className="tag">
        {tag}
      </StyledTag>
  )
}