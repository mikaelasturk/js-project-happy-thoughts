import styled from "styled-components"

const StyledPageTitle = styled.h1`
  color: ${({ theme, variant }) => variant ? theme.sections[variant].headingClr: "inherit"};
  text-align: center;
`;

export const PageTitle = ({ title, variant }) => {
  return (
    <StyledPageTitle variant={variant}>
      {title}
    </StyledPageTitle>
  )
}
