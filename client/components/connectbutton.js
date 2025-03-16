'use client'
import { Wallet } from "lucide-react";
import React, { useState } from "react";
import {useWalletStore} from "@/store/wallet-store";
import { ethers } from "ethers";
// import { connectWalletAddr, disconnectWalletAddr } from "@/lib/connect-wallet";

const optionsc =  {
  metamask: {
    display: {
      name: "MetaMask",
      description: "Connect with the MetaMask extension",
    },
    package: require('@metamask/providers').default, // Rely on the browser extension
  },
  walletconnect: {
    display: {
      name: "WalletConnect",
      description: "Connect with WalletConnect",
    },
    package: require("@walletconnect/client").default,
    options: {
      rpc: {
        1: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",
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
      // Custom provider for Hardhat node
      getProvider: () => new ethers.JsonRpcProvider("http://localhost:8545"), // Hardhat node URL
    },
  },
}

const options = {
  injected: {
    display: {
      name: "Injected",
      description: "Connect with your injected provider (e.g., MetaMask)",
    },
    package: null,  // MetaMask or any other injected provider
  },
  custom: {
    display: {
      name: "Hardhat",
      description: "Connect with your local Hardhat node",
    },
    package: {
      // Custom provider for Hardhat node
      getProvider: () => new ethers.JsonRpcProvider("http://localhost:8545"), // Hardhat node URL
    },
  },}
const ConnectButton = () => {
  const { walletAddress, connectWallet, disconnectWallet } = useWalletStore();
  
  // State for loading
  const [loading, setLoading] = useState(false);

  // const connectWallet = async () => {
  //   setLoading(true);  // Set loading to true when connecting

  //   try {
  //     const modal = new Web3Modal({
  //       cacheProvider: false,
  //       providerOptions: options,
  //     });

  //     const instance = await modal.connect();
  //     const web3Provider = new ethers.BrowserProvider(instance);
  //     // console.log({ web3Provider, instance });
  //     const signer = await web3Provider.getSigner();
  //     const address = await signer.getAddress();

  //     // Update the global state
  //     setProvider(web3Provider);
  //     setWalletAddress(address);
  //     const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  //     setContract(contract);
  //     // console.log({ provider, walletAddress, contract });
  //   } catch (error) {
  //     console.log("Error connecting wallet:", error);
  //     alert("Failed to connect wallet. Please try again.");
  //   } finally {
  //     setLoading(false);  // Set loading to false once the process is done
  //   }
  // };

  const handleConnectWallet = async() => {
    await connectWallet(setLoading)
  }

  const  handleDisconnectWalletAddr= async () => {
    console.log("Disconnecting wallet...");
    await disconnectWallet(); // Reset the global state
  };

  return (
    <>
      {!walletAddress ? (
        <button
          type="button"
          onClick={handleConnectWallet}
          className="text-gray-900 bg-white hover:bg-gray-100 border border-orange-600 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-300 dark:text-white dark:hover:bg-gray-700 gap-2 me-2 mb-2"
          disabled={loading}  // Disable the button while loading
        >
          {loading ? (
            <div className="w-5 h-5 border-4 border-t-4 border-orange-600 rounded-full animate-spin" />  // Loader spinner
          ) : (
            <Wallet className="text-orange-600" />
          )}
          {loading ? "Connecting..." : "Connect Wallet"}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleDisconnectWalletAddr}
          className="text-gray-900 bg-white hover:bg-gray-100 border border-orange-600 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-300 dark:text-white dark:hover:bg-gray-700 gap-2 me-2 mb-2"
        >
          <Wallet className="text-orange-600" />
          Disconnect {}
        </button>
      )}
    </>
  );
};

export default ConnectButton;

