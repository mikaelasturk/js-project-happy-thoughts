import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'

import { deleteMessage, fetchUserProfile, updateMessage } from '../../data/api/api'
import swedishCities from '../../data/swedishCities.json'
import { SpinnerLoader } from '../ui/ui'
import { BodyText } from '../typography/typography'
import { userStore } from '../../stores/userStore'

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  padding: 24px 16px;
`

const Inner = styled.div`
  width: min(100%, 640px);
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const ProfileCard = styled.section`
  background: var(--1st-bg-clr);
  border: 1px solid var(--border-clr);
  border-radius: 12px;
  padding: 18px;
`

const ProfileName = styled.h1`
  margin: 0 0 4px;
  font-size: 1.6rem;
`

const ProfileMeta = styled.p`
  margin: 0;
  opacity: 0.65;
  font-size: 0.95rem;
`

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  margin: 0 0 12px;
`

const ThoughtList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const ThoughtItem = styled.div`
  background: var(--2nd-bg-clr);
  border: 1px solid color-mix(in srgb, var(--border-clr) 30%, transparent);
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`

const ThoughtText = styled.p`
  margin: 0;
  flex: 1;
  min-width: 0;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  word-break: break-word;
`

const ThoughtMeta = styled.span`
  font-size: 0.82rem;
  opacity: 0.55;
  white-space: nowrap;
  margin-right: 6px;
`

const HeartBadge = styled.span`
  font-size: 0.82rem;
  white-space: nowrap;
  margin-right: 6px;
`

const MetaColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  align-self: flex-start;
  position: sticky;
  top: 12px;
`

const ActionRow = styled.div`
  display: flex;
  gap: 8px;
`

const ActionButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 2px;
  color: var(--font-clr);
  opacity: 0.7;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 1;
  }
`

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
)

const EditTextarea = styled.textarea`
  width: 100%;
  border: 1px solid var(--border-clr);
  border-radius: 8px;
  padding: 8px;
  font: inherit;
  font-size: 1rem;
  resize: vertical;
  min-height: 72px;
  background: var(--1st-bg-clr);
  color: var(--font-clr);
`

const EditActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
`

const SaveButton = styled.button`
  border: 1px solid var(--border-clr);
  background: var(--2nd-btn-bg-clr);
  color: var(--font-clr);
  border-radius: var(--btn-border-radius);
  padding: 8px 10px;
  cursor: pointer;
`

const CancelButton = styled.button`
  border: 1px solid var(--border-clr);
  background: transparent;
  color: var(--font-clr);
  border-radius: var(--btn-border-radius);
  padding: 8px 10px;
  cursor: pointer;
`

const ErrorText = styled.p`
  color: #b00020;
`

const EmptyText = styled.p`
  opacity: 0.6;
`

const timeAgo = (timestamp) => {
  const diffMs = Date.now() - new Date(timestamp).getTime()
  const seconds = Math.floor(Math.max(0, diffMs) / 1000)
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo`
  return `${Math.floor(months / 12)}y`
}

export const UserProfilePage = () => {
  const { username } = useParams()
  const token = userStore((state) => state.token)
  const currentUser = userStore((state) => state.user)
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!username) return
    setIsLoading(true)
    setError('')
    fetchUserProfile(username)
      .then(setProfile)
      .catch((err) => setError(err.message || 'Kunde inte hämta profilen'))
      .finally(() => setIsLoading(false))
  }, [username])

  if (isLoading) return <Wrapper><SpinnerLoader /></Wrapper>

  if (error) return (
    <Wrapper>
      <Inner>
        <ErrorText>{error}</ErrorText>
        <Link to="/">← Tillbaka</Link>
      </Inner>
    </Wrapper>
  )

  const { user, thoughts } = profile ?? {}
  const cityLabel = user?.city
    ? (swedishCities.find((c) => c.value === user.city)?.label ?? user.city)
    : null

  const canManageThoughts = Boolean(
    currentUser?.username &&
    user?.username &&
    currentUser.username === user.username,
  )

  const handleUpdate = async (id, newText) => {
    setIsSaving(true)
    try {
      const updated = await updateMessage(id, newText, { token })
      setProfile((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          thoughts: (prev.thoughts ?? []).map((t) =>
            t._id === id ? { ...t, message: updated?.message ?? newText } : t,
          ),
        }
      })
      setEditingId(null)
      setEditText('')
    } catch (err) {
      setError(err.message || 'Kunde inte uppdatera thought')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Vill du verkligen ta bort meddelandet?')
    if (!confirmed) return

    try {
      await deleteMessage(id, { token })
      setProfile((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          thoughts: (prev.thoughts ?? []).filter((t) => t._id !== id),
        }
      })
      if (editingId === id) {
        setEditingId(null)
        setEditText('')
      }
    } catch (err) {
      setError(err.message || 'Kunde inte ta bort thought')
    }
  }

  const startEdit = (thought) => {
    setEditingId(thought._id)
    setEditText(thought.message)
    setError('')
  }

  return (
    <Wrapper>
      <Inner>
        <ProfileCard>
          <ProfileName>@{user?.username}</ProfileName>
          {(user?.firstName || user?.lastName) && (
            <BodyText text={`${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()} />
          )}
          {cityLabel && <ProfileMeta>{cityLabel}</ProfileMeta>}
        </ProfileCard>

        <section>
          <SectionTitle>
            {thoughts?.length
              ? `${thoughts.length} thought${thoughts.length !== 1 ? 's' : ''}`
              : 'Inga thoughts ännu'}
          </SectionTitle>
          <ThoughtList>
            {(thoughts ?? []).length > 0 ? (
              (thoughts ?? []).map((t) => {
                const isEditing = editingId === t._id

                return (
                  <ThoughtItem key={t._id}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {isEditing ? (
                        <>
                          <EditTextarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            maxLength={140}
                            autoFocus
                          />
                          <EditActions>
                            <SaveButton
                              type="button"
                              onClick={() => handleUpdate(t._id, editText.trim())}
                              disabled={isSaving || editText.trim().length < 5}
                            >
                              {isSaving ? 'Sparar...' : 'Spara'}
                            </SaveButton>
                            <CancelButton
                              type="button"
                              onClick={() => {
                                setEditingId(null)
                                setEditText('')
                              }}
                            >
                              Avbryt
                            </CancelButton>
                          </EditActions>
                        </>
                      ) : (
                        <ThoughtText>{t.message}</ThoughtText>
                      )}
                    </div>

                    <MetaColumn>
                      {canManageThoughts && (
                        <ActionRow>
                          <ActionButton
                            type="button"
                            aria-label={isEditing ? 'Avbryt redigering' : 'Redigera thought'}
                            title={isEditing ? 'Avbryt redigering' : 'Redigera'}
                            onClick={() => {
                              if (isEditing) {
                                setEditingId(null)
                                setEditText('')
                                return
                              }
                              startEdit(t)
                            }}
                          >
                            <EditIcon />
                          </ActionButton>
                          <ActionButton
                            type="button"
                            aria-label="Ta bort thought"
                            title="Ta bort"
                            onClick={() => handleDelete(t._id)}
                          >
                            <TrashIcon />
                          </ActionButton>
                        </ActionRow>
                      )}
                      <HeartBadge>❤️ {t.hearts}</HeartBadge>
                      <ThoughtMeta>{timeAgo(t.thoughtCreatedAt)}</ThoughtMeta>
                    </MetaColumn>
                  </ThoughtItem>
                )
              })
            ) : (
              <EmptyText>Inga thoughts ännu</EmptyText>
            )}
          </ThoughtList>
        </section>
      </Inner>
    </Wrapper>
  )
}
