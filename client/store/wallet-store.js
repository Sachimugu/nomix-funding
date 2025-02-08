'use client';
import CONTRACT_ABI from '@/lib/abi';
import { create } from 'zustand';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

// Provider options for Web3Modal
export const  options = {
  metamask: {
    display: {
      name: "MetaMask",
      description: "Connect with the MetaMask extension",
    },
    package: require('@metamask/providers').default,
  },
  walletconnect: {
    display: {
      name: "WalletConnect",
      description: "Connect with WalletConnect",
    },
    package: require("@walletconnect/client").default,
    options: {
      rpc: {
        1: process.env.NEXT_PUBLIC_INFURA_URL, // Use environment variable
      },
      bridge: "https://bridge.walletconnect.org",
    },
  },
  custom: {
    display: {
      name: "Hardhat",
      description: "Connect with your local Hardhat node",
    },
    package: {
      getProvider: () => new ethers.providers.JsonRpcProvider("http://localhost:8545"),
    },
  },
};

// Zustand store with persistence
export const  useWalletStore = create((set, get) => ({
  provider: null,
  CONTRACT_ABI: CONTRACT_ABI.abi,
  CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, // Use environment variable
  walletAddress: '',
  contract: null,
  isLoading: false, // Manage loading state internally
  error: null, // Track errors

  // Initialize the store with persisted data
  initialize: async () => {
    const savedWalletAddress = localStorage.getItem('walletAddress');
    const savedContractAddress = localStorage.getItem('contractAddress');

    if (savedWalletAddress && savedContractAddress) {
      set({ walletAddress: savedWalletAddress });
      try {
        const modal = new Web3Modal({
          cacheProvider: true, // Persist user's wallet choice
          providerOptions: options,
        });

        const instance = await modal.connect();
        const web3Provider = new ethers.BrowserProvider(instance);
        const signer = await web3Provider.getSigner();
        const contract = new ethers.Contract(savedContractAddress, get().CONTRACT_ABI, signer);
        set({ provider: web3Provider, contract });
      } catch (error) {
        console.error("Error reconnecting wallet:", error);
        localStorage.removeItem('walletAddress');
        localStorage.removeItem('contractAddress');
        set({ error: "Failed to reconnect wallet. Please connect again." });
      }
    }
  },

  connectWallet: async () => {
    set({ isLoading: true, error: null });
    try {
      const modal = new Web3Modal({
        cacheProvider: true, // Persist user's wallet choice
        providerOptions: options,
      });

      const instance = await modal.connect();
      const web3Provider = new ethers.BrowserProvider(instance);
      const signer = await web3Provider.getSigner();
      const address = await signer.getAddress();

      // Update store state
      set({ provider: web3Provider, walletAddress: address });
      const contract = new ethers.Contract(get().CONTRACT_ADDRESS, get().CONTRACT_ABI, signer);
      set({ contract });

      // Save to localStorage
      localStorage.setItem('walletAddress', address);
      localStorage.setItem('contractAddress', get().CONTRACT_ADDRESS);

      console.log({ contract, address });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      set({ error: "Failed to connect wallet. Please try again." });
    } finally {
      set({ isLoading: false });
    }
  },

  disconnectWallet: () => {
    // Clear localStorage
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('contractAddress');

    // Reset store state
    set({
      provider: null,
      contract: null,
      walletAddress: '',
      error: null,
    });
  },

  // Setter for contract
  setContract: (contract) => {
    set({ contract });
  },
  setProvider: (provider) => {
    set({ provider });
  },

  setWalletAddress: (walletAddress) => {
    set({ walletAddress });
  },
  
}));

// export default useWalletStore;
