import { useWeb3React } from "@web3-react/core";

import PropTypes from "prop-types";

import { useWallet } from "../hooks";
import { Button } from "./Button";
import { Identicon } from "./Identicon";

export const ConnectButton = ({ block, children }) => {
  const { account } = useWeb3React();
  const { activate, isActive, deactivate, isMetaMask } = useWallet();

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

ConnectButton.propTypes = {
  block: PropTypes.bool,
  children: PropTypes.node,
};
