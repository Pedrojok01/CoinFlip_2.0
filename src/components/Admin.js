import React, { useEffect, useState } from "react";

import { Button } from "./Button";
import { Eth } from "./Eth";
import { useAppContext } from "../AppContext";
import { useWallet } from "../hooks/useWallet";
import { NumberInput } from "./NumberInput";
import { useCoinFlipContract } from "../hooks/useContract";
import { useFunction } from "../hooks/useFunction";

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
    <div>
      <hr style={{ marginTop: 20, marginBottom: 20, opacity: 0.34 }} />
      <h2>Hi Boss!</h2>
      <p>
        Game balance: <Eth>{contractBalance}</Eth>
        <br />
        Deposit: <NumberInput onChange={setDeposit} value={deposit} /> <Button onClick={doDeposit}>Confirm</Button>
        <br />
        <Button onClick={doWithdrawAll}>Withdraw all</Button>
      </p>
    </div>
  );
};
