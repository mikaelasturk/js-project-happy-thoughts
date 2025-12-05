import styled from 'styled-components';

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'stretch'};
  gap: ${({ gap }) => gap || '0px'};
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};

`;