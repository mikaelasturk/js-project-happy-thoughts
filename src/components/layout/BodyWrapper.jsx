import styled from "styled-components";

const StyledBodyWrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0;
`


export const BodyWrapper = ({ children }) => {
  return (
    <StyledBodyWrapper>
      {children}
    </StyledBodyWrapper>
  )
}