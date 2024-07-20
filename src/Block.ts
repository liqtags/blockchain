import hexToBinary from "hex-to-binary";
import Transaction from "./Transaction";
import CoinbaseTransaction from "./CoinbaseTransaction";
import getSHA256Hash from "./cryptoHash";
import { TARGET_MINE_RATE_MS } from "./config";

class Block {
  transactions: Transaction[];
  previousHash: string | null;
  height: number;
  difficulty: number;
  nonce: number;
  timestamp: number;
  miningDurationMs!: number;
  hash!: string;
  __type: "default" | "GenesisBlock";

  constructor(
    transactions: Transaction[],
    difficulty: number,
    previousHash: string | null = "",
    height: number
  ) {
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.height = height;
    this.difficulty = difficulty;
    this.nonce = 0;
    this.timestamp = Date.now();
    this.__type = "default";
  }

  mineBlock(): number {
    const startOfMining = Date.now();
    this.hash = this.getProofOfWorkHash();
    const endOfMining = Date.now();
    this.miningDurationMs = endOfMining - startOfMining;
    return this.miningDurationMs;
  }

  getProofOfWorkHash(): string {
    let hash = "";
    const proofOfWorkReq = "0".repeat(this.difficulty);
    while (hexToBinary(hash).substring(0, this.difficulty) !== proofOfWorkReq) {
      this.nonce++;
      hash = this.calculateHash();
    }
    return hash;
  }

  calculateHash(): string {
    return getSHA256Hash(
      this.timestamp,
      this.transactions,
      this.previousHash,
      this.height,
      this.difficulty,
      this.nonce
    );
  }

  isValid(): boolean {
    return (
      this.hasValidTransactions() &&
      this.hasOnlyOneCoinbaseTx() &&
      this.timestampIsInPast() &&
      this.hasProofOfWork()
    );
  }

  //Helper methods for isValid
  hasValidTransactions(): boolean {
    return this.transactions.every((transaction) => transaction.isValid());
  }

  hasOnlyOneCoinbaseTx(): boolean {
    const count = this.transactions.filter(
      (transaction) => transaction instanceof CoinbaseTransaction
    ).length;
    return count === 1;
  }

  timestampIsInPast(): boolean {
    if (!this.timestamp) return false;
    return this.timestamp < Date.now() + 1000 * 5;
  }

  hasProofOfWork(): boolean {
    return this.hasValidHash() && this.firstDCharsAreZero();
  }

  hasValidHash(): boolean {
    return this.hash === this.calculateHash();
  }

  firstDCharsAreZero(): boolean {
    const proofOfWorkReq = "0".repeat(this.difficulty);
    return (
      hexToBinary(this.hash).substring(0, this.difficulty) === proofOfWorkReq
    );
  }

  static areBlocksValidlyConnected(block1: Block, block2: Block): boolean {
    return (
      this.blocksHashesAreConnected(block1, block2) &&
      this.block2ComesAfterBlock1(block1, block2) &&
      this.difficultyJumpIsValid(block1, block2) &&
      this.block1HasPlausibleMiningDuration(block1, block2)
    );
  }

  static blocksHashesAreConnected(block1: Block, block2: Block): boolean {
    return block2.previousHash === block1.hash;
  }

  static block2ComesAfterBlock1(block1: Block, block2: Block): boolean {
    const timestampDifference = block2.timestamp - block1.timestamp;
    const timeCushion = -1000 * 60 * 10;
    return timestampDifference > timeCushion;
  }

  static difficultyJumpIsValid(block1: Block, block2: Block): boolean {
    const difficultyJump = block2.difficulty - block1.difficulty;
    if (difficultyJump < -1) {
      return false;
    }
    if (block1.miningDurationMs < TARGET_MINE_RATE_MS) {
      return block2.difficulty >= block1.difficulty + 1;
    }
    return true;
  }

  static block1HasPlausibleMiningDuration(
    block1: Block,
    block2: Block
  ): boolean {
    const timeCushionMs = 1000 * 60 * 2;
    const timeBetweenBlocks = block2.timestamp - block1.timestamp;
    return block1.miningDurationMs < timeBetweenBlocks + timeCushionMs;
  }
}

export default Block;