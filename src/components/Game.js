import React, { useState } from "react";
import styled from "@emotion/styled";
import Color from "color";
import { formatEther } from "@ethersproject/units";
import { faTrophy, faSadTear } from "@fortawesome/free-solid-svg-icons";

import { Button } from "./Button";
import { ConnectButton } from "./ConnectButton";
import { Eth } from "./Eth";
import { NumberInput } from "./NumberInput";
import { useWallet } from "../hooks/useWallet";
import { useAppContext } from "../AppContext";
import { useCoinFlipContract } from "../hooks/useContract";
import { useFunction } from "../hooks/useFunction";
import { useEventCallback } from "../hooks/useEventCallback";
import { ReactComponent as EthereumLogo } from "../ethereumLogo.svg";

const StyledCoin = styled.button`
  height: 7.1rem;
  width: 7.1rem;
  border-radius: 50%;
  border: 0;
  background-color: ${({ theme }) => theme.colors.complementary};
  color: white;
  font-size: 3.3rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: ${({ marginRight, theme }) => (marginRight ? `${theme.space.l}px` : undefined)};
  cursor: pointer;
  outline: 0;
  translate: transform 150ms ease-in-out, background-color 150ms ease-in-out;
  &:hover {
    transform: scale(1.1);
    background-color: ${({ theme }) => Color(theme.colors.complementary).darken(0.2).toString()};
  }
`;

const StyledCoinWrapper = styled.div`
  display: flex;
  margin-top: ${({ theme }) => `${theme.space.m}px`};
  margin-bottom: ${({ theme }) => `${theme.space.m}px`};
`;

const TailsCoin = ({ onClick }) => {
  return <StyledCoin onClick={onClick}>Ξ</StyledCoin>;
};

const HeadsCoin = ({ onClick }) => {
  return (
    <StyledCoin onClick={onClick} marginRight>
      <EthereumLogo />
    </StyledCoin>
  );
};

export const Game = () => {
  const { isActive, account } = useWallet();
  const { balance, profit, getContractBalance, syncAll, addNotification } = useAppContext();
  const contract = useCoinFlipContract();
  const [betAmount, setBet] = useState(0.01);
  const betChoice = 0;

  useEventCallback(
    "BetResult",
    (address, win, value) => {
      if (address === account) {
        syncAll();
        addNotification({
          title: win ? `You won ${formatEther(value)} ETH!` : `You lost ${formatEther(value)} ETH. Let's try again!`,
          icon: win ? faTrophy : faSadTear,
          isSuccess: win,
          isError: !win,
        });
      } else {
        getContractBalance();
      }
    },
    [account, addNotification, syncAll]
  );

  const doFlip = useFunction("bet", betAmount, [betChoice]);
  const collectFunds = useFunction("withdrawPlayerBalance");

  if (!isActive || !account) {
    return <ConnectButton block>Connect your wallet to start</ConnectButton>;
  }

  if (!contract) {
    return <p>Could not connect to the contract</p>;
  }

  return (
    <div>
      <h2>Hi, {account.substring(0, 5) + "..." + account.substring(account.length - 5)}</h2>
      <p>Ready to make some money? Enter the amount to bet and the coin side.</p>
      <p>Good luck!</p>
      <p
        style={{
          fontStyle: "italic",
          fontSize: "0.7em",
          opacity: 0.91,
        }}
      >
        Note: the result might take up to a few minutes. Just go grab a coffee and relax, you will get notified once the
        flip is over. In the meantime, you can play as many coins as you want!
      </p>
      <p>
        Account balance: <Eth>{balance}</Eth> <br />
        Your profit: <Eth>{profit}</Eth> {profit && profit !== "0.0" && <Button onClick={collectFunds}>Collect</Button>}
      </p>
      <NumberInput onChange={setBet} value={betAmount} />
      <p
        style={{
          marginTop: 2,
          fontStyle: "italic",
          fontSize: "0.7em",
          opacity: 0.91,
        }}
      >
        Minimum required bet: <Eth>0.001</Eth>
      </p>
      <StyledCoinWrapper>
        <HeadsCoin betChoice={0} onClick={doFlip} />
        <TailsCoin betChoice={1} onClick={doFlip} />
      </StyledCoinWrapper>
    </div>
  );
};
