const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CrowdFunding", function () {
  let CrowdFunding;
  let crowdFunding;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    CrowdFunding = await ethers.getContractFactory("CrowdFunding");
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the contract
    crowdFunding = await CrowdFunding.deploy(); // No need for .deployed()
  });

  describe("createCampaign", function () {
    it("Should create a new campaign", async function () {
      const name = "Test Campaign";
      const description = "This is a test campaign";
      const goal = ethers.parseEther("10"); // 10 ETH
      const duration = 7 * 24 * 60 * 60; // 7 days in seconds
      const imageUrl = "https://example.com/image.png";

      // Call createCampaign
      await crowdFunding.createCampaign(name, description, goal, duration, imageUrl);
      const campaign = await crowdFunding.campaigns(0);
      console.log({campaign: campaign})
      expect(campaign.creator).to.equal(owner.address);
      expect(campaign.goal).to.equal(goal);
      expect(campaign.description).to.equal(description);
      expect(campaign.name).to.equal(name);
      expect(campaign.imageUrl).to.equal(imageUrl);
      expect(campaign.goalReached).to.be.false;
      expect(campaign.isClosed).to.be.false;
      expect(campaign.totalFunds).to.equal(0);
    });


   

    it("Should revert if goal is 0", async function () {
      const name = "Invalid Campaign";
      const description = "This campaign has an invalid goal";
      const goal = 0; // Invalid goal
      const duration = 7 * 24 * 60 * 60; // 7 days in seconds
      const imageUrl = "https://example.com/image.png";

      await expect(
        crowdFunding.createCampaign(name, description, goal, duration, imageUrl)
      ).to.be.revertedWith("Goal must be greater than 0");
    });

    it("Should revert if duration is 0", async function () {
      const name = "Invalid Campaign";
      const description = "This campaign has an invalid duration";
      const goal = ethers.parseEther("10"); // 10 ETH
      const duration = 0; // Invalid duration
      const imageUrl = "https://example.com/image.png";

      await expect(
        crowdFunding.createCampaign(name, description, goal, duration, imageUrl)
      ).to.be.revertedWith("Duration must be greater than 0");
    });
  });








  describe("contribute", function () {
    let campaignId;
    const goal = ethers.parseEther("10"); // 10 ETH goal
    const duration = 86400; // 1 day in seconds
    const imageUrl = "http://example.com/campaign-image.png";
    const description = "This is a new fundraising campaign";
    let addr2; // Define addr2

    beforeEach(async function () {
        // Get additional signers
        [owner, addr1, addr2] = await ethers.getSigners();

        // Create a new campaign
        await crowdFunding.connect(owner).createCampaign("New Campaign", description, goal, duration, imageUrl);

        // Get the campaignId of the newly created campaign (it will be 0 for the first one)
        campaignId = 0;
    });

    it("should allow a valid contribution", async function () {
        const amount = ethers.parseEther("1"); // 1 ETH
        const amount2 = ethers.parseEther("5"); // 5 ETH

        // Make the first contribution
        await expect(crowdFunding.connect(addr1).contribute(campaignId, amount, { value: amount }))
            .to.emit(crowdFunding, "DonationMade")
            .withArgs(campaignId, addr1.address, amount);

        // Make the second contribution
        await expect(crowdFunding.connect(addr2).contribute(campaignId, amount2, { value: amount2 }))
            .to.emit(crowdFunding, "DonationMade")
            .withArgs(campaignId, addr2.address, amount2);

        // Fetch the campaign details after the contributions
        const campaign = await crowdFunding.campaigns(campaignId);

        console.log({ campaign });

        // Check the total funds raised
        expect(campaign.totalFunds).to.equal(amount + amount2);

        // Check that the donors have been added
        expect(campaign.donors[0]).to.equal(addr1.address);
        expect(campaign.donors[1]).to.equal(addr2.address);

        // Check that the donations have been recorded
        expect(campaign.donations[0]).to.equal(amount);
        expect(campaign.donations[1]).to.equal(amount2);
    });
});

});


