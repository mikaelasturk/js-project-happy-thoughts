import styled from "styled-components"

const StyledUL = styled.ul`
gap: 8px;
`

import { ListItem } from "./ui"

export const UnorderedList = ({ items }) => {
  return (
    <StyledUL>
      {items.map((item, index) => (
        <ListItem key={index} item={item} />
      ))}
    </StyledUL>
  )
}