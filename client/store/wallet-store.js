'use client'
import CONTRACT_ABI from '@/lib/abi';
import {create} from 'zustand';


const useWalletStore = create((set) => ({
  provider: null,
  CONTRACT_ABI:CONTRACT_ABI,
  CONTRACT_ADDRESS:"0x5FbDB2315678afecb367f032d93F642f64180aa3",
  walletAddress: '',
  contract: null,
  setContract: (contract) => set({ contract }),
  setProvider: (provider) => set({ provider }),
  setWalletAddress: (address) => set({ walletAddress: address }),
  reset: () => set({ provider: null, walletAddress: '' })
}));

export default useWalletStore;
