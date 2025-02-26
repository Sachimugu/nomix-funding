// ignition/modules/CrowdFundingModule.js

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// Sepolia ETH/USD Price Feed Address
const SEPOLIA_ETH_USD_PRICE_FEED = "0x694AA1769357215DE4FAC081bf1f309aDC325306";

module.exports = buildModule("CrowdFundingModule", (m) => {
  // Deploy the CrowdFunding contract with the Sepolia ETH/USD Price Feed address
  const crowdFunding = m.contract("CrowdFunding", [SEPOLIA_ETH_USD_PRICE_FEED],
    {gasLimit: 6000000}
   )
 
  // Return the deployed contract for use in other modules
}); 