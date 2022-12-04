import React, { useEffect, useState } from "react";

import { Button } from "./Button";
import { Card } from "./Card";
import { Eth } from "./Eth";
import { NumberInput } from "./NumberInput";
import { useAppContext } from "../AppContext";
import { useCoinFlipContract } from "../hooks/useContract";
import { useFunction } from "../hooks/useFunction";
import { useWallet } from "../hooks/useWallet";

const useOwnerAddress = () => {
  const contract = useCoinFlipContract();
  const [ownerAddress, setOwnerAddress] = useState(null);

  useEffect(() => {
    if (!contract) {
      return;
    }
    contract.functions.owner().then(setOwnerAddress);
  }, [contract]);

  return ownerAddress;
};

export const Admin = () => {
  const contract = useCoinFlipContract();
  const { account } = useWallet();
  const [deposit, setDeposit] = useState(1);
  const { contractBalance } = useAppContext();
  const ownerAddress = useOwnerAddress();
  const doDeposit = useFunction("deposit", deposit);
  const doWithdrawAll = useFunction("withdrawContractBalance");
  const isOwner = ownerAddress && ownerAddress[0] === account;

  if (!contract || !isOwner) {
    return null;
  }

  return (
    <Card>
      <h2>Hi Boss!</h2>
      <p style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <span>
          Game balance: <Eth>{contractBalance}</Eth> <Button onClick={doWithdrawAll}>Withdraw all</Button>
        </span>

        <span>
          Deposit: <NumberInput onChange={setDeposit} value={deposit} /> <Button onClick={doDeposit}>Confirm</Button>
        </span>
      </p>
    </Card>
  );
};
