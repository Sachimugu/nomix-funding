"use client";
import { ContributorList } from "@/components/ContributorList";
import Deadline from "@/components/Deadline";
import ReFund from "@/components/ForRefund";
import WithdrawFunds from "@/components/WithdrawFunds";
import {
  convertUsdToWei,
  convertWeiToUsd,
  formatNumber,
  getEthPrice,
} from "@/lib/EthPrice";
import { useWalletStore } from "@/store/wallet-store";
import { ethers } from "ethers";
import { Loader } from "lucide-react";
import { progress } from "motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CampaignSingle({ params }) {
  const {
    connectWallet,
    sendEtherToContract,
    callReadOnlyFunctionWithPrivateKey,
    callTransactionFunction,
    contract,
    walletAddress,
  } = useWalletStore();

  // const dummyData = {
  //   id: "0x1234567890abcdef1234567890abcdef12345678",
  //   name: "Help Save the Forests",
  //   description: "CNC machines shouldn’t be out of reach because of high costs or complexity. We believe everyone deserves the chance to create. That’s why we built Cubiko — a CNC Router that’s affordable, easy to use, and designed to inspire creators of all levels CNC machines shouldn’t be out of reach because of high costs or complexity. We believe everyone deserves the chance to create. That’s why we built Cubiko — a CNC Router that’s affordable, easy to use, and designed to inspire creators of all levels ",
  //   manager: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
  //   minimumContribution: "0.1",
  //   balance: "10",
  //   requestsCount: 3,
  //   approversCount: 150,
  //   target: "50",
  //   ETHPrice: "3000", // $ per ETH
  // };

  const [amountInEth, setAmountInEth] = useState();
  const [isDialogOpenForRefund, setIsDialogOpenForRefund] = useState(false);
  const [isDialogOpenForWithdrawal, setIsDialogOpenForWithdrawal] =
    useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [campaign, setCampaign] = useState();
  const [ethPrice, setEthPrice] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const { campaignId } = await params;

    console.log({ x: typeof amountInEth });
    const data = await sendEtherToContract(
      "contribute",
      amountInEth,
      campaignId
    );

    setAmountInEth("");
    setIsLoading(false);
    // Reset the input after the transaction
  };

  const getETHPriceInUSD = (ETHPrice, amountInETH) => {
    return (ETHPrice * amountInETH).toFixed(2);
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const ForWithdrawal = () => {
    setIsDialogOpenForWithdrawal(true);
  };

  const ForRefund = () => {
    console.log("ForRefund0000000"); //
    setIsDialogOpenForRefund(true);
  };

  const formatCampaignData = async (campaign) => {
    try {
      const totalFunds = formatNumber(parseFloat(ethers.formatUnits(campaign.totalFunds.toString(), 18)) )
      // console.log({totalFunds})//await convertWeiToUsd(parseInt(campaign.totalFunds));
      const goal = formatNumber(
        parseFloat(ethers.formatUnits(campaign.goal.toString(), 18))
      );
     
      // const formatedtf = formatNumber(parseFloat(totalFunds));
      const eth = await getEthPrice();

      const ethgoal = (parseFloat(campaign.goal) / eth).toFixed(1); // Round to 1 decimal place
      const ethtotalFunds = (parseFloat(totalFunds) / eth).toFixed(1); // Round to 1 decimal place

      console.log({ totalFunds, goal });

      console.log({ ethgoal });
      const donations = await Promise.all(
        campaign.donations.map(async (donation) => {
          return await convertWeiToUsd(parseInt(donation)); // Convert BigNumber array
        })
      );
      const PINATA_BASE_URL = "https://gateway.pinata.cloud/ipfs/";

      return {
        creator: campaign.creator,
        goal, // Convert BigNumber to number
        deadline: new Date(parseInt(campaign.deadline) * 1000).toLocaleString(), // Format timestamp to date
        totalFunds, // Convert BigNumber to number
        description: campaign.description,
        // imageUrl: campaign.imageUrl,

        imageUrl: `${PINATA_BASE_URL}${campaign.imageUrl}`,
        name: campaign.name,
        goalReached: campaign.goalReached,
        isClosed: campaign.isClosed,
        donations, // Wait for all donations to be converted
        donors: campaign.donors,
        ethgoal,
        progress: (totalFunds / formatNumber(parseFloat(ethers.formatUnits(campaign.goal.toString(), 18)) )) * 100,
        formatedtf:totalFunds,
        ethtotalFunds,
        minimumFunds: parseInt(campaign.min_donation),
      };
    } catch (error) {
      console.error("Error formatting campaign data:", error);
    }
  };

  useEffect(() => {
    const fetchContractData = async () => {
      const { campaignId } = await params;

      const eth = await getEthPrice();
      setEthPrice(eth); // Replace with your method name and params
      const data = await callReadOnlyFunctionWithPrivateKey(
        "getCampaignByIndex",
        campaignId
      );
      console.log({ data }); // Replace with your method name and params
      const campaignDetails = await formatCampaignData(data);
      console.log({ campaignDetails });
      setCampaign(campaignDetails);
    };

    fetchContractData();
    // setAmountInEth('')// Replace with your method name and params
  }, [amountInEth]);

  console.log(campaign);

  return (
    <div>
      <div className="pt-8">
        <div className="max-w-[90rem] mx-auto py-6 px-4">
          <div className="flex flex-col md:flex-row  gap-6 md:gap-28">
            <div className="flex-1  space-y-4 ">
              <h1 className="text-4xl font-bold">{campaign?.name}</h1>
              <p className="hidden md:block text-lg h-[18rem] py-4 mb-4 text-gray-600 dark:text-gray-400">
                {campaign?.description.slice(0, 600)}
              </p>
              <p className=" md:hidden text-lg h-[10rem] py-4 mb-4 text-gray-600 dark:text-gray-400">
                {campaign?.description.slice(0, 150)}
              </p>
              <a
                href={`https://rinkeby.etherscan.io/address/$}`}
                className=" text-orange-600 hover:text-orange-700"
              >
                <p className="pt-4">View on Sepolia Etherscan</p>
              </a>
              <div className="pt-">
                <div className=" flex flex-col  gap-6">
                  <div className="dark:border-[1px] dark:border-gray-500  shadow-2xl rounded-lg p-5">
                    <h3 className="font-semibold">Campaign Balance</h3>
                    <div className="text-2xl text-orange-600 font-bold">
                      {(campaign?.formatedtf * 1).toFixed(3)} ETH (~$
                      {Math.round(campaign?.formatedtf*(ethPrice))}USD)
                    </div>
                    <p >
                      Target: <span className="text-orange-600">{campaign?.goal} ETH (~$
                        {Math.round(campaign?.goal * ethPrice)} USD)</span>
                    </p>
                    <div className="w-full bg-gray-200 h-2 mt-4 rounded">
                      <div
                        className="bg-orange-600 h-2 rounded"
                        style={{
                          width: `${campaign?.progress}%`,
                        }}
                      > </div>
                    </div>
                  </div>

                  <div className="border border-gray-600 shadow-lg rounded-lg p-5">
                    <h3 className="font-semibold">
                      Wallet Address of Campaign Creator
                    </h3>
                    <p className="text-orange-600 text-sm md:hidden">{campaign?.creator.slice(0, 35)}</p>
                    <p className="text-orange-600 hidden md:block">{campaign?.creator}</p>
                  </div>
                  <div className="border border-gray-600 shadow-md rounded-md p-5">
                    <h3 className="font-semibold">Number of Backers</h3>
                    <p className="text-orange-600">{campaign?.donors.length}</p>
                  </div>
                  <div className="border border-gray-600 shadow-md rounded-md p-5">
                    <h3 className="font-semibold">Campaign Deadline</h3>
                    {/* <p><Deadline targetDate="14/02/2025, 00:00:15"/></p> */}
                    {/* <p><Deadline targetDate={campaign?.deadline.toString()}/></p> */}
                    <p>
                      <Deadline
                        targetDate={
                          campaign?.deadline
                            ? campaign.deadline
                            : "13/02/2025, 00:00:15"
                        }
                      />
                    </p>
                    {/* <p><Deadline targetDate={new Date(campaign?.deadline).toString()}/></p> */}

                    {/* <p><Deadline targetDate="2025-02-13T00:00:15"/></p> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-6 ">
              <div className="pt-8   overflow-hidden">
                <img
                  src={campaign?.imageUrl}
                  alt={campaign?.name}
                  className=" h-[23rem] w-full object-cover saturate-100 transition-all duration-200 ease-linear group-hover/hoverimg:saturate-50 group-hover/hoverimg:scale-[1.01]"
                />
              </div>
              <div className="border border-gray-600 shadow-lg rounded-lg p-5">
                <h3 className="font-semibold">Minimum Contribution</h3>
                <p className="text-orange-600">
                  {(campaign?.minimumFunds / ethPrice).toFixed(3)} ETH (~$
                  {campaign?.minimumFunds} USD)
                </p>
              </div>

              <div className="dark:border-[1px] dark:border-gray-500  rounded-lg  dark:text-gray-800 shadow-2xl p-6">
                <h3 className="text-xl font-semibold text-orange-600">
                  Contribute Now!
                </h3>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label
                      className="block dark:text-white text-sm font-medium"
                      htmlFor="value"
                    >
                      Amount in Eth
                    </label>

                    <input
                      type=""
                      id="value"
                      name="value"
                      className="mt-1 p-2 w-full border-[1px] border-gray-400 rounded bg-gray-200 focus:outline-none focus:ring-gray-500 focus:ring-[0.6px]"
                      onChange={(e) => {
                        setAmountInEth(e.target.value);
                      }}
                    />
                    {amountInEth && (
                      <p className="text-sm text-gray-500 mt-2">
                        ~${Math.round(amountInEth * ethPrice)} USD
                      </p>
                    )}
                  </div>
                  <div className="space-y-4">
                    <button
                      type="submit"
                      className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
                    >
                      {isLoading ? (
                        <Loader
                          className="text-white animate-spin mx-auto"
                          size={34}
                        />
                      ) : (
                        "Contribute"
                      )}
                    </button>
                  </div>
                </form>
              </div>

              <div className="dark:border-[1px] dark:border-gray-500  shadow-lg rounded-lg p-6">
                <button
                  type="button"
                  onClick={openDialog}
                  className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 p-3"
                >
                  View Contributors
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  * You can see where these funds are being used & if you have
                  contributed, you can approve those Withdrawal Requests.
                </p>
                <div>
                  <div
                    onClick={ForWithdrawal}
                    className="text-orange-600 cursor-pointer hover:underline"
                  >
                    Withdrawal Funds
                  </div>
                  <div
                    onClick={ForRefund}
                    className="text-orange-600 cursor-pointer hover:underline"
                  >
                    Request Refund
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContributorList
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        amounts={campaign?.donations}
        wallets={campaign?.donors}
      />
      <WithdrawFunds
        isDialogOpenForWithdrawal={isDialogOpenForWithdrawal}
        setIsDialogOpenForWithdrawal={setIsDialogOpenForWithdrawal}
      />
      <ReFund
        isDialogOpenForRefund={isDialogOpenForRefund}
        setIsDialogOpenForRefund={setIsDialogOpenForRefund}
      />
    </div>
  );
}
