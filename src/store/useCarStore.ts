import { create } from "zustand";
import { Car } from "@/lib/supabase";

export interface SearchFilter {
  pickupCity: string;
  pickupDate: string;
  pickupTime: string;
  dropoffCity: string;
  dropoffDate: string;
  dropoffTime: string;
  rentalDays: number;
  isFilterActive: boolean;
}

interface FilterState {
  searchQuery: string;
  selectedBrand: string;
  selectedType: string;
  maxPrice: number;
  cars: Car[];
  isLoading: boolean;
  searchFilter: SearchFilter;
  setSearchQuery: (query: string) => void;
  setSelectedBrand: (brand: string) => void;
  setSelectedType: (type: string) => void;
  setMaxPrice: (price: number) => void;
  setCars: (cars: Car[]) => void;
  setIsLoading: (loading: boolean) => void;
  setSearchFilter: (filter: Partial<SearchFilter>) => void;
  clearSearchFilter: () => void;
  resetFilters: () => void;
}

const defaultSearchFilter: SearchFilter = {
  pickupCity: "London, UK",
  pickupDate: "",
  pickupTime: "09:00 AM",
  dropoffCity: "London, UK",
  dropoffDate: "",
  dropoffTime: "06:00 PM",
  rentalDays: 3,
  isFilterActive: false,
};

export const useCarStore = create<FilterState>((set) => ({
  searchQuery: "",
  selectedBrand: "All",
  selectedType: "All",
  maxPrice: 500,
  cars: [],
  isLoading: false,
  searchFilter: defaultSearchFilter,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedBrand: (brand) => set({ selectedBrand: brand }),
  setSelectedType: (type) => set({ selectedType: type }),
  setMaxPrice: (price) => set({ maxPrice: price }),
  setCars: (cars) => set({ cars }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setSearchFilter: (filter) =>
    set((state) => ({
      searchFilter: { ...state.searchFilter, ...filter, isFilterActive: true },
    })),
  clearSearchFilter: () =>
    set({
      searchFilter: { ...defaultSearchFilter, isFilterActive: false },
    }),
  resetFilters: () =>
    set({
      searchQuery: "",
      selectedBrand: "All",
      selectedType: "All",
      maxPrice: 500,
      searchFilter: defaultSearchFilter,
    }),
}));
