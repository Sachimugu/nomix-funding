require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const URL = process.env.URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY

console.log({URL, PRIVATE_KEY})
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },},
  networks: {
    zetachain: {
      url:URL,
      accounts: [PRIVATE_KEY], // Or { mnemonic: yourMnemonic } if using a mnemonic
    },
  }
};
