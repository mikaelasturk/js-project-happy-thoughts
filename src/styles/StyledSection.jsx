import styled from "styled-components";

export const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${({ theme, variant }) => variant ? theme.sections[variant].bgClr : "inherit"};
  color: ${({ theme, variant }) => variant ? theme.sections[variant].textClr : "inherit"};
  padding: ${({ padding }) => padding || "120px 16px"};
  gap: ${({ gap }) => gap || "56px"};

  /* Tablet and up --> */
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: ${({ paddingTablet }) => paddingTablet || "120px 32px"};
    gap: ${({ gapTablet }) => gapTablet || "gap"};
  }

  /* Desktop and up --> */
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: ${({ paddingDesktop }) => paddingDesktop || "120px 140px"};  
    gap: ${({ gapDesktop }) => gapDesktop || "gap"};
  }
  /* Desktop Large and up --> */
  @media (min-width: ${({ theme }) => theme.breakpoints.desktopLarge}) {
      padding: ${({ paddingDesktopL }) => paddingDesktopL || "140px 230px"};  
    gap: ${({ gapDesktopL }) => gapDesktopL || "gap"};
  }
`