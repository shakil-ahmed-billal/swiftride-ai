import { create } from "zustand";
import { Car } from "@/lib/supabase";

interface FilterState {
  searchQuery: string;
  selectedBrand: string;
  selectedType: string;
  maxPrice: number;
  cars: Car[];
  isLoading: boolean;
  setSearchQuery: (query: string) => void;
  setSelectedBrand: (brand: string) => void;
  setSelectedType: (type: string) => void;
  setMaxPrice: (price: number) => void;
  setCars: (cars: Car[]) => void;
  setIsLoading: (loading: boolean) => void;
  resetFilters: () => void;
}

export const useCarStore = create<FilterState>((set) => ({
  searchQuery: "",
  selectedBrand: "All",
  selectedType: "All",
  maxPrice: 500,
  cars: [],
  isLoading: false,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedBrand: (brand) => set({ selectedBrand: brand }),
  setSelectedType: (type) => set({ selectedType: type }),
  setMaxPrice: (price) => set({ maxPrice: price }),
  setCars: (cars) => set({ cars }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  resetFilters: () =>
    set({
      searchQuery: "",
      selectedBrand: "All",
      selectedType: "All",
      maxPrice: 500,
    }),
}));
