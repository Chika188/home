import { create } from "zustand";

const useAgreementStore = create((set) => ({
  agreement: null,
  setAgreement: (data) => set({ agreement: data }),
  clearAgreement: () => set({ agreement: null }),
}));

export default useAgreementStore;