'use client'
import { ContributorList } from "@/components/ContributorList";
import { ReFund } from "@/components/ForRefund";
import { useState } from "react";

export default function CampaignSingle() {
    const dummyData = {
      id: "0x1234567890abcdef1234567890abcdef12345678",
      name: "Help Save the Forests",
      description: "CNC machines shouldn’t be out of reach because of high costs or complexity. We believe everyone deserves the chance to create. That’s why we built Cubiko — a CNC Router that’s affordable, easy to use, and designed to inspire creators of all levels CNC machines shouldn’t be out of reach because of high costs or complexity. We believe everyone deserves the chance to create. That’s why we built Cubiko — a CNC Router that’s affordable, easy to use, and designed to inspire creators of all levels ",
      manager: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
      minimumContribution: "0.1",
      balance: "10",
      requestsCount: 3,
      approversCount: 150,
      target: "50",
      ETHPrice: "3000", // $ per ETH
    };
    
    const [amountInUSD, setAmountInUSD] = useState();
    const [isDialogOpenForRefund, setIsDialogOpenForRefund] = useState(false);
    const [isDialogOpenForWithdrawal, setIsDialogOpenForWithdrawal] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
   
    const handleSubmit = (event) => {
      event.preventDefault();
      setIsSubmitted(true);
      setAmountInUSD(null);
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
    setIsDialogOpenForRefund(true);
  };
  
    return (
      <div>
        <div className="">
        
          <div className="max-w-[90rem] mx-auto py-6 px-4">
            <div className="flex flex-col md:flex-row  gap-6 md:gap-28">
              <div className="flex-1  space-y-4 ">
                <h1 className="text-4xl font-bold">{dummyData.name}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">{dummyData.description}</p>
                <a href={`https://rinkeby.etherscan.io/address/${dummyData.id}`} className="text-orange-600 hover:text-orange-700">
                  View on Rinkeby Etherscan
                </a>
                <div className="mt-8">
                  <div className=" flex flex-col  gap-6">
                    <div className="border border-gray-600 shadow-lg rounded-lg p-5">
                      <h3 className="font-semibold">Minimum Contribution</h3>
                      <p>{dummyData.minimumContribution} ETH (~${getETHPriceInUSD(dummyData.ETHPrice, dummyData.minimumContribution)} USD)</p>
                    </div>
                    <div className="border border-gray-600 shadow-lg rounded-lg p-5">
                      <h3 className="font-semibold">Wallet Address of Campaign Creator</h3>
                      <p>{dummyData.manager}</p>
                    </div>
                    <div className="border border-gray-600 shadow-md rounded-md p-5">
                      <h3 className="font-semibold">Number of Requests</h3>
                      <p>{dummyData.requestsCount}</p>
                    </div>
                    <div className="border border-gray-600 shadow-md rounded-md p-5">
                      <h3 className="font-semibold">Number of Approvers</h3>
                      <p>{dummyData.approversCount}</p>
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="flex-1 space-y-6 ">
                <div className="dark:border-[1px] dark:border-gray-500  shadow-2xl rounded-lg p-6">
                  <h3 className="font-semibold">Campaign Balance</h3>
                  <div className="text-2xl font-bold">
                    {dummyData.balance} ETH (~${getETHPriceInUSD(dummyData.ETHPrice, dummyData.balance)} USD)
                  </div>
                  <p>Target: {dummyData.target} ETH (~${getETHPriceInUSD(dummyData.ETHPrice, dummyData.target)} USD)</p>
                  <div className="w-full bg-gray-200 h-2 mt-4 rounded">
                    <div
                      className="bg-orange-600 h-2 rounded"
                      style={{
                        width: `${(dummyData.balance / dummyData.target) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
  
                <div className="dark:border-[1px] dark:border-gray-500  rounded-lg  dark:text-gray-800 shadow-2xl p-6">
                  <h3 className="text-xl font-semibold text-orange-600">Contribute Now!</h3>
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                      <label className="block dark:text-white text-sm font-medium" htmlFor="value">
                        Amount in Ether
                      </label>
                      
                      <input
                        type=""
                        id="value"
                        name="value"
                        className="mt-1 p-2 w-full border-[1px] border-gray-400 rounded bg-gray-200 focus:outline-none focus:ring-gray-500 focus:ring-[0.6px]"
                        onChange={(e) => {
                          setAmountInUSD(Math.abs(e.target.value));
                        }}
                      />
                      {amountInUSD && (
                        <p className="text-sm text-gray-500 mt-2">
                          ~${getETHPriceInUSD(dummyData.ETHPrice, amountInUSD)}
                        </p>
                      )}
                    </div>
                    <div className="space-y-4">
                      <button
                        type="submit"
                        className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
                      >
                        Contribute
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
                    * You can see where these funds are being used & if you have contributed, you can approve those Withdrawal Requests.
                  </p>
                  <div>

                  <div  onClick={ForWithdrawal} href={`https://rinkeby.etherscan.io/address/${dummyData.id}`} className="text-orange-600 hover:text-orange-700">
                  Withdrawal Funds
                </div>
                  </div>
                <div  onclick={ForRefund} href={`https://rinkeby.etherscan.io/address/${dummyData.id}`} className="text-orange-600 hover:text-orange-700">
                  Request Refund
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <ContributorList isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
      <ReFund isDialogOpenForWithdrawal={isDialogOpenForWithdrawal} setIsDialogOpenForWithdrawal={isDialogOpenForWithdrawal} />
      <ContributorList isDialogOpenForRefund={isDialogOpenForRefund } setIsDialogOpenForRefund={setIsDialogOpenForRefund} />

      </div>
    );
  }
  