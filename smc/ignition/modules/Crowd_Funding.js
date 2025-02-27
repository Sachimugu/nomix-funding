// ignition/modules/CrowdFundingModule.js

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// Sepolia ETH/USD Price Feed Address
const SEPOLIA_ETH_USD_PRICE_FEED = "0x694AA1769357215DE4FAC081bf1f309aDC325306";

module.exports = buildModule("CrowdFundingModule", (m) => {
  // Deploy the CrowdFunding contract with the Sepolia ETH/USD Price Feed address
  const priceFeed = m.getParameter("priceFeed", SEPOLIA_ETH_USD_PRICE_FEED);

  const crowdFunding = m.contract("CrowdFunding",[priceFeed]
    // {gasLimit: 6000000}
   )
 
   return { crowdFunding };
}); 