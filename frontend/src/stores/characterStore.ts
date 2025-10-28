import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Character = {
  id: string;
  name: string;
  image: string;
  prompt: string;
};

type CharState = {
  list: Character[];
  selectedId: string | null;
  select: (id: string) => void;
  upsertCustom: (c: Character) => void;
};

const defaultChars: Character[] = [
  { id: "1", name: "미니빈", image: "/char1.jpg", prompt: "Calm & kind" },
  { id: "2", name: "악동이", image: "/char2.jpg", prompt: "Cheeky & fun" },
  { id: "3", name: "스푸키", image: "/char3.jpg", prompt: "Dry & witty" },
];

export const useCharacterStore = create<CharState>()(
  persist(
    (set, get) => ({
      list: defaultChars,
      selectedId: null,
      select: (id) => set({ selectedId: id }),
      upsertCustom: (c) => {
        const list = get().list.slice();
        const idx = list.findIndex((x) => x.id === c.id);
        if (idx >= 0) list[idx] = c;
        else list.push(c);
        set({ list });
      },
    }),
    { name: "character-storage" }
  )
);
