import { COINBASE_TX } from "./config";
import Transaction from "./Transaction";

class CoinbaseTransaction extends Transaction {
  constructor(miningRewardAddress: string, miningReward: number) {
    super(
      COINBASE_TX.fromAddress,
      miningRewardAddress,
      miningReward,
      COINBASE_TX.memo
    );
    this.__type = "CoinbaseTransaction";
    this.signTransaction(COINBASE_TX.secretKey);
  }

  isValid(): boolean {
    const { fromAddress, memo } = COINBASE_TX;
    return (
      this.fromAddress === fromAddress &&
      this.memo === memo &&
      this.amount > 0 &&
      this.hasValidSignature()
    );
  }
}

export default CoinbaseTransaction;
