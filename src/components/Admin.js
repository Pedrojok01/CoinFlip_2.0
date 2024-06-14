import { Button } from "./Button";
import { Card } from "./Card";
import { Eth } from "./Eth";
import { NumberInput } from "./NumberInput";
import { useAppContext } from "../AppContext";
import { useAdmin } from "../hooks";

export const Admin = () => {
  const { contractBalance } = useAppContext();
  const { deposit, setDeposit, doDeposit, doWithdrawAll, isOwner } = useAdmin();

  if (!isOwner || !contractBalance) {
    return null;
  }

  return (
    <Card>
      <h2>Hi Boss!</h2>
      <p style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <span>
          Game balance: <Eth>{contractBalance}</Eth> <Button onClick={doWithdrawAll}>Withdraw all</Button>
        </span>

        <span>
          Deposit: <NumberInput onChange={setDeposit} value={deposit} /> <Button onClick={doDeposit}>Confirm</Button>
        </span>
      </p>
    </Card>
  );
};
