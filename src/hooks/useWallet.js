import { useCallback, useEffect, useMemo } from "react";
import { SUPPORTED_CHAINS } from "../data/constants";
import { useWeb3React } from "@web3-react/core";

export const chains = {
  1: {
    name: "MainNet",
    etherScanPrefix: "",
  },
  11155111: {
    name: "Sepolia",
    etherScanPrefix: "sepolia.",
  },
};

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
  const { isActive, account, chainId, provider, connector } = useWeb3React();
  const isValidChain = useMemo(() => isValidChainId(chainId), [chainId]);

  console.log("chainId", chainId);

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
    connector.deactivate();
  }, [connector]);

  return useMemo(
    () => ({
      activate: handleActivate,
      isActive,
      deactivate: handleDeactivate,
      chainId,
      account,
      isMetaMask: !!window.ethereum?.isMetaMask,
      provider,
    }),
    [handleActivate, isActive, handleDeactivate, chainId, account, provider]
  );
};
