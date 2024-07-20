# Blockchain

## Configuration
- BLOCK_SUBSIDY: The initial block reward for miners.
- COINBASE_TX: Configuration for coinbase transactions.
- GENESIS_BLOCK_DATA: Data for initializing the genesis block.
- INITIAL_DIFFICULTY: The starting difficulty for mining.
- NUM_OF_BLOCKS_TO_HALF_MINING_REWARD: Number of blocks after which the mining reward is halved.
- TARGET_MINE_RATE_MS: Target mining rate in milliseconds.

## Classes and there methods
- Block: ```mineBlock, calculateHash, isValid, areBlocksValidlyConnected```
- Blockchain: ```addBlock, isValidChain, replaceChain, getLatestBlock, getBlockByHash, getBlockByHeight```
- CoinbaseTransaction: ```createCoinbaseTransaction, isValid```
- GenesisBlock: ```createGenesisBlock```
- Mempool: ```addTransaction, removeTransaction, getTransactions, clear```
- Transaction: ```isValid, signTransaction, update```
- Wallet: ```createTransaction, sign, calculateBalance, getPublicKey```

## Utils and types
- getSHA256Hash: calculate SHA256 hash.
- BlockType: Block type
- TransactionType: TX type