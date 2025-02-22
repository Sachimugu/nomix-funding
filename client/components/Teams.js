'use client'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { getAllCampaigns } from "@/lib/crowdFunding";
import {useWalletStore} from "@/store/wallet-store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CampaignCards from "./CampaignCards";

const socialIcon = (socialName) => {
  switch (socialName) {
    case "LinkedIn":
      return <LinkedInIcon />;
    case "Github":
      return <GithubIcon />;
    case "X":
      return <XIcon />;
    default:
      return null;
  }
};

export const TeamSection = () => {



  const { connectWallet, callReadOnlyFunction, contract, walletAddress } = useWalletStore();
  const [allCampaigns, setAllCampaigns] = useState([]);

  const fetchContractData = async () => {
    
   
      // const data = await callReadOnlyFunction('getPaginatedCampaigns', 0,8); // Replace with your method name and params
      const [data, currentPage, totalPages, totalCampaigns] = await callReadOnlyFunction('getPaginatedCampaigns', 0,8); // Replace with your method name and params
      console.log("Total Campaigns:", totalCampaigns); // Convert BigNumber to number
      console.log("Current Page:", currentPage);
      console.log("Total Pages:", totalPages);
      console.log('Contract data:', data);
      const formattedData = await getFormattedCampaigns(data);
      setAllCampaigns(formattedData);
      console.log('All campaigns:', allCampaigns);
    
  };



  async function getFormattedCampaigns(data) {
    const campaignCount = await data.length;  // Get number of campaigns
    const campaigns = [];
  
    // Iterate over the campaign count and fetch data
    for (let i = 0; i < campaignCount; i++) {
      const campaign = data[i]  // Fetch each campaign's details
  
      // Use map() to format the campaign data
      const formattedCampaign = {
        index: i + 1,  // Adding 1 to index for display purposes
        creator: campaign.creator,
        goal: campaign.goal.toString(),  // Convert BigInt to string
        deadline: new Date(parseInt(campaign.deadline) * 1000).toLocaleString(),  // Convert timestamp
        imageUrl: campaign.imageUrl,
        totalFunds: parseInt(campaign.totalFunds),  // Convert BigInt to string
        description: campaign.description,
        name: campaign.name,
        goalReached: campaign.goalReached,
        isClosed: campaign.isClosed,
        donors: campaign.donors.length,  // Number of donors
        donations: campaign.donations.reduce((total, amount) => total + parseInt(amount), 0).toString(),  // Sum of donations
      };
  
      // console.log('Formatted campaign:', formattedCampaign);
      campaigns.push(formattedCampaign);  // Add formatted data to the campaigns array
    }
    // console.log('All campaigns:', campaigns);  // Log the final array of formatted campaigns for testing purposes
  
    return campaigns;  // Return the array of formatted campaigns
  }
  
  


 

  return (
    <section id="team" className="container lg:w-[75%] py-24 sm:py-32 mx-auto">
      <div>
      <button onClick={fetchContractData}>Fetch Contract Data</button>
      {walletAddress && <p>Wallet Address: {walletAddress}</p>}
    </div>
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">Team</h2>
        <h2 className="text-3xl md:text-4xl text-center font-bold">The Company Dream Team</h2>
      </div>

     
        <CampaignCards campaigns={allCampaigns} />

    </section>
  );
};
