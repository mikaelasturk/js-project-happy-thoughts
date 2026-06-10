import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { StyledSection } from '../../styles/styles'
import { MessageCard } from '../cards/cards'
import { SpinnerLoader } from "../ui/ui";

const ViewToggle = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 30px;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: flex;
    flex-direction: column;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`

const ViewButton = styled.button`
  border: 1px solid #111;
  border-radius: 999px;
  padding: var(--btn-padding);
  background: ${({ $active }) => ($active ? '#111' : '#fff')};
  color: ${({ $active }) => ($active ? '#fff' : '#111')};
  cursor: pointer;
  font-weight: 600;
`

const MessageList = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 24px;
    grid-template-columns: ${({ $viewMode }) => ($viewMode === 'grid' ? 'repeat(2, minmax(0, 1fr))' : '1fr')};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: ${({ $viewMode }) => ($viewMode === 'grid' ? '30px' : '30px')};
    grid-template-columns: ${({ $viewMode }) => ($viewMode === 'grid' ? 'repeat(3, minmax(0, 1fr))' : '1fr')};
    margin: ${({ $viewMode }) => ($viewMode === 'grid' ? '0 80px' : '')};
  }
`

const LoadMoreAnchor = styled.div`
  height: 1px;
`

const EndOfListText = styled.p`
  margin: 16px 0 0;
  text-align: center;
  color: #666;
  font-weight: 600;
`

export const MessageSection = ({ variant, messages, onLike, onDelete, onUpdate, onLoadMore, hasMore, isLoading, isFetchingMore }) => {
  const [viewMode, setViewMode] = useState('list')
  const loadMoreRef = useRef(null)
  const hasScrolledRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        hasScrolledRef.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore || isLoading || isFetchingMore) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry?.isIntersecting && hasScrolledRef.current) onLoadMore?.()
      },
      { root: null, rootMargin: '0px 0px 120px 0px', threshold: 0 },
    )

    observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [hasMore, isLoading, isFetchingMore, onLoadMore])

  return (
    <StyledSection $variant={variant}>
      <ViewToggle>
        <h3>Visa thoughts som:</h3>
        <ButtonWrapper>
          <ViewButton type="button" onClick={() => setViewMode('list')} $active={viewMode === 'list'}>Lista</ViewButton>
          <ViewButton type="button" onClick={() => setViewMode('grid')} $active={viewMode === 'grid'}>Grid</ViewButton>
        </ButtonWrapper>
      </ViewToggle>

      <MessageList $viewMode={viewMode}>
        {messages.map((message) => (
          <MessageCard
            key={message.id}
            variant={variant}
            message={message}
            onLike={onLike}
            onDelete={onDelete}
            onUpdate={onUpdate}
            viewMode={viewMode}
          />
        ))}
      </MessageList>

      {isLoading && <SpinnerLoader />}

      {hasMore && !isLoading && (
        <LoadMoreAnchor ref={loadMoreRef} aria-hidden="true" />
      )}

      {isFetchingMore && <SpinnerLoader />}

      {hasMore === false && !isLoading && !isFetchingMore && messages.length > 0 && (
        <EndOfListText>Du har nått slutet, inga fler thoughts just nu.</EndOfListText>
      )}
    </StyledSection>
  )
}
