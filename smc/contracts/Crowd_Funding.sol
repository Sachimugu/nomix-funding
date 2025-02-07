// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

contract CrowdFunding {

    // Campaign structure
    struct Campaign {
        address creator;       // Address of the campaign creator
        uint256 goal;          // Funding goal in wei
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
    function createCampaign(string memory _name, string memory _description, uint256 _goal, uint256 _duration, string memory _imageUrl  ) public {
        require(_goal > 0, "Goal must be greater than 0");
        require(_duration > 0, "Duration must be greater than 0");

        uint256 deadline = block.timestamp + _duration;
        Campaign memory newCampaign = Campaign({
            creator: msg.sender,
            goal: _goal,
            deadline: deadline,
            imageUrl:_imageUrl,
            totalFunds: 0,
            description: _description,
            name: _name,
            goalReached: false,
            isClosed: false,
            donors: new address[](0),          donations: new uint256[](0) 
   });

        campaigns.push(newCampaign);
        addressToCampaign[msg.sender] = newCampaign;

        uint256 campaignId = campaigns.length - 1;
        campaignIds.push(campaignId);

        emit CampaignCreated(campaignId, msg.sender, _goal, deadline, _description);
    }

    // Function to contribute to a campaign
    function contribute(uint256 campaignId) public payable isActive(campaignId) {
        require(msg.value > 0, "Contribution must be greater than 0");

        Campaign storage campaign = campaigns[campaignId];
        campaign.totalFunds += msg.value;
        campaign.donations.push(msg.value);
        campaign.donors.push(msg.sender);
        emit DonationMade(campaignId, msg.sender, msg.value);

        // Check if the goal has been reached
        if (campaign.totalFunds >= campaign.goal) {
            campaign.goalReached = true;
        }
    }

    // Function to get the campaign progress (funds raised and percentage)
    function getCampaignProgress(uint256 campaignId) public view returns (uint256, uint256) {
        require(campaignId < campaigns.length, "Campaign does not exist");
        Campaign memory campaign = campaigns[campaignId];
        uint256 percentage = (campaign.totalFunds * 100) / campaign.goal;
        return (campaign.totalFunds, percentage);
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
        require(campaign.goalReached, "Goal not reached");
        require(!campaign.isClosed, "Campaign is closed");

        campaign.isClosed = true;
        uint256 amount = campaign.totalFunds;
        campaign.totalFunds = 0;

        (bool success, ) = payable(campaign.creator).call{value: amount}("");
        require(success, "Failed to send Ether");
        emit FundsWithdrawn(campaignId, campaign.creator, amount);
    }

    // Function to get all campaigns
    function getAllCampaigns() public view returns (Campaign[] memory) {
        return campaigns;
    }

    // Function to get paginated campaigns
    function getPaginatedCampaigns(uint256 offset, uint256 limit) public view returns (Campaign[] memory) {
        require(offset < campaigns.length, "Offset out of bounds");

        uint256 end = offset + limit;
        if (end > campaigns.length) {
            end = campaigns.length;
        }

        Campaign[] memory paginatedCampaigns = new Campaign[](end - offset);
        for (uint256 i = offset; i < end; i++) {
            paginatedCampaigns[i - offset] = campaigns[i];
        }

        return paginatedCampaigns;
    }

    // Function to get donors and donations for a campaign
    function getDonorsAndDonations(uint256 campaignId) public view returns (address[] memory, uint256[] memory) {
        Campaign storage campaign = campaigns[campaignId];
        return (campaign.donors, campaign.donations);
    }
}
