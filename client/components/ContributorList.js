import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

// Fake data
const fakeContributors = [
  { wallet: "0x12345abcd12345abcd12345abcd12345abcd12345", amount: "2.5 ETH" },
  { wallet: "0x23456bcde23456bcde23456bcde23456bcde2345", amount: "1.8 ETH" },
  { wallet: "0x34567cdef34567cdef34567cdef34567cdef3456", amount: "3.2 ETH" },
  { wallet: "0x45678defg45678defg45678defg45678defg4567", amount: "0.8 ETH" },
  { wallet: "0x56789efgh56789efgh56789efgh56789efgh5678", amount: "4.0 ETH" },
  { wallet: "0x6789aefgh6789aefgh6789aefgh6789aefgh6789", amount: "1.0 ETH" },
  { wallet: "0x789abfghi789abfghi789abfghi789abfghi789a", amount: "0.6 ETH" },
  { wallet: "0x89abcfghj89abcfghj89abcfghj89abcfghj89ab", amount: "2.3 ETH" },
  { wallet: "0x9abcdefgh9abcdefgh9abcdefgh9abcdefgh9abc", amount: "5.1 ETH" },
  { wallet: "0xa123bcdff0xa123bcdff0xa123bcdff0xa123bcd", amount: "1.2 ETH" },
  { wallet: "0xb234cdefg0xb234cdefg0xb234cdefg0xb234cde", amount: "2.9 ETH" },
  { wallet: "0xc345deghj0xc345deghj0xc345deghj0xc345deg", amount: "0.5 ETH" },
  { wallet: "0xd456efhkl0xd456efhkl0xd456efhkl0xd456efh", amount: "3.7 ETH" },
  { wallet: "0xe567fghlm0xe567fghlm0xe567fghlm0xe567fgh", amount: "4.3 ETH" },
  { wallet: "0xf678ghilm0xf678ghilm0xf678ghilm0xf678ghil", amount: "1.6 ETH" },
  { wallet: "0x12345ijkl0x12345ijkl0x12345ijkl0x12345ij", amount: "2.0 ETH" },
  { wallet: "0x23456jklm0x23456jklm0x23456jklm0x23456jk", amount: "1.4 ETH" },
  { wallet: "0x34567klmn0x34567klmn0x34567klmn0x34567kl", amount: "3.8 ETH" },
  { wallet: "0x45678lmno0x45678lmno0x45678lmno0x45678lm", amount: "0.9 ETH" },
  { wallet: "0x56789mnop0x56789mnop0x56789mnop0x56789m", amount: "1.5 ETH" },
];


export function ContributorList({ isDialogOpen, setIsDialogOpen }) {
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
                  {fakeContributors.map((contributor, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td className=" ">{contributor.wallet.slice(0,20)}...</td>
                      <td>{contributor.amount}</td>
                    </tr>
                  ))}
                </tbody>
                
              </table>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* <AlertDialogCancel onClick={() => setIsDialogOpen(false)}></AlertDialogCancel> */}
          <AlertDialogAction onClick={() => setIsDialogOpen(false)}>Okay</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
