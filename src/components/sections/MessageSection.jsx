import { useEffect, useMemo, useRef, useState } from 'react'
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
  padding: 6px 10px;
  background: ${({ $active }) => ($active ? '#111' : '#fff')};
  color: ${({ $active }) => ($active ? '#fff' : '#111')};
  cursor: pointer;
  font-weight: 600;
`

const MessageList = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    gap: ${({ $viewMode }) => ($viewMode === 'grid' ? '30px' : '30px')};
    grid-template-columns: ${({ $viewMode }) => ($viewMode === 'grid' ? 'repeat(3, minmax(0, 1fr))' : '1fr')};
    margin: ${({ $viewMode }) => ($viewMode === 'grid' ? '0 80px' : '')};
  }
`

const LoadMoreAnchor = styled.div`
  height: 1px;
`

const LocalLoadingText = styled.p`
  text-align: center;
`

const INITIAL_VISIBLE = 8
const LOAD_STEP = 6

export const MessageSection = ({ variant, messages, onLike, isLoading }) => {
  const [viewMode, setViewMode] = useState('list')
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)
  const loadMoreRef = useRef(null)

  const hasMore = visibleCount < messages.length

  const visibleMessages = useMemo(
    () => messages.slice(0, visibleCount),
    [messages, visibleCount],
  )

  useEffect(() => {
    setVisibleCount((prev) => {
      if (messages.length === 0) return INITIAL_VISIBLE
      return Math.min(Math.max(prev, INITIAL_VISIBLE), messages.length)
    })
  }, [messages.length])

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore || isLoading) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry?.isIntersecting) return

        setVisibleCount((prev) => Math.min(prev + LOAD_STEP, messages.length))
      },
      {
        root: null,
        rootMargin: '0px 0px 280px 0px',
        threshold: 0,
      },
    )

    observer.observe(loadMoreRef.current)

    return () => observer.disconnect()
  }, [hasMore, isLoading, messages.length])

  return (
    <StyledSection $variant={variant}>
      <ViewToggle>
        <h3>Visa thoughts som:</h3>
        <ButtonWrapper>
          <ViewButton
            type="button"
            onClick={() => setViewMode('list')}
            $active={viewMode === 'list'}
          >
            Lista
          </ViewButton>
          <ViewButton
            type="button"
            onClick={() => setViewMode('grid')}
            $active={viewMode === 'grid'}
          >
            Grid
          </ViewButton>
        </ButtonWrapper>
      </ViewToggle>

      <MessageList $viewMode={viewMode}>
        {visibleMessages.map((message) => (
          <MessageCard
            key={message.id}
            variant={variant}
            message={message}
            onLike={onLike}
            viewMode={viewMode}
          />
        ))}
      </MessageList>

      {hasMore && !isLoading && (
        <>
          <LocalLoadingText>Laddar fler meddelanden...</LocalLoadingText>
          <LoadMoreAnchor ref={loadMoreRef} aria-hidden="true" />
        </>
      )}

      {isLoading && <SpinnerLoader />}
    </StyledSection>
  )
}
