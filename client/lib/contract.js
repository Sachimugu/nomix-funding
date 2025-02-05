// utils/contract.js

import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(window.ethereum);

// Replace with your contract's ABI and address
const contractABI = [/* ABI of your contract */];
const contractAddress = '0xYourContractAddress';

export const getContract = () => {
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
};

export const connectWallet = async () => {
  await provider.send('eth_requestAccounts', []);
};
