// ignition/modules/CrowdFundingModule.js

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// Sepolia ETH/USD Price Feed Address

module.exports = buildModule("CrowdFundingModule", (m) => {
  // Deploy the CrowdFunding contract with the Sepolia ETH/USD Price Feed address

  const crowdFunding = m.contract("CrowdFunding")
 
   return { crowdFunding };
}); 