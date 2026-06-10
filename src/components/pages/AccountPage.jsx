import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { deleteMyAccount, updateMyAccount } from '../../data/api/api'
import swedishCities from '../../data/swedishCities.json'
import { userStore } from '../../stores/userStore'

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  padding: 24px 16px;
`

const Card = styled.section`
  width: min(100%, 700px);
  background: var(--1st-bg-clr);
  border: 1px solid var(--border-clr);
  border-radius: 12px;
  padding: 18px;
`

const Title = styled.h1`
  margin: 0 0 14px;
  font-size: 1.4rem;
`

const EmptyState = styled.p`
  margin: 0;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 10px;
  padding: 10px 0;
  border-top: 1px solid color-mix(in srgb, var(--border-clr) 18%, transparent);

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 6px;
    padding: 14px 0;
  }
`

const Label = styled.label`
  font-weight: 700;
  align-self: center;

  @media (max-width: 767px) {
    font-size: 0.95rem;
    opacity: 0.8;
  }
`

const Value = styled.span`
  overflow-wrap: anywhere;
`

const ReadOnlyField = styled.span`
  width: 100%;
  min-height: 42px;
  padding: 10px 0;
  display: inline-flex;
  align-items: center;
  overflow-wrap: anywhere;
`

const RowContent = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`

const Input = styled.input`
  width: 100%;
  border: 1px solid #c9c9c9;
  border-radius: 8px;
  padding: 10px;
  background: #fff;
`

const Select = styled.select`
  width: min(100%, 280px);
  border: 1px solid #c9c9c9;
  border-radius: 8px;
  padding: 10px;
  background: #fff;

  @media (max-width: 767px) {
    width: 100%;
  }
`

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 16px;

  @media (max-width: 767px) {
    flex-direction: column;
    margin-top: 20px;
  }
`

const Button = styled.button`
  border: 1px solid #111;
  border-radius: 999px;
  padding: var(--btn-padding);
  background: #111;
  color: #fff;
  cursor: pointer;
  font-weight: 600;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`

const SecondaryButton = styled(Button)`
  background: #fff;
  color: #111;
`

const DangerButton = styled(Button)`
  background: #fff;
  color: #b00020;
  border-color: #b00020;
`

const ErrorText = styled.p`
  color: #b00020;
  margin: 0;
`

const SuccessText = styled.p`
  color: #0c7d2b;
  margin: 0;
`

export const AccountPage = () => {
  const navigate = useNavigate()
  const { user, token, setUser, logout } = userStore()
  const [editingField, setEditingField] = useState(null)
  const [draftValue, setDraftValue] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const cityLabel =
    swedishCities.find((city) => city.value === user?.city)?.label || user?.city || '-'

  if (!token || !user) {
    return (
      <Wrapper>
        <Card>
          <Title>Kontouppgifter</Title>
          <EmptyState>
            Du är inte inloggad. <Link to="/login">Logga in</Link>
          </EmptyState>
        </Card>
      </Wrapper>
    )
  }

  const startEdit = (field, currentValue) => {
    setErrorMessage('')
    setSuccessMessage('')
    setEditingField(field)
    setDraftValue(currentValue || '')
  }

  const cancelEdit = () => {
    setEditingField(null)
    setDraftValue('')
  }

  const handleSaveField = async (field) => {
    const cleanValue = field === 'city' ? draftValue : draftValue.trim()
    if (!cleanValue) return

    setErrorMessage('')
    setSuccessMessage('')
    setIsSaving(true)

    try {
      const payload = field === 'city' ? { cityValue: cleanValue } : { [field]: cleanValue }
      const updated = await updateMyAccount(
        payload,
        { token },
      )

      const updatedUser = updated?.user || {}
      setUser({
        ...user,
        firstName: updatedUser.firstName || user.firstName,
        lastName: updatedUser.lastName || user.lastName,
        username: updatedUser.username || user.username,
        email: updatedUser.email || user.email,
        city: updatedUser.city || user.city,
      })
      setSuccessMessage('Kontouppgifter uppdaterade')
      cancelEdit()
    } catch (error) {
      setErrorMessage(error.message || 'Kunde inte uppdatera kontot')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Är du säker på att du vill ta bort kontot? Detta går inte att ångra.',
    )
    if (!confirmed) return

    setErrorMessage('')
    setSuccessMessage('')
    setIsDeleting(true)

    try {
      await deleteMyAccount({ token })
      logout()
      navigate('/signup')
    } catch (error) {
      setErrorMessage(error.message || 'Kunde inte ta bort kontot')
      setIsDeleting(false)
    }
  }

  const renderEditableRow = ({
    label,
    field,
    value,
    type = 'text',
    selectOptions = null,
    editable = true,
  }) => {
    const isEditing = editingField === field
    return (
      <Row>
        <Label htmlFor={`account-${field}`}>{label}</Label>
        <RowContent>
          {editable && isEditing ? (
            <>
              {selectOptions ? (
                <Select
                  id={`account-${field}`}
                  value={draftValue}
                  onChange={(event) => setDraftValue(event.target.value)}
                >
                  <option value="">Välj stad</option>
                  {selectOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              ) : (
                <Input
                  id={`account-${field}`}
                  type={type}
                  value={draftValue}
                  onChange={(event) => setDraftValue(event.target.value)}
                />
              )}

              <Button type="button" onClick={() => handleSaveField(field)} disabled={isSaving}>
                {isSaving ? 'Sparar...' : 'Spara'}
              </Button>
              <SecondaryButton type="button" onClick={cancelEdit} disabled={isSaving}>
                Avbryt
              </SecondaryButton>
            </>
          ) : (
            <>
              {editable ? (
                <Value>{value || '-'}</Value>
              ) : (
                <ReadOnlyField>{value || '-'}</ReadOnlyField>
              )}
              {editable && (
                <SecondaryButton type="button" onClick={() => startEdit(field, value)}>
                  Ändra
                </SecondaryButton>
              )}
            </>
          )}
        </RowContent>
      </Row>
    )
  }

  return (
    <Wrapper>
      <Card>
        <Title>Kontouppgifter</Title>

        {renderEditableRow({ label: 'Förnamn', field: 'firstName', value: user.firstName })}
        {renderEditableRow({ label: 'Efternamn', field: 'lastName', value: user.lastName })}
        {renderEditableRow({
          label: 'Användarnamn',
          field: 'username',
          value: user.username,
          editable: false,
        })}
        {renderEditableRow({
          label: 'E-post',
          field: 'email',
          value: user.email,
          type: 'email',
          editable: false,
        })}
        {renderEditableRow({
          label: 'Stad',
          field: 'city',
          value: cityLabel,
          selectOptions: swedishCities,
        })}

        <ButtonRow>
          <DangerButton type="button" onClick={handleDeleteAccount} disabled={isDeleting}>
            {isDeleting ? 'Tar bort...' : 'Ta bort konto'}
          </DangerButton>
        </ButtonRow>

        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        {successMessage && <SuccessText>{successMessage}</SuccessText>}
      </Card>
    </Wrapper>
  )
}
