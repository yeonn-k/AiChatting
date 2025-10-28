import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Character = {
  id: string;
  name: string;
  imgUrl: string;
};

type CharState = {
  list: Character[];
  selectedId: string | null;
  select: (id: string) => void;
  getCharById: (id: string) => Character | undefined;
};

const defaultChars: Character[] = [
  { id: "1", name: "미니빈", imgUrl: "/src/assets/images/char1.jpg" },
  { id: "2", name: "악동이", imgUrl: "/src/assets/images/char2.jpg" },
  { id: "3", name: "스푸키", imgUrl: "/src/assets/images/char3.jpg" },
];

export const useCharacterStore = create<CharState>()(
  persist(
    (set, get) => ({
      list: defaultChars,
      selectedId: null,
      select: (id) => set({ selectedId: id }),

      getCharById: (id) => get().list.find((c) => c.id === id),
    }),
    { name: "character-storage" }
  )
);
