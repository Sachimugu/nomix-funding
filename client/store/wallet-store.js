'use client'
import {create} from 'zustand';

const useWalletStore = create((set) => ({
  provider: null,
  walletAddress: '',
  setProvider: (provider) => set({ provider }),
  setWalletAddress: (address) => set({ walletAddress: address }),
  reset: () => set({ provider: null, walletAddress: '' })
}));

export default useWalletStore;
