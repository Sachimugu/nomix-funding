'use client'
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import useWalletStore from "@/store/wallet-store";
const options = {}

export const connectWalletAddr = async (setLoading) => {
  const {setProvider, setWalletAddress,CONTRACT_ADDRESS , CONTRACT_ABI, setContract } = useWalletStore.getState();
  setLoading(true);  // Set loading to true when connecting

  try {
    const modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: options,
    });

    const instance = await modal.connect();
    const web3Provider = new ethers.BrowserProvider(instance);
    const signer = await web3Provider.getSigner();
    const address = await signer.getAddress();

    // Update the global state
    setProvider(web3Provider);
    setWalletAddress(address);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    setContract(contract);
    console.log({contract, address  });
  } catch (error) {
    console.log("Error connecting wallet:", error);
    alert("Failed to connect wallet. Please try again.");
  } finally {
    setLoading(false);  // Set loading to false once the process is done
  }
};

export const disconnectWalletAddr = () => {
  const { reset } = useWalletStore.getState();
  reset(); // Reset the global state
};
