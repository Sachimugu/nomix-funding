// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
contract CrowdFunding {

  AggregatorV3Interface internal priceFeed;

    constructor(address _priceFeedAddress) {
        // Initialize the price feed address for Sepolia ETH/USD (this is just an example, please ensure you use the correct address for Sepolia network)
        priceFeed = AggregatorV3Interface(_priceFeedAddress);// Sepolia ETH/USD address
    }

     function getLatestPrice() public view returns (int) {
    (, int price, , , ) = priceFeed.latestRoundData();
    // Scale the price down to 2 decimal places
    int scaledPrice = price / 10**6;  // Divide by 10^6 to move the decimal point
    return scaledPrice;  // Price in 2 decimal places
}


    function convertUSDToWei(uint256 usdAmount) public view returns (uint256) {
        // Get the current ETH price in USD
        int ethPriceInUSD = getLatestPrice();
        require(ethPriceInUSD > 0, "Failed to fetch ETH price");

        // Convert USD to ETH (in ETH)
        uint256 ethAmount = (usdAmount * 10**2) / uint256(ethPriceInUSD); // ETH price has 8 decimals

        // Convert ETH to Wei (1 ETH = 10^18 Wei)
        uint256 ethAmountInWei = ethAmount * 10**18;

        return ethAmountInWei;
    }

    // Convert Wei to USD
    function convertWeiToUSD(uint256 weiAmount) public view returns (uint256) {
        // Get the current ETH price in USD
        int ethPriceInUSD = getLatestPrice();
        require(ethPriceInUSD > 0, "Failed to fetch ETH price");

        // Convert Wei to ETH (1 ETH = 10^18 Wei)
        uint256 ethAmount = weiAmount / 10**18;

        // Convert ETH to USD
        uint256 usdAmount = (ethAmount * uint256(ethPriceInUSD)) / 10**2; // ETH price has 8 decimals

        return usdAmount;
    }


    function etherToWei(uint256 _etherAmount) public view returns (uint256) {
        // 1 Ether = 10^18 Wei, so multiply by 10^18 to convert
        return _etherAmount * 10**18;
    }
    // Campaign structure
    struct Campaign {
        address creator;       // Address of the campaign creator
        uint256 goal;  
        uint256 min_donation;        // Funding goal in wei
        uint256 deadline;      // Deadline for the campaign
        uint256 totalFunds;    // Total funds raised so far
        string description;  
        string imageUrl;  
        string name; // Campaign description
        bool goalReached;      // Whether the goal has been reached
        bool isClosed;         // Whether the campaign is closed
        uint256[] donations;   // Donations made to the campaign
        address[] donors;      // Addresses of the donors
    }

    // Array to store all campaigns
    Campaign[] public campaigns;
    uint256[] public campaignIds;
    int public EthPrice = getLatestPrice();

    // Mapping to track dress to campaign
    mapping(address => Campaign) public addressToCampaign;

    // Events
    event CampaignCreated(uint256 campaignId, address creator, uint256 goal, uint256 deadline, string description);
    event DonationMade(uint256 campaignId, address contributor, uint256 amount);
    event FundsWithdrawn(uint256 campaignId, address creator, uint256 amount);
    event RefundClaimed(uint256 campaignId, address contributor, uint256 amount);

    // Modifier to check if a campaign is active
    modifier isActive(uint256 campaignId) {
        require(campaignId < campaigns.length, "Campaign does not exist");
        require(block.timestamp < campaigns[campaignId].deadline, "Campaign deadline has passed");
        _;
    }

    // Modifier to check if the caller is the campaign creator
    modifier isCreator(uint256 campaignId) {
        require(campaigns[campaignId].creator == msg.sender, "Only the campaign creator can perform this action");
        _;
    }

    // Function to create a new campaign
    function createCampaign(string memory _name, string memory _description, uint256 _goal, uint256 _duration, uint256 _min_donation, string memory _imageUrl  ) public {
        require(_goal > 0, "Goal must be greater than 0");
        require(_duration > 0, "Duration must be greater than 0");

        uint256 deadline = block.timestamp + _duration;
        Campaign memory newCampaign = Campaign({
            creator: msg.sender,
            min_donation:_min_donation,
            goal: etherToWei(_goal),
            deadline: deadline,
            imageUrl:_imageUrl,
            totalFunds: 0,
            description: _description,
            name: _name,
            goalReached: false,
            isClosed: false,
            donors: new address[](0),         
            donations: new uint256[](0) 
   });

        campaigns.push(newCampaign);
        addressToCampaign[msg.sender] = newCampaign;

        uint256 campaignId = campaigns.length - 1;
        campaignIds.push(campaignId);

        emit CampaignCreated(campaignId, msg.sender, _goal, deadline, _description);
    }

    // Function to contribute to a campaign
   function contribute(uint256 campaignId) public payable isActive(campaignId) {
    Campaign storage campaign = campaigns[campaignId];
    require(msg.value > convertUSDToWei(campaign.min_donation), "Contribution must be greater than 0");
    require(campaign.goalReached, "Goal reached");
    // require(msg.value == amount, "Sent value does not match the specified amount");

    campaign.totalFunds += msg.value;
    campaign.donations.push(msg.value);
    campaign.donors.push(msg.sender);
    emit DonationMade(campaignId, msg.sender, msg.value);

    // Check if the goal has been reached
    if (campaign.totalFunds >= campaign.goal) {
        campaign.goalReached = true;
    }
}



    // Function to allow users to claim refunds if the goal wasn't met
    function claimRefund(uint256 campaignId) public {
        require(campaignId < campaigns.length, "Campaign does not exist");
        Campaign storage campaign = campaigns[campaignId];

        // Ensure the campaign is closed, goal was not reached, and the deadline is passed
        require(block.timestamp >= campaign.deadline, "Campaign deadline not reached");
        require(!campaign.goalReached, "Goal has been reached");
        require(!campaign.isClosed, "Campaign is closed");

        // Ensure the user is a donor in the campaign
        bool isDonor = false;
        uint256 totalDonationAmount = 0;

        // Check the donations from the sender and accumulate the amount
        for (uint256 i = 0; i < campaign.donors.length; i++) {
            if (campaign.donors[i] == msg.sender) {
                isDonor = true;
                totalDonationAmount += campaign.donations[i];
                campaign.donations[i] = 0; // Mark the donation as refunded
            }
        }

        require(isDonor, "You did not donate to this campaign");
        require(totalDonationAmount > 0, "You have no donation to refund");

        // Refund the user
        payable(msg.sender).transfer(totalDonationAmount);

        // Update the campaign's total funds
        campaign.totalFunds -= totalDonationAmount;

        emit RefundClaimed(campaignId, msg.sender, totalDonationAmount);
    }

    // Function for the creator to withdraw funds after the goal is reached
   function withdrawFunds(uint256 campaignId) public isCreator(campaignId) {
    Campaign storage campaign = campaigns[campaignId];
    
    // Check if the goal has been reached and if the campaign is not closed
    require(campaign.goalReached, "Goal not reached");
    require(!campaign.isClosed, "Campaign is closed");

    // Mark the campaign as closed
    campaign.isClosed = true;

    // Store the total amount to be withdrawn
    uint256 amount = campaign.totalFunds;

    // Reset totalFunds to zero
    campaign.totalFunds = 0;

    // Reset the campaign deadline to 0 after the funds are withdrawn
    campaign.deadline = 0;

    // Attempt to send Ether to the campaign creator
    (bool success, ) = payable(campaign.creator).call{value: amount}("");
    require(success, "Failed to send Ether");

    // Emit the FundsWithdrawn event
    emit FundsWithdrawn(campaignId, campaign.creator, amount);
}

  

// Function to return paginated campaigns sorted by deadline (ending soonest first)
function getPaginatedCampaigns(uint256 offset, uint256 limit) 
    public 
    view 
    returns (
        Campaign[] memory paginatedCampaigns, 
        uint256 currentPage, 
        uint256 totalPages, 
        uint256 totalCampaigns
    ) 
{
    uint256 activeCampaignCount = 0;

    // Count the active campaigns
    for (uint256 i = 0; i < campaigns.length; i++) {
        Campaign storage campaign = campaigns[i];
        if (!campaign.isClosed && block.timestamp < campaign.deadline) {
            activeCampaignCount++;
        }
    }

    require(offset < activeCampaignCount, "Offset out of bounds");

    // Calculate total active campaigns
    totalCampaigns = activeCampaignCount;

    // Calculate total pages
    totalPages = totalCampaigns / limit;
    if (totalCampaigns % limit != 0) {
        totalPages++; // Add an extra page if there's a remainder
    }

    // Calculate current page (1-indexed for user-friendliness)
    currentPage = (offset / limit) + 1;

    // Create an array of active campaigns
    Campaign[] memory activeCampaigns = new Campaign[](activeCampaignCount);
    uint256 index = 0;
    for (uint256 i = 0; i < campaigns.length; i++) {
        Campaign storage campaign = campaigns[i];
        if (!campaign.isClosed && block.timestamp < campaign.deadline) {
            activeCampaigns[index] = campaign;
            index++;
        }
    }

    // Sort the active campaigns by deadline (earliest deadline first)
    for (uint256 i = 0; i < activeCampaignCount; i++) {
        for (uint256 j = i + 1; j < activeCampaignCount; j++) {
            if (activeCampaigns[i].deadline > activeCampaigns[j].deadline) {
                // Swap the campaigns
                Campaign memory temp = activeCampaigns[i];
                activeCampaigns[i] = activeCampaigns[j];
                activeCampaigns[j] = temp;
            }
        }
    }

    // Calculate the end index of the pagination
    uint256 end = offset + limit;
    if (end > totalCampaigns) {
        end = totalCampaigns;
    }

    // Prepare the paginated campaigns array
    paginatedCampaigns = new Campaign[](end - offset);
    for (uint256 i = offset; i < end; i++) {
        paginatedCampaigns[i - offset] = activeCampaigns[i];
    }

    // Return paginated campaigns and metadata
    return (paginatedCampaigns, currentPage, totalPages, totalCampaigns);
}


    // Function to get donors and donations for a campaign
    function getDonorsAndDonations(uint256 campaignId) public view returns (address[] memory, uint256[] memory) {
        Campaign storage campaign = campaigns[campaignId];
        return (campaign.donors, campaign.donations);
    }

    // Function to get a campaign by index
    function getCampaignByIndex(uint256 campaignId) public view returns (Campaign memory) {
        require(campaignId < campaigns.length, "Campaign index out of bounds");
        return campaigns[campaignId];
    }
}
