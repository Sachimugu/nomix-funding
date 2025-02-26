'use client'
import React, { useState } from 'react';
import Image from 'next/image'; // Make sure to import Image if you're using Next.js
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card'; // Make sure to import the Card components from your library
import PaginationLinks from './PaginationLinks';
import Link from 'next/link';
import { formatNumber } from '@/lib/EthPrice';
import usePaginationStore from '@/store/pagination-store';

// Function to format numbers with K, M, etc.

const dummyData = {
  pagination: {
    totalProducts: 50, // Total number of products (50 in this case)
    page: 1,           // Current page (starting with 1)
  },
  products: Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    description: `This is the description for product ${index + 1}.`,
    imageUrl: `https://via.placeholder.com/150?text=Product+${index + 1}`,
  })),
};

const CampaignCards = ({ campaigns }) => {
  const PINATA_BASE_URL = "https://gateway.pinata.cloud/ipfs/";
  // const [currentPage, setCurrentPage] = useState(dummyData.pagination.page);


  return (
    <div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {campaigns.map((campaign, index) => {
        const formattedCampaign = {
          index: index + 1,
          creator: campaign.creator,
          goal: parseFloat(campaign.goal), // Ensure the goal is a number
          raisedFunds: parseFloat(campaign.raisedFunds || 0), // Example: raised funds value
          imageUrl: `${PINATA_BASE_URL}${campaign.imageUrl}`,
          description: campaign.description,
          name: campaign.name,
        };

        // Calculate the progress (random percent for the demo)
        // const goalProgress = Math.min(Math.random(), 1); // Random progress (0 to 1)
        const goalProgress = formattedCampaign.raisedFunds/formattedCampaign.goal// Random progress (0 to 1)

        // Truncate description if it's too long
        const truncatedDescription = formattedCampaign.description.length > 100
          ? `${formattedCampaign.description.substring(0, 90)}...`
          : formattedCampaign.description;


        return (
          <Link href={`/${index}`}> 
          
          <Card key={formattedCampaign.index} className="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden group/hoverimg">
            <CardHeader className="p-0 gap-0">
              <div className="h-full overflow-hidden">
                <Image
                  src={formattedCampaign.imageUrl}
                  alt={formattedCampaign.name}
                  width={300}
                  height={300}
                  className="w-full aspect-square object-cover saturate-100 transition-all duration-200 ease-linear size-full group-hover/hoverimg:saturate-50 group-hover/hoverimg:scale-[1.01]"
                />
              </div>
              <CardTitle className="py-6 pb-4 px-6 flex">
                {formattedCampaign.name.slice(0,25)} {formattedCampaign.name.length>25? <div>{}...</div>:''}
              </CardTitle>
            </CardHeader>

            <CardContent className="pb-0 text-muted-foreground px-6">
              <p className="text-sm mt-2">
               Target:  <strong className='text-orange-600'>{formatNumber(formattedCampaign.goal)} Eth</strong> {/* Formatting to max 2 digits */}
              </p>
            </CardContent>

            <CardContent className="pb-0 text-muted-foreground px-6">
              <p className="text-sm mt-2">{truncatedDescription}</p>
            </CardContent>

            {/* Progress Bar Section */}
            <CardContent className="pb-0 px-6 mt-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-orange-600">
                {goalProgress * 100}% {/* Display current funds */}
                </span>
                <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-600 transition-all duration-200"
                    style={{ width: `${goalProgress * 100}%` }} // Set the width of the progress bar based on goal progress
                  />
                </div>
                <span className="text-sm font-semibold text-orange-600">
                  {100}% {/* Display goal at the end */}
                </span>
              </div>
            </CardContent>

            <CardFooter className="space-x-4 mt-auto">
              {/* Social Media Links or any other footer content can go here */}
            </CardFooter>
          </Card>
          </Link>
        );
      })}
    </div>
    <PaginationLinks dummyData={dummyData}/>

    </div>
  );
};

export default CampaignCards;
