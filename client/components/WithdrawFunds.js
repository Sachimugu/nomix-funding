import React, { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react"; // Add Loader for the loading state
import { useWalletStore } from "@/store/wallet-store"; // Assuming you have a callTransactionFunction to handle transactions

const WithdrawFunds = ({ isDialogOpenForWithdrawal, setIsDialogOpenForWithdrawal }) => {
  const { callTransactionFunction } = useWalletStore();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false); // For showing success/error dialog

  // Handle the close of the result dialog and reset the error state
  const handleClose = () => {
    setError(null); // Reset the error state
    setSuccess(false); // Reset the success state
    setShowResultDialog(false); // Close the result dialog
  };

  const handleWithdrawFunds = async () => {
    setIsLoading(true);
    setError(null); // Reset any existing errors
    setSuccess(false); // Reset success state

    try {
      // Call the transaction function to withdraw funds
      const receipt = await callTransactionFunction("withdrawFunds", 1); // Assuming 1 is the required parameter

      if (!receipt.success) {
        setError(receipt.msg); // Set error message if transaction fails
      } else {
        setSuccess(true); // Set success state
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    }

    setIsLoading(false); // Hide loader
    setShowResultDialog(true); // Show result dialog after transaction
  };

  return (
    <>
      {/* Withdrawal Confirmation Dialog */}
      <AlertDialog open={isDialogOpenForWithdrawal} onOpenChange={setIsDialogOpenForWithdrawal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-orange-600">Withdraw Funds</AlertDialogTitle>
            <AlertDialogDescription>
              <div>{error ? error : "Confirm to withdraw funds"}</div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDialogOpenForWithdrawal(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleWithdrawFunds}>
              {isLoading ? (
                <Loader className="text-orange-600 dark:text-white animate-spin mx-auto" size={34} />
              ) : (
                "Confirm"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success/Error Result Dialog */}
      <AlertDialog open={showResultDialog} onOpenChange={setShowResultDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className={success ? "text-green-600" : "text-red-600"}>
              {success ? "Success" : "Error"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div>{success ? "Funds withdrawn successfully!" : error || "An error occurred."}</div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleClose}>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default WithdrawFunds;
