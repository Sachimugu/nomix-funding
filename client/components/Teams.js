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
import usePaginationStore from "@/store/pagination-store";
import { ethers } from "ethers";

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



  const { connectWallet, callReadOnlyFunction, contract , callReadOnlyFunctionWithPrivateKey} = useWalletStore();
  const [allCampaigns, setAllCampaigns] = useState([]);
  const {setTotalPages,setCurrentPage,setTotalCampaigns, currentPage}=usePaginationStore()

  function calculateValue() {
    const y = 8;  // constant value
    return (currentPage - 1) * y;
}


  const fetchContractData = async () => {
    
   const x= calculateValue()
   console.log({xxxxxxxxxxxxxxxx:x,currentPage})
      // const data = await callReadOnlyFunction('getPaginatedCampaigns', 0,8); // Replace with your method name and params
      const [data, currentPag, totalPages, totalCampaigns] = await callReadOnlyFunctionWithPrivateKey('getPaginatedCampaigns', x ,8);
      setTotalPages(parseInt(totalPages)),setCurrentPage(parseInt(currentPag)) ,setTotalCampaigns(data.length);
       // Replace with your method name and params
    //  const x = await callReadOnlyFunction('number'); // Replace with your method name and params
      // console.log({x}); // Convert BigNumber to number
      console.log("Total Campaigns:", ); // Convert BigNumber to number
      // console.log("Current Page:", currentPage);
      console.log("Total Pages:", totalPages);
      // console.log('Contract data:', data);
      const formattedData = await getFormattedCampaigns(data);
      setAllCampaigns(formattedData);
      // console.log('All campaigns:', allCampaigns);
    
  };

  useEffect(()=>{
    fetchContractData();
  },[currentPage])



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
    <section id="team" className="container lg:w-[75%] py-32 sm:py-32 mx-auto">
      <div>
   
    </div>
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">Campaigns</h2>
        <h2 className="text-3xl md:text-4xl text-center font-bold">Active Campaigns </h2>
      </div>

     
        <CampaignCards campaigns={allCampaigns} />

    </section>
  );
};
