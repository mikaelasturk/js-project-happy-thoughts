import { useEffect } from 'react'

import { HeroSection, FormSection, MessageSection } from '../sections/sections'
import { useThoughtStore } from '../../stores/thoughtStore'

export const HomePage = () => {
  const {
    thoughts: messages,
    loading,
    isFetchingMore,
    currentPage,
    totalPages,
    fetchMessages,
    fetchMoreMessages,
    createMessage,
    likeMessage,
    deleteMessage,
    updateMessage,
  } = useThoughtStore()

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  const hasMore = currentPage < totalPages

  return (
    <>
      <header>
        <HeroSection />
      </header>

      <main>
        <FormSection
          variant="input"
          onFormSubmit={async (text) => { await createMessage(text) }}
        />
        <MessageSection
          variant="message"
          messages={messages}
          onLike={async (id) => { await likeMessage(id) }}
          onDelete={async (id) => { await deleteMessage(id) }}
          onUpdate={async (id, text) => { await updateMessage(id, text) }}
          onLoadMore={fetchMoreMessages}
          hasMore={hasMore}
          isLoading={loading}
          isFetchingMore={isFetchingMore}
        />
      </main>
    </>
  )
}
