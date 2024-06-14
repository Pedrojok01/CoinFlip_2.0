import { useEffect, useState } from "react";

import styled from "@emotion/styled";
import { useWeb3React } from "@web3-react/core";

import { CHAINS, SUPPORTED_CHAINS } from "../data/constants";
import { useWallet, isValidChainId } from "../hooks";

const StyledWarning = styled.div`
  background-color: ${({ theme }) => theme.colors.complementary};
  color: ${({ theme }) => theme.colors.darker};
  padding: ${({ theme }) => theme.space.m}px;
  text-align: center;
`;

const useRenderTimeout = (ms = 1000) => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, [ms]);

    return () => clearTimeout(timer);
  }, [ms]);

  return isReady;
};

export const Warning = () => {
  const { chainId } = useWeb3React();
  const { isMetaMask, isActive } = useWallet();
  const isReady = useRenderTimeout();
  let warning = null;

  const supportedChainNames = SUPPORTED_CHAINS.map((id) => CHAINS[id]?.name).join(", ");

  if (!isMetaMask) {
    warning = "No MetaMask found, MetaMask is required to interact.";
  } else if (!isActive) {
    warning = `Connect your wallet to start, supported chains: ${supportedChainNames}`;
  } else if (!isValidChainId(chainId)) {
    warning = `Invalid chain, supported chains: ${supportedChainNames}`;
  }

  if (!warning || !isReady) {
    return null;
  }

  return <StyledWarning>{warning}</StyledWarning>;
};
