import { create } from "zustand";

interface StoreProps {
  jobs: string[];
  setJobs: (value: string[]) => void;
}

export const useAiResult = create<StoreProps>((set) => ({
  jobs: [],
  setJobs: (val: string[]) => set({ jobs: val }),
}));
