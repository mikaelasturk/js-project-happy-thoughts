import styled from 'styled-components'
import { BodyText } from '../typography/typography'

const StyledInputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  input, textarea {
    padding: 12px;
    border: 1px solid ${({ $invalid }) => ($invalid ? 'red' : '#000')};
    border-radius: 4px;
    font-size: 16px;
  }

  input:focus, textarea:focus {
    outline: 2px solid #000;
    outline-offset: 2px;
  }
`

export const InputField = ({
  id,
  type,
  onChange,
  onKeyDown,          // <-- LÄGG TILL
  placeholder,
  required,
  value,
  minLength = 5,
  maxLength = 140
}) => {
  const currentLength = value.length
  const remaining = maxLength - currentLength
  const isOverMax = currentLength > maxLength
  const isUnderMin = required && currentLength > 0 && currentLength < minLength
  const isInvalid = isOverMax || isUnderMin

  return (
    <StyledInputField $invalid={isInvalid}>
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}   // <-- LÄGG TILL
          placeholder={placeholder}
          required={required}
          rows={5}
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

      <BodyText text={`${remaining} characters left`} />

      {isUnderMin && <BodyText text={`Minimum is ${minLength} characters`} />}
      {isOverMax && <BodyText text={`Maximum is ${maxLength} characters`} />}
    </StyledInputField>
  )
}
