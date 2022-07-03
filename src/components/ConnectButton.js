import React from "react";

import { useWallet } from "../hooks/useWallet";
import { Button } from "./Button";
import { Identicon } from "./Identicon";

export const ConnectButton = ({ block, children }) => {
  const { activate, isActive, deactivate, account, isMetaMask } = useWallet();

  if (account && isActive) {
    return (
      <Button title={account} onClick={deactivate} block={block}>
        <Identicon />
        {account.substring(0, 5) + "..." + account.substring(account.length - 5)}
      </Button>
    );
  }

  if (!isMetaMask) {
    return (
      <Button onClick={() => {}} block={block}>
        MetaMask is required
      </Button>
    );
  }

  return (
    <Button onClick={activate} block={block}>
      {children || "Connect Wallet"}
    </Button>
  );
};
