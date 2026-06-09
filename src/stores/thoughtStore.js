import { create } from "zustand";
import {
  fetchMessages as apiFetchMessages,
  createMessage as apiCreateMessage,
  likeMessage as apiLikeMessage,
} from "../data/api/api";

const thoughtStore = create((set) => ({
  thoughts: [],
  loading: false,
  error: null,
  setThoughts: (thoughts) => set({ thoughts }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  fetchMessages: async () => {
    set({ loading: true, error: null });
    try {
      const data = await apiFetchMessages();
      const mapped = data.map((item) => ({
        id: item._id,
        text: item.message,
        createdAt: item.createdAt,
        likes: item.hearts,
        liked: false,
      }));
      set({ thoughts: mapped, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createMessage: async (messageText) => {
    set({ loading: true, error: null });
    try {
      const data = await apiCreateMessage(messageText);
      // Lägg till ny tanke överst
      set((state) => ({
        thoughts: [
          {
            id: data._id,
            text: data.message,
            createdAt: data.createdAt,
            likes: data.hearts,
            liked: false,
          },
          ...state.thoughts,
        ],
        loading: false,
      }));
      return data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  likeMessage: async (id) => {
    try {
      await apiLikeMessage(id);
      set((state) => ({
        thoughts: state.thoughts.map((t) =>
          t.id === id ? { ...t, likes: t.likes + 1, liked: true } : t
        ),
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },
}));

export const useThoughtStore = thoughtStore;
