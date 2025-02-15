import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useWalletStore } from "@/store/wallet-store";

const ReFund = ({ isDialogOpenForRefund, setIsDialogOpenForRefund }) => {
    const { callTransactionFunction } = useWalletStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [showResultDialog, setShowResultDialog] = useState(false); 
    
    const handleClose = () => {
      setError(null); // Reset the error state
      setSuccess(false); // Reset the success state
      setShowResultDialog(false); // Close the result dialog
    };

    const handleClaimRefund = async () => {
        setIsLoading(true);
        setError(null); // Reset any existing errors
        setSuccess(false); // Reset success state

        try {
            // Attempting to claim the refund (ensure `1` is the correct campaign ID or parameter)
            const receipt = await callTransactionFunction("claimRefund", 1);

            if (!receipt.success) {
                setError(receipt.msg); // Set error message if transaction fails
            } else {
                setSuccess(true); // If the transaction is successful
            }
        } catch (err) {
            setError(err.message || "An unexpected error occurred.");
        }

        setIsLoading(false); // Hide loader
        setShowResultDialog(true); // Show result dialog after claim
    };

    return (
        <>
            {/* Refund Confirmation Dialog */}
            <AlertDialog open={isDialogOpenForRefund} onOpenChange={setIsDialogOpenForRefund}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-orange-600">ReFund</AlertDialogTitle>
                        <AlertDialogDescription>
                            <div>{error ? error : "Confirm to refund"}</div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsDialogOpenForRefund(false)}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleClaimRefund}>
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
                            {success ? "Success" : "Failed"}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            <div>{success ? "Refund successful!" : error || "An error occurred."}</div>
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

export default ReFund;
