// src/components/ContractInteraction.js
import React, { useEffect, useState } from "react";
import useContractStore from "@/store/useContractStore";

const ContractInteraction = () => {
  const { contract } = useContractStore();
  const [value, setValue] = useState(null);

  useEffect(() => {
    const fetchValue = async () => {
      if (contract) {
        try {
          const result = await contract.getValue();  // Example view function
          setValue(result.toString());
        } catch (error) {
          console.error("Error fetching value:", error);
        }
      }
    };

    fetchValue();
  }, [contract]);

  return (
    <div>
      <h3>Contract Data:</h3>
      <p>Current Value: {value}</p>
    </div>
  );
};

export default ContractInteraction;
