import { create } from "zustand";
import {
  fetchMessages as apiFetchMessages,
  createMessage as apiCreateMessage,
  getAnonymousClientId,
  likeMessage as apiLikeMessage,
  updateMessage as apiUpdateMessage,
  deleteMessage as apiDeleteMessage,
} from "../data/api/api";
import { userStore } from "./userStore";

const MIN_SPINNER_TIME_MS = 700;
const THOUGHTS_PAGE_SIZE = 9;

const waitForMinimumSpinnerTime = async (startedAt) => {
  const elapsed = Date.now() - startedAt;
  const remaining = Math.max(0, MIN_SPINNER_TIME_MS - elapsed);

  if (remaining > 0) {
    await new Promise((resolve) => setTimeout(resolve, remaining));
  }
};

const mapItem = (item, currentUserId, anonymousClientId) => ({
  id: item._id,
  text: item.message,
  thoughtCreatedAt: item.thoughtCreatedAt,
  likes: item.hearts,
  username:
    item.username || item.user?.username || item.userName || item.name || null,
  liked: Boolean(
    (currentUserId &&
      Array.isArray(item.likedBy) &&
      item.likedBy.some((id) => String(id) === String(currentUserId))) ||
      (!currentUserId &&
        anonymousClientId &&
        Array.isArray(item.likedByAnonymous) &&
        item.likedByAnonymous.includes(anonymousClientId)),
  ),
});

const thoughtStore = create((set, get) => ({
  thoughts: [],
  loading: false,
  isFetchingMore: false,
  currentPage: 1,
  totalPages: 1,
  error: null,
  setThoughts: (thoughts) => set({ thoughts }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  fetchMessages: async () => {
    const loadingStartedAt = Date.now();
    set({ loading: true, error: null });
    try {
      const data = await apiFetchMessages({ page: 1, limit: THOUGHTS_PAGE_SIZE });
      const { user } = userStore.getState();
      const currentUserId = user?.id;
      const anonymousClientId = currentUserId ? null : getAnonymousClientId();
      const items = Array.isArray(data) ? data : data?.thoughts || [];
      const mapped = items.map((item) => mapItem(item, currentUserId, anonymousClientId));
      await waitForMinimumSpinnerTime(loadingStartedAt);
      set({
        thoughts: mapped,
        loading: false,
        currentPage: 1,
        totalPages: data.totalPages || 1,
      });
    } catch (error) {
      await waitForMinimumSpinnerTime(loadingStartedAt);
      set({ error: error.message, loading: false });
    }
  },

  fetchMoreMessages: async () => {
    const { currentPage, totalPages, isFetchingMore } = get();
    if (isFetchingMore || currentPage >= totalPages) return;

    const loadingStartedAt = Date.now();
    set({ isFetchingMore: true });
    try {
      const nextPage = currentPage + 1;
      const data = await apiFetchMessages({ page: nextPage, limit: THOUGHTS_PAGE_SIZE });
      const { user } = userStore.getState();
      const currentUserId = user?.id;
      const anonymousClientId = currentUserId ? null : getAnonymousClientId();
      const items = Array.isArray(data) ? data : data?.thoughts || [];
      const mapped = items.map((item) => mapItem(item, currentUserId, anonymousClientId));
      await waitForMinimumSpinnerTime(loadingStartedAt);
      set((state) => ({
        thoughts: [...state.thoughts, ...mapped],
        currentPage: nextPage,
        totalPages: data.totalPages || totalPages,
        isFetchingMore: false,
      }));
    } catch (error) {
      await waitForMinimumSpinnerTime(loadingStartedAt);
      set({ error: error.message, isFetchingMore: false });
    }
  },

  updateMessage: async (id, newText) => {
    try {
      const { token } = userStore.getState();
      const updated = await apiUpdateMessage(id, newText, { token });
      set((state) => ({
        thoughts: state.thoughts.map((t) =>
          t.id === id ? { ...t, text: updated.message ?? newText } : t
        ),
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  createMessage: async (messageText) => {
    const loadingStartedAt = Date.now();
    set({ loading: true, error: null });
    try {
      const { user, token } = userStore.getState();
      const authorName = user?.username || user?.firstName || null;

      const data = await apiCreateMessage(messageText, {
        token,
        authorName,
      });
      await waitForMinimumSpinnerTime(loadingStartedAt);
      // Lägg till ny tanke överst
      set((state) => ({
        thoughts: [
          {
            id: data._id,
            text: data.message,
            thoughtCreatedAt: data.thoughtCreatedAt,
            likes: data.hearts,
            username:
              data.username ||
              data.user?.username ||
              data.userName ||
              data.name ||
              authorName ||
              null,
            liked: false,
          },
          ...state.thoughts,
        ],
        loading: false,
      }));
      return data;
    } catch (error) {
      await waitForMinimumSpinnerTime(loadingStartedAt);
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  likeMessage: async (id) => {
    try {
      const { user, token } = userStore.getState();
      const currentUserId = user?.id;
      const updated = await apiLikeMessage(id, { token });

      const isLikedByCurrentUser = Boolean(
        currentUserId &&
          Array.isArray(updated?.likedBy) &&
          updated.likedBy.some((value) => String(value) === String(currentUserId)),
      );

      set((state) => ({
        thoughts: state.thoughts.map((t) =>
          t.id === id
            ? (() => {
                const nextLikes =
                  typeof updated?.hearts === "number" ? updated.hearts : t.likes;

                if (currentUserId) {
                  return {
                    ...t,
                    likes: nextLikes,
                    liked: isLikedByCurrentUser,
                  };
                }

                return {
                  ...t,
                  likes: nextLikes,
                  liked: nextLikes < t.likes ? false : !t.liked,
                };
              })()
            : t,
        ),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  deleteMessage: async (id) => {
    try {
      const { token } = userStore.getState();
      await apiDeleteMessage(id, { token });

      set((state) => ({
        thoughts: state.thoughts.filter((t) => t.id !== id),
      }));
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
}));

export const useThoughtStore = thoughtStore;
