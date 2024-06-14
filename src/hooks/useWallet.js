import { useCallback, useEffect, useMemo } from "react";

import { useWeb3React } from "@web3-react/core";

import { SUPPORTED_CHAINS } from "../data/constants";
import { useStore } from "../stores/useStore";

export const isValidChainId = (chainId) => (chainId ? SUPPORTED_CHAINS.includes(chainId) : undefined);

const addSepoliaNetwork = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0xaa36a7", // Hexadecimal of 11155111
          chainName: "Sepolia",
          nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
          },
          rpcUrls: ["https://1rpc.io/sepolia"],
          blockExplorerUrls: ["https://sepolia.etherscan.io"],
        },
      ],
    });
  } catch (addError) {
    console.error("Failed to add Sepolia network to MetaMask", addError);
  }
};

export const useWallet = () => {
  const { isActive, chainId, connector } = useWeb3React();
  const { reset } = useStore();

  const isValidChain = useMemo(() => isValidChainId(chainId), [chainId]);

  useEffect(() => {
    if (chainId && !isValidChain) {
      const switchChain = async () => {
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: `0x${SUPPORTED_CHAINS[0].toString(16)}` }],
          });
        } catch (error) {
          if (error.code === 4902) {
            await addSepoliaNetwork();
          }
          console.error("Invalid chainId", chainId);
        }
      };
      switchChain();
    }
  }, [chainId, isValidChain]);

  const handleActivate = useCallback(async () => {
    try {
      await connector.activate();
    } catch (error) {
      console.error("Failed to activate MetaMask", error);
      if (error.code === 4902) {
        await addSepoliaNetwork();
        await connector.activate(); // Retry activation after adding the network
      } else {
        console.error("Failed to activate MetaMask", error);
      }
    }
  }, [connector]);

  const handleDeactivate = useCallback(() => {
    reset();
    connector.deactivate ? connector.deactivate() : connector.resetState();
  }, [connector, reset]);

  return useMemo(
    () => ({
      activate: handleActivate,
      isActive,
      deactivate: handleDeactivate,
      isMetaMask: !!window.ethereum?.isMetaMask,
    }),
    [handleActivate, isActive, handleDeactivate]
  );
};
