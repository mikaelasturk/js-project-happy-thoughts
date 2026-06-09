import { useEffect } from 'react'

import { FormSection, MessageSection } from '../sections/sections'
import { useThoughtStore } from '../../stores/thoughtStore'

export const MailPage = () => {
  const {
    thoughts: messages,
    loading,
    fetchMessages,
    createMessage,
    likeMessage,
  } = useThoughtStore()

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  const addMessage = async (text) => {
    await createMessage(text)
  }

  const addLike = async (id) => {
    await likeMessage(id)
  }

  return (
    <main>
      <FormSection
        variant="input"
        onFormSubmit={addMessage}
      />
      <MessageSection
        variant="message"
        messages={messages}
        onLike={addLike}
        isLoading={loading}
      />
    </main>
  )
}
