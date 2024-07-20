# Blockchain

This module provides a collection of classes and constants for implementing a blockchain system. It includes functionalities for handling blocks, transactions, wallets, and more. Below is an overview of the provided classes, constants, and their usage.

## Classes

### Block
Represents a block in the blockchain.

#### Methods:
- `constructor(transactions, difficulty, previousHash, height)`
- `mineBlock()`
- `calculateHash()`
- `isValid()`
- `static areBlocksValidlyConnected(block1, block2)`

### Blockchain
Represents the entire blockchain.

#### Methods:
- Various methods to manage the blockchain such as adding blocks, validating the chain, etc.

### CoinbaseTransaction
Represents a special transaction that creates new coins.

#### Methods:
- `constructor()`
- Specific methods to handle coinbase transactions.

### GenesisBlock
Represents the first block in the blockchain.

#### Methods:
- `constructor()`
- Specific methods for the genesis block.

### Mempool
Represents the memory pool where pending transactions are stored before being included in a block.

#### Methods:
- Various methods to manage the mempool.

### Transaction
Represents a regular transaction in the blockchain.

#### Methods:
- `constructor()`
- `isValid()`
- Various methods to handle transactions.

### Wallet
Represents a wallet that holds and manages keys for transactions.

#### Methods:
- Various methods to manage wallet operations.

## Constants

### Configuration Constants
- `BLOCK_SUBSIDY`: The initial block reward for miners.
- `COINBASE_TX`: Configuration for coinbase transactions.
- `GENESIS_BLOCK_DATA`: Data for initializing the genesis block.
- `INITIAL_DIFFICULTY`: The starting difficulty for mining.
- `NUM_OF_BLOCKS_TO_HALF_MINING_REWARD`: Number of blocks after which the mining reward is halved.
- `TARGET_MINE_RATE_MS`: Target mining rate in milliseconds.

## Utility Functions

### getSHA256Hash
A utility function to calculate SHA256 hash.

#### Methods:
- `getSHA256Hash(...args)`

## Types

### BlockType
Type definition for a block.

### TransactionType
Type definition for a transaction.

## Usage

```javascript
import Block from "../shared/Block";
import Blockchain from "../shared/Blockchain";
import CoinbaseTransaction from "../shared/CoinbaseTransaction";
import GenesisBlock from "../shared/GenesisBlock";
import Mempool from "../shared/Mempool";
import Transaction from "../shared/Transaction";
import getSHA256Hash from "../shared/cryptoHash";
import Wallet from "../shared/Wallet";
import { 
    BLOCK_SUBSIDY, 
    COINBASE_TX, 
    GENESIS_BLOCK_DATA, 
    INITIAL_DIFFICULTY, 
    NUM_OF_BLOCKS_TO_HALF_MINING_REWARD, 
    TARGET_MINE_RATE_MS
} from "../shared/config"; 
import { BlockType, TransactionType } from "../shared/types";

// Example of creating a new block
const transactions = [new Transaction(...), new CoinbaseTransaction(...)];
const block = new Block(transactions, INITIAL_DIFFICULTY, previousHash, height);
block.mineBlock();

// Example of creating a new blockchain
const blockchain = new Blockchain();
blockchain.addBlock(block);

// Example of creating a wallet
const wallet = new Wallet();
const transaction = wallet.createTransaction(recipientAddress, amount);

// Example of using the mempool
const mempool = new Mempool();
mempool.addTransaction(transaction);

export {
    Block,
    Blockchain,
    CoinbaseTransaction,
    GenesisBlock,
    Mempool,
    Transaction,
    Wallet,
    BLOCK_SUBSIDY,
    COINBASE_TX,
    GENESIS_BLOCK_DATA,
    INITIAL_DIFFICULTY,
    NUM_OF_BLOCKS_TO_HALF_MINING_REWARD,
    TARGET_MINE_RATE_MS,
    getSHA256Hash
}

export type {
    BlockType,
    TransactionType
}
```

This README provides an overview of the functionalities included in the module and examples of how to use the various classes and constants.