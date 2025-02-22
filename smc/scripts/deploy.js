const hre = require("hardhat");

async function main() {
  const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
  console.log(CrowdFunding)
  const crowdFunding = await CrowdFunding.deploy("0x694AA1769357215DE4FAC081bf1f309aADC325306");

  await crowdFunding.deployed();

  console.log("Crowd_FundingModule deployed to:", crowdFunding.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });