'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import {useWalletStore, options} from "@/store/wallet-store";
import metadata from "./metadata";
import { useEffect } from "react";
import { ethers } from 'ethers'; 
import Web3Modal from 'web3modal';
// Ensure correct import

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const { contract, provider, setWalletAddress, setProvider, setContract , CONTRACT_ABI} = useWalletStore();

  useEffect(() => {
    console.log("useEffect called"); // Check if the useEffect is triggered
    const initializeWallet = async () => {
      console.log("initializeWallet called"); // Check if the async function is called

      const savedWalletAddress = localStorage.getItem('walletAddress');
      const savedContractAddress = localStorage.getItem('contractAddress');
      console.log(savedWalletAddress, savedContractAddress); // Check values from localStorage

      if (savedWalletAddress && savedContractAddress) {
        setWalletAddress({ walletAddress: savedWalletAddress });
        try {
          const modal = new Web3Modal({
            cacheProvider: true, // Persist user's wallet choice
            providerOptions: options, // Ensure options are defined
          });

          const instance = await modal.connect();
          const web3Provider = new ethers.BrowserProvider(instance);
          const signer = await web3Provider.getSigner();
          const contract = new ethers.Contract(savedContractAddress, CONTRACT_ABI, signer);
          
          console.log({ web3Provider, contract, address: savedWalletAddress });
          setProvider({ provider: web3Provider });
          setContract({ contract });
        } catch (error) {
          console.log("Error reconnecting wallet:", error);
          localStorage.removeItem('walletAddress');
          localStorage.removeItem('contractAddress');
        }
      }
    };

    initializeWallet(); // Call the async function
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
