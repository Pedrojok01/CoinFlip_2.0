import React, { useRef, useEffect } from "react";
import styled from "@emotion/styled";
import Jazzicon from "jazzicon";

import { useWallet } from "../hooks/useWallet";

const StyledIdenticon = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 1.125rem;
  margin-right: 8px;
`;

export const Identicon = () => {
  const { account } = useWallet();
  const ref = useRef();

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(Jazzicon(16, parseInt(account.slice(2, 10), 16)));
    }
  }, [account]);

  return <StyledIdenticon ref={ref} />;
};
