import { create } from "zustand";

export const contentStore = create((set) => ({
  apiDocsOpen: false,
  setApiDocsOpen: (open) => set({ apiDocsOpen: open }),
  content: {
    heroTitle: "Welcome to Happy Thoughts!",
    heroBody: "Share your happy thoughts and spread positivity. Connect with others and brighten someone's day!",
    formLabel: "What's making you happy right now?",
    formPlaceholder: "Type your happy thought here...",
    formButton: "❤️ Send Happy Thought ❤️",
    copyright: "© 2025 Mikaela Sturk. All rights reserved.",
    minLengthMsg: (min) => `Minimum ${min} characters`,
    maxLengthMsg: (max) => `Maximum ${max} characters`,
    charsLeftMsg: (remaining) => `${remaining} characters left`,
    // Lägg till fler texter här vid behov
  },
}));
