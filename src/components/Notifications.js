import styled from "@emotion/styled";

import { useAppContext } from "../AppContext";
import { Notification } from "./Notification";
import { Transaction } from "./Transaction";

const StyledNotificationsWrapper = styled.div`
  z-index: 100;
  position: fixed;
  bottom: ${({ theme }) => theme.space.m}px;
  left: ${({ theme }) => theme.space.m}px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  pointer-events: none;
`;

export const Notifications = () => {
  const { notifications, transactions } = useAppContext();

  const messages = [...transactions, ...notifications].sort((a, b) => b.onCreatedTimeStamp - a.onCreatedTimeStamp);

  return (
    <StyledNotificationsWrapper>
      {messages.map((data) =>
        data.type === "transaction" ? (
          <Transaction key={data.id} {...data} />
        ) : (
          <Notification key={data.id} hideIn={10000} {...data} />
        )
      )}
    </StyledNotificationsWrapper>
  );
};
