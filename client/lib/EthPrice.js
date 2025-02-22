// Function to get the current ETH price in USD (using CryptoCompare API)
export async function getEthPrice() {
    const url = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD';
    const response = await fetch(url);
    const data = await response.json();
    return data.USD;
}

// Convert USD to Wei without using the ethers library
export async function convertUsdToWei(amountInUSD) {
    try {
        // Get the current ETH price in USD
        const usdToEthConversionRate = await getEthPrice();

        // Convert USD to Ether (1 USD = 1 / ETH price in USD)
        const amountInEther = amountInUSD / usdToEthConversionRate;

        // Convert Ether to Wei (1 Ether = 10^18 Wei)
        const amountInWei = amountInEther * Math.pow(10, 18);
        const ooo = BigInt(amountInWei)
        console.log({amountInWei, ooo});

        return ooo;
    } catch (error) {
        console.error('Error converting USD to Wei:', error);
    }
}

// Convert Wei to USD without using the ethers library
export async function convertWeiToUsd(amountInWei) {
    try {
        // Get the current ETH price in USD
        const usdToEthConversionRate = await getEthPrice();

        // Convert Wei to Ether (1 Ether = 10^18 Wei)
        const amountInEther = amountInWei / Math.pow(10, 18);

        // Convert Ether to USD
        const amountInUSD = amountInEther * usdToEthConversionRate;

        return amountInUSD;
    } catch (error) {
        console.error('Error converting Wei to USD:', error);
    }
}



function convertToBigIntIfNeeded(number) {
    if (typeof number === 'number' && !Number.isSafeInteger(number)) {
      // Number is a regular number but not a safe integer, convert to BigInt
      return BigInt(number);
    } else if (typeof number === 'string') {
      // If it's a string, try converting directly. This handles very large numbers.
      try {
        return BigInt(number);
      } catch (e) {
        return "Invalid number string"; // Or handle the error as you see fit.
      }
    } else if (typeof number === 'bigint') {
        return number; // It's already a BigInt
    }
    else {
      // It's already a safe integer or some other type, return as is.
      return number;
    }
  }


  export const  formatNumber = (num) => {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1) + 'M';
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1) + 'K';
    } else {
      return num.toString();
    }
  };