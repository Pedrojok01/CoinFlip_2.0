import { formatEther } from "@ethersproject/units";
import { faTrophy, faSadTear } from "@fortawesome/free-solid-svg-icons";

import { useEventCallback } from ".";
import { useAppContext } from "../AppContext";

export const useBetResult = (account) => {
  const { syncAll, getContractBalance, addNotification } = useAppContext();

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
};
