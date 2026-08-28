import { create } from "zustand";

export interface CarRecommendation {
  id: string;
  name: string;
  brand: string;
  type: string;
  price_per_day: number;
  seats: number;
  transmission: string;
  fuel_type: string;
  image: string;
}

export interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
  cars?: CarRecommendation[];
}

interface ChatState {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
  toggleChat: () => void;
  addMessage: (text: string, sender: "user" | "ai", cars?: CarRecommendation[]) => void;
  setLoading: (loading: boolean) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  isOpen: false,
  messages: [
    {
      id: "init",
      sender: "ai",
      text: "Hello! Welcome to SwiftRide AI Concierge. Looking for a luxury SUV, budget sedan, or instant fleet recommendation?",
      timestamp: new Date(),
    },
  ],
  isLoading: false,
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
  addMessage: (text, sender, cars) =>
    set((state) => ({
      messages: [
        ...state.messages,
        { id: Math.random().toString(), sender, text, timestamp: new Date(), cars },
      ],
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  clearChat: () => set({ messages: [] }),
}));
