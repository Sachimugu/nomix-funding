const hre = require("hardhat");

async function main() {
  const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
  console.log(CrowdFunding)
  const crowdFunding = await CrowdFunding.deploy();

  await crowdFunding.deployed();

  console.log("Crowd_FundingModule deployed to:", crowdFunding.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


  