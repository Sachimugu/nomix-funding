export const errorMessages = {
    "Campaign does not exist": "The specified campaign does not exist.",
    "Goal must be greater than 0": "The goal amount must be greater than 0.",
    "Duration must be greater than 0": "The campaign duration must be greater than 0.",
    "Campaign deadline has passed": "The campaign deadline has already passed.",
    "Contribution must be greater than 0": "Your contribution must be greater than 0.",
    "Sent value does not match the specified amount": "The sent value doesn't match the specified contribution amount.",
    "Campaign deadline not reached": "The campaign's deadline has not yet been reached.",
    "Goal has been reached": "The campaign's goal has already been reached.",
    "Campaign is closed": "This campaign has already been closed.",
    "You did not donate to this campaign": "You did not contribute to this campaign.",
    "You have no donation to refund": "You have no donations eligible for a refund.",
    "Goal not reached": "The campaign goal was not reached, so you cannot withdraw funds.",
    "Campaign index out of bounds": "The campaign index is out of bounds.",
    "Offset out of bounds": "The offset is out of bounds for the campaign list.",
    "Contract not available": "The contract is not available. Please connect your wallet.",
    "Wallet not connected": "Wallet not connected. Please connect your wallet first.",
  };
  
  export const handleError = (error) => {
    // Try to extract the revert message from error
    let revertMessage = '';
  
    // Check if error has revert data, which would be inside error.revert.args
    if (error?.revert?.args && Array.isArray(error.revert.args)) {
      revertMessage = error.revert.args[0]; // Get the first argument (the revert reason)
    } else {
      // Fallback to regular error message if no revert data is available
      revertMessage = error.message || "An unexpected error occurred.";
    }
  
    // Clean up the message by removing unwanted parts like 'execution reverted: '
    revertMessage = revertMessage.replace('execution reverted: ', '').trim();
  
    // Return the mapped message from errorMessages or the revertMessage itself
    return errorMessages[revertMessage] || revertMessage || "An unexpected error occurred.";
  };