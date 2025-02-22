const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Crowd_FundingModuleV2", (m) => {
  const crowdFunding = m.contract("CrowdFunding", ["0x694AA1769357215DE4FAC081bf1f309aADC325306"], {
    gasLimit: 6000000, // Manually set gas limit
  });
  console.log(crowdFunding)
  return { crowdFunding };
});