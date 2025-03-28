'use client';
import CONTRACT_ABI from '@/lib/abi';
import { create } from 'zustand';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { handleError } from '@/lib/Errormsg';

// Provider options for Web3Modal
export const options = {
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
      getProvider: () => new ethers.JsonRpcProvider("http://localhost:8545"),
    },
  },
};

export const useWalletStore = create((set, get) => {

  const Walletandcontacts = () => {
    let swalletAddress = null;
    let scontractAddress = null;
  
    if (typeof window !== "undefined") {
      swalletAddress = localStorage.getItem('walletAddress');
      scontractAddress = localStorage.getItem('contractAddress');
    }
  
    // Return the values as an object
    return { swalletAddress, scontractAddress };
  }

  
  // Try to load wallet address and contract from localStorage
  // Initial state with persisted values (if any)
  return {
  
    provider: null,
    contract: Walletandcontacts()[1]|| null,
    walletAddress: Walletandcontacts()[0]|| null,
    _CONTRACT_ABI: CONTRACT_ABI['abi'],
    CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || contractAddress || "",

    setContract: (newContract) => set({ contract: newContract }),
    setProvider: (newProvider) => set({ provider: newProvider }),
    setWalletAddress: (newAddress) => set({ walletAddress: newAddress }),

    connectWallet: async () => {
      console.log('abi...',CONTRACT_ABI['abi'] );
      const { walletAddress, contract } = get();
    
      // If wallet is already connected, no need to reconnect
      if (walletAddress) {
        console.log('Wallet already connected:', walletAddress);
        return; // Exit early if the wallet is already connected
      }
    
      try {
        if (!process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) {
          throw new Error('Contract address is not defined.');
        }
    
        // Initialize Web3Modal
        const modal = new Web3Modal({
          cacheProvider: true, // Persist user's wallet choice
          providerOptions: options, // Your wallet provider options
        });
    
        // Connect wallet using Web3Modal
        const instance = await modal.connect();
        const web3Provider = new ethers.BrowserProvider(instance);
        const signer = await web3Provider.getSigner();
        const address = await signer.getAddress();
    
        // Update store with provider and wallet address
        set({ provider: web3Provider, walletAddress: address });
    
        // Create contract instance with signer
        const newContract = new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
          CONTRACT_ABI['abi'], // Ensure you have the correct ABI
          signer
        );
    
        // Update contract state
        set({ contract: newContract });
    
        // Ensure contract state is set
        const updatedContract = get().contract;
    
        if (updatedContract) {
          console.log('Successfully connected to contract:', updatedContract);
        } else {
          console.error('Contract is not available after setting.');
        }
    
        if (typeof window !== "undefined") {
          // Safe to use localStorage
          localStorage.setItem('walletAddress', address);
          localStorage.setItem('contractAddress', process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
      
        }
        // Save wallet and contract data to localStorage
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    },
    

    // Function for calling a state-changing contract method (requires signer)
    callTransactionFunction: async (methodName, ...params) => {
      const { contract, walletAddress } = get();

      // Check if walletAddress is available
      if (!walletAddress) {
        console.log('Wallet not connected. Connecting...');
        const {connectWallet} = get()
        await connectWallet() // Automatically connect the wallet
      }

      // Check if contract is available and connect if necessary
      if (!contract) {
        console.log('Contract not available. Connecting wallet...');
        const modal = new Web3Modal({
          cacheProvider: true, // Persist user's wallet choice
          providerOptions: options, // Your wallet provider options
        });
    
        // Connect wallet using Web3Modal
        const instance = await modal.connect();
        const web3Provider = new ethers.BrowserProvider(instance);
        const signer = await web3Provider.getSigner();
        const address = await signer.getAddress();
    
        // Update store with provider and wallet address
        set({ provider: web3Provider, walletAddress: address });
    
        // Create contract instance with signer
        const newContract = new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
          CONTRACT_ABI['abi'], // Ensure you have the correct ABI
          signer
        );
        console.log({newContract})// Attempt to connect wallet and set contract
        set({ contract: newContract });
    ; // Ensure contract is available
      }

      // Now that the contract is available, proceed with calling the function
      const { contract: updatedContract } = get();

      try {
        const tx = await updatedContract[methodName](...params);
        console.log(`Transaction sent: ${tx.hash}`);

        // Wait for the transaction to be mined
        const receipt = await tx.wait();
        console.log(`Transaction mined: ${receipt.transactionHash}`);

        return {success:true, msg:receipt}; // Return the transaction receipt
      } catch (error) {
        const errorMessage = handleError(error);
        console.error('Error calling transaction function:', errorMessage);
        return {success:false, msg:errorMessage}; // Return the error message
      }
    },

     sendEtherToContract :async (methodName, amountInEther, ...params) => {
      const { contract, walletAddress } = get();
    
      // Check if walletAddress is available
      if (!walletAddress) {
        console.log('Wallet not connected. Connecting...');
        const { connectWallet } = get();
        await connectWallet(); // Automatically connect the wallet
      }
    
      // Check if contract is available and connect if necessary
      if (!contract) {
        console.log('Contract not available. Connecting wallet...');
        const modal = new Web3Modal({
          cacheProvider: true, // Persist user's wallet choice
          providerOptions: options, // Your wallet provider options
        });
    
        // Connect wallet using Web3Modal
        const instance = await modal.connect();
        const web3Provider = new ethers.BrowserProvider(instance);
        const signer = await web3Provider.getSigner();
        const address = await signer.getAddress();
    
        // Update store with provider and wallet address
        set({ provider: web3Provider, walletAddress: address });
    
        // Create contract instance with signer
        const newContract = new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
          CONTRACT_ABI['abi'], // Ensure you have the correct ABI
          signer
        );
        set({ contract: newContract });
      }
    
      // Now that the contract is available, proceed with calling the function
      const { contract: updatedContract } = get();
    
      try {
        // Convert Ether to Wei (since Ethereum works in Wei, not Ether)
        // const amountInWei = ethers.parseEther(amountInEther);
        
        const amountInWei = BigInt(parseFloat(amountInEther)*(10**18))// Convert Ether to Wei
    console.log({amountInWei})
        // Send Ether to the contract using the specified method and parameters
        const tx = await updatedContract[methodName](...params, {
          value: amountInWei, // Send Ether along with the method call
        });
    
        console.log(`Transaction sent: ${tx.hash}`);
    
        // Wait for the transaction to be mined
        const receipt = await tx.wait();
        console.log(`Transaction mined: ${receipt.transactionHash}`);
    
        return { success: true, msg: receipt, hash:tx.hash }; // Return the transaction receipt
      } catch (error) {
        const errorMessage = handleError(error);
        console.error('Error calling contract method with Ether:', errorMessage);
        return { success: false, msg: errorMessage }; // Return the error message
      }
    },
    


    callReadOnlyFunction: async (methodName, ...params) => {
      const { contract, provider, walletAddress } = get();
    
      // If contract is not available, connect wallet
      if (!contract) {
        console.log('Contract not available. Connecting wallet...');
        
        const modal = new Web3Modal({
          cacheProvider: true, // Persist user's wallet choice
          providerOptions: options, // Your wallet provider options
        });
    
        // Connect wallet using Web3Modal
        const instance = await modal.connect();
        const web3Provider = new ethers.BrowserProvider(instance);
        const signer = await web3Provider.getSigner();
        const address = await signer.getAddress();
    
        // Update store with provider and wallet address
        set({ provider: web3Provider, walletAddress: address });
    
        // Create contract instance with signer
        const newContract = new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
          CONTRACT_ABI['abi'], // Ensure you have the correct ABI
          signer
        );// Attempt to connect wallet and set contract
        set({ contract: newContract });
    
      }
      
      const{contract:updatedContract} = get(); // Get the updated updatedContract after wallet connection
      console.log('Connected to updatedContract:', updatedContract);
    
      // Check if the updatedContract is still null after connectWallet
      if (!updatedContract) {
        console.error('Contract still not available after connecting wallet.');
        return;
      }
    
      // Check if the method is available on the updatedContract
      if (typeof updatedContract[methodName] !== 'function') {
        console.error(`Method ${methodName} is not available on the updatedContract.`);
        return;
      }
    
      try {
        const result = await updatedContract[methodName](...params);
        console.log('Read-only function result:', result);
        return result;
      } catch (error) {
        console.error('Error calling read-only function:', error);
      }
    },


    // const { ethers } = require('ethers');

callReadOnlyFunctionWithPrivateKey : async (methodName, ...params) => {
 

  try {
    console.log('Contract not available. Creating wallet instance...');

    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_URL);
    console.log({provider})

    const wallet = new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY, provider);
    console.log('Wallet created:', wallet);

    const address = await wallet.getAddress();
    console.log('Wallet address:', address);


    const newContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      CONTRACT_ABI['abi'],
      wallet
    )
    const result = await newContract[methodName](...params);
    console.log('Read-only function result:', result);
    return result;
  } catch (error) {
    console.error('Error calling read-only function:', error);
  }
},
    // Disconnect wallet
    disconnectWallet: () => {
      if (typeof window !== "undefined") {
        // Safe to use localStorage
        // Clear localStorage
        localStorage.removeItem('walletAddress');
        localStorage.removeItem('contractAddress');
      }

      // Reset store state
      set({
        provider: null,
        contract: null,
        walletAddress: null,
        error: null,
      });
    },
  };
});
