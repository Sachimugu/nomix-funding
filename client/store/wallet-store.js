import CONTRACT_ABI from '@/lib/abi';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWalletStore = create(persist(
  (set, get) => ({
    provider: null,
    CONTRACT_ABI: CONTRACT_ABI.abi,
    CONTRACT_ADDRESS: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    walletAddress: '',
    contract: null,
    setContract: (contract) => set({ contract }),
    setProvider: (provider) => set({ provider }),
    setWalletAddress: (address) => set({ walletAddress: address }),
    reset: () => set({ provider: null, walletAddress: '', contract: null }),

    // Check if wallet is connected
    isWalletConnected: () => {
      const state = get();
      return state.walletAddress && state.provider;
    }
  }),
  {
    name: 'wallet-storage', // The name of the localStorage key
    getStorage: () => localStorage, // Use localStorage to persist the state
  }
));

export default useWalletStore;
