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
