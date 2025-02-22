import { useEffect, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { convertWeiToUsd } from "@/lib/EthPrice";

// Async function to create the donation array
async function createDonationArray(amounts, identifiers) {
  // Check if amounts is falsy or empty
  if (!amounts || amounts.length === 0) {
    return []; // Return an empty array or throw an error, depending on your use case
  }

  // Check if both arrays are the same length
  if (amounts.length !== identifiers.length) {
    throw new Error("The lengths of the amounts and identifiers arrays must match.");
  }

  // Map over the arrays to return an array of objects
  const result = await Promise.all(
    amounts.map(async (amount, index) => {
      try {
        const amountInUsd = await convertWeiToUsd(amount);
        console.log({amount, amountInUsd}) // Convert wei to USD
        return {
          wallet: identifiers[index], // Get the donor at the same index
          amount: `${amount} USD`, // Format the amount as USD
        };
      } catch (error) {
        console.error("Error converting wei to USD:", error);
        throw new Error("Failed to convert wei to USD.");
      }
    })
  );

  return result;
}

export function ContributorList({ isDialogOpen, setIsDialogOpen, wallets, amounts }) {
  const [contributors, setContributors] = useState([]);

  // Use effect to fetch contributors when component mounts or wallets/amounts change
  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const result = await createDonationArray(amounts, wallets);
        setContributors(result); // Set contributors once the data is fetched
      } catch (error) {
        console.error("Error fetching contributors:", error);
      }
    };

    if (wallets && amounts) {
      fetchContributors();
    }
  }, [wallets, amounts]); // Re-run if wallets or amounts change

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-orange-600">Contributors</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="overflow-y-auto h-[20rem] ">
              <table className="table table-md table-pin-rows table-pin-cols w-full ">
                <thead className="dark:text-white text-gray-800 font-medium "  >
                  <tr>
                    <th></th>
                    <td>Wallet</td>
                    <td>Amount</td>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="">
                  {contributors?.map((contributor, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td className=" ">{contributor.wallet.slice(0,20)}...</td>
                      <td>$ {(parseInt(contributor.amount)*1).toFixed(0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => setIsDialogOpen(false)}>Okay</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
