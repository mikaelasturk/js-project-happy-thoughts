import styled from "styled-components";

const StyledBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`


export const BodyWrapper = ({ children }) => {
  return (
    <StyledBodyWrapper>
      {children}
    </StyledBodyWrapper>
  )
}