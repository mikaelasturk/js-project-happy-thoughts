import styled from "styled-components"

const StyledListItem = styled.li`
  font-family: var(--font-heading);
`

export const ListItem = ({ item }) => {
  return (
    <StyledListItem>
      {item}
    </StyledListItem>
  )
}