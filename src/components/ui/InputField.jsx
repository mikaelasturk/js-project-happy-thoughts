
import styled from 'styled-components'
import { BodyText } from '../typography/typography'
import { contentStore } from '../../stores/contentStore'

const StyledInputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  input, textarea {
    padding: 12px;
    border: 1px solid ${({ $invalid }) => ($invalid ? 'red' : 'gray')};
    border-radius: 2px;
    font-size: 16px;
  }

  input:focus, textarea:focus {
    outline: 2px solid ${({ $invalid }) => ($invalid ? 'red' : '#000')};
  }

  textarea {
    resize: vertical;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: flex-end;
  
  
  /* Tablet and up --> */
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    justify-content: space-between;
  }

  /* Desktop and up --> */
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    
  }

  /* Desktop Large and up --> */
  @media (min-width: ${({ theme }) => theme.breakpoints.desktopLarge}) {
    
  }
`

export const InputField = ({
  id,
  labelText,
  type,
  onChange,
  onKeyDown,          
  placeholder,
  required,
  value,
  minLength = 5,
  maxLength = 140
}) => {
  const { content } = contentStore();
  const currentLength = value.length
  const remaining = maxLength - currentLength
  const isOverMax = currentLength > maxLength
  const isUnderMin = required && currentLength > 0 && currentLength < minLength
  const isInvalid = isOverMax || isUnderMin

  return (
    <StyledInputField $invalid={isInvalid}>
      <label htmlFor={id}>{labelText}</label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}  
          placeholder={placeholder}
          required={required}
          rows={2}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={id}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown} 
          placeholder={placeholder}
          required={required}
        />
      )}
      <Wrapper>
        {isUnderMin && <BodyText text={content.minLengthMsg(minLength)} />}
        {isOverMax && <BodyText text={content.maxLengthMsg(maxLength)} />}
        <BodyText marginLeft="auto" text={content.charsLeftMsg(remaining)} />
      </Wrapper>
    </StyledInputField>
  )
}
