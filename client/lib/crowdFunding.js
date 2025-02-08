import {useWalletStore} from "@/store/wallet-store";
import { ethers } from "ethers";

// Function to get the contract from the zustand store
const getContract = () => {
  const { provider, contract, CONTRACT_ADDRESS, CONTRACT_ABI, setContract , walletAddress} = useWalletStore.getState();
// console.log({provider, contract, CONTRACT_ADDRESS, CONTRACT_ABI,walletAddress})
//   // Recreate the contract instance if it doesn't exist but the provider is available
//   if (!contract && provider) {
//     const signer = provider.getSigner();
//     const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
//     console.log({contractInstance})
//     setContract(contractInstance); // Save contract in zustand store
//     return contractInstance;
//   }

  return contract;
};

// Create a new campaign
export const createCampaign = async (name, description, goal, duration, image) => {
  const contract = getContract();
  try {
    const tx = await contract.createCampaign(name, description, goal, duration, image);
    await tx.wait();
    console.log("Campaign created successfully!");
  } catch (error) {
    console.error("Error creating campaign:", error);
    throw new Error("Failed to create campaign. Please try again.");
  }
};

// Contribute to a campaign
export const contribute = async (campaignId, amount) => {
  const contract = getContract();
  try {
    const tx = await contract.contribute(campaignId, { value: ethers.utils.parseEther(amount.toString()) });
    await tx.wait();
    console.log("Contribution made successfully!");
  } catch (error) {
    console.error("Error contributing:", error);
    throw new Error("Failed to contribute. Please try again.");
  }
};

// Claim refund if goal is not reached
export const claimRefund = async (campaignId) => {
  const contract = getContract();
  try {
    const tx = await contract.claimRefund(campaignId);
    await tx.wait();
    console.log("Refund claimed successfully!");
  } catch (error) {
    console.error("Error claiming refund:", error);
    throw new Error("Failed to claim refund. Please try again.");
  }
};

// Withdraw funds for the campaign creator
export const withdrawFunds = async (campaignId) => {
  const contract = getContract();
  try {
    const tx = await contract.withdrawFunds(campaignId);
    await tx.wait();
    console.log("Funds withdrawn successfully!");
  } catch (error) {
    console.error("Error withdrawing funds:", error);
    throw new Error("Failed to withdraw funds. Please try again.");
  }
};

// Get campaign progress (total funds and percentage)
export const getCampaignProgress = async (campaignId) => {
  const contract = getContract();
  try {
    const [totalFunds, percentage] = await contract.getCampaignProgress(campaignId);
    return { totalFunds: ethers.utils.formatEther(totalFunds), percentage };
  } catch (error) {
    console.error("Error getting campaign progress:", error);
    throw new Error("Failed to fetch campaign progress. Please try again.");
  }
};

// Get all campaigns
export const getAllCampaigns = async () => {
  const contract = getContract();
  try {
    const campaigns = await contract.getAllCampaigns();
    return campaigns;
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    throw new Error("Failed to fetch campaigns. Please try again.");
  }
};

// Get paginated campaigns
export const getPaginatedCampaigns = async (offset, limit) => {
  const contract = getContract();
  try {
    const campaigns = await contract.getPaginatedCampaigns(offset, limit);
    return campaigns;
  } catch (error) {
    console.error("Error fetching paginated campaigns:", error);
    throw new Error("Failed to fetch paginated campaigns. Please try again.");
  }
};

// Get donors and donations for a specific campaign
export const getDonorsAndDonations = async (campaignId) => {
  const contract = getContract();
  try {
    const [donors, donations] = await contract.getDonorsAndDonations(campaignId);
    return { donors, donations };
  } catch (error) {
    console.error("Error fetching donors and donations:", error);
    throw new Error("Failed to fetch donors and donations. Please try again.");
  }
};