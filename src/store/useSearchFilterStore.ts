import { create } from "zustand";

type State = { search: string; categoryId: string | null };
type Actions = {
  setSearch: (v: string) => void;
  setCategoryId: (id: string | null) => void;
};

export const useSearchFilterStore = create<State & Actions>((set) => ({
  search: "",
  categoryId: null,
  setSearch: (v) => set({ search: v }),
  setCategoryId: (id) => set({ categoryId: id }),
}));
