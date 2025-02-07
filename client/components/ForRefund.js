import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";



export function ReFund({ isDialogOpenForWithdrawal, setIsDialogOpenForWithdrawal }) {
  return (
    <AlertDialog open={isDialogOpenForWithdrawal} onOpenChange={setIsDialogOpenForWithdrawal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-orange-600">ReFund</AlertDialogTitle>
          <AlertDialogDescription>
           <div>Refund</div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* <AlertDialogCancel onClick={() => setIsDialogOpenForWithdrawal(false)}></AlertDialogCancel> */}
          <AlertDialogAction onClick={() => setIsDialogOpenForWithdrawal(false)}>Okay</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
