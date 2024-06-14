import { useRef, useEffect, useCallback } from "react";

import styled from "@emotion/styled";
import { useWeb3React } from "@web3-react/core";
import Jazzicon from "jazzicon";

const StyledIdenticon = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 1.125rem;
  margin-right: 8px;
`;

export const Identicon = () => {
  const { account } = useWeb3React();
  const ref = useRef();

  const createJazzicon = useCallback(() => {
    if (account && ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(Jazzicon(16, parseInt(account.slice(2, 10), 16)));
    }
  }, [account]);

  useEffect(() => {
    createJazzicon();
  }, [createJazzicon]);

  return <StyledIdenticon ref={ref} />;
};
