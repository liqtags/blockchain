declare class Transaction {
    fromAddress: string;
    toAddress: string;
    amount: number;
    memo: string;
    fee: number;
    uuid: string;
    timestamp: number;
    signature: string | undefined;
    __type: 'default' | 'CoinbaseTransaction';
    constructor(fromAddress: string, toAddress: string, amount: number, memo: string, fee?: number);
    calculateHash(): string;
    signTransaction(secretKey: string): void;
    hasValidSignature(): boolean;
    hasRequiredFields(): boolean;
    isValid(): boolean;
}

declare class Block {
    transactions: Transaction[];
    previousHash: string | null;
    height: number;
    difficulty: number;
    nonce: number;
    timestamp: number;
    miningDurationMs: number;
    hash: string;
    __type: "default" | "GenesisBlock";
    constructor(transactions: Transaction[], difficulty: number, previousHash: string | null, height: number);
    mineBlock(): number;
    getProofOfWorkHash(): string;
    calculateHash(): string;
    isValid(): boolean;
    hasValidTransactions(): boolean;
    hasOnlyOneCoinbaseTx(): boolean;
    timestampIsInPast(): boolean;
    hasProofOfWork(): boolean;
    hasValidHash(): boolean;
    firstDCharsAreZero(): boolean;
    static areBlocksValidlyConnected(block1: Block, block2: Block): boolean;
    static blocksHashesAreConnected(block1: Block, block2: Block): boolean;
    static block2ComesAfterBlock1(block1: Block, block2: Block): boolean;
    static difficultyJumpIsValid(block1: Block, block2: Block): boolean;
    static block1HasPlausibleMiningDuration(block1: Block, block2: Block): boolean;
}

declare class Blockchain {
    chain: Block[];
    constructor();
    getLatestBlock(): Block;
    addBlockToChain(block: Block): Block[];
    isChainValid(): boolean;
    replaceChain(newBlockchain: Blockchain): boolean;
}

declare class CoinbaseTransaction extends Transaction {
    constructor(miningRewardAddress: string, miningReward: number);
    isValid(): boolean;
}

declare class GenesisBlock extends Block {
    constructor();
    isValid(): boolean;
}

declare class Mempool {
    pendingTransactions: Transaction[];
    blockchain: Blockchain;
    constructor(blockchain: Blockchain);
    getCurrentBlockSubsidy(): number;
    addTransaction(transaction: Transaction): void;
    addCoinbaseTxToMempool(miningRewardAddress: string): Transaction[];
    getTotalTransactionFees(): number;
    getMiningReward(): number;
    addPendingTransactionsToBlock(): Block;
    getNewMiningDifficulty(): number;
    minePendingTransactions(miningRewardAddress: string): Block;
    resetMempool(): void;
}

declare const getSHA256Hash: (...inputs: any[]) => string;

interface BlockType {
    timestamp: number;
    hash: string | undefined;
    height: number;
    nonce: number;
    miningDurationMs: number;
    previousHash: string | null;
    transactions: TransactionType[];
    difficulty: number;
}
interface TransactionType {
    fromAddress: string;
    toAddress: string;
    amount: number;
    memo: string;
    fee: number;
    uuid: string;
    timestamp: number;
}

declare class Wallet {
    publicKey: string;
    privateKey: string;
    constructor();
    getPublicKey(): string;
    getPrivateKey(): string;
    static getTotalPendingOwedByWallet(publicKey: string, pendingTransactions: TransactionType[]): number;
    static walletHasSufficientFunds(publicKey: string, transaction: TransactionType, chain: BlockType[], pendingTransactions: TransactionType[]): boolean;
    static getAllTransactionsForWallet(publicKey: string, chain: BlockType[]): TransactionType[];
    static getBalanceOfAddress(publicKey: string, chain: BlockType[]): number | null;
}

declare const TARGET_MINE_RATE_MS: number;
declare const INITIAL_DIFFICULTY: number;
declare const BLOCK_SUBSIDY: number;
declare const NUM_OF_BLOCKS_TO_HALF_MINING_REWARD: number;
declare const GENESIS_BLOCK_DATA: {
    timestamp: number;
    previousHash: any;
    difficulty: number;
    nonce: number;
    height: number;
    transactions: any[];
};
declare const COINBASE_TX: {
    fromAddress: string;
    secretKey: string;
    memo: string;
};

export { BLOCK_SUBSIDY, Block, type BlockType, Blockchain, COINBASE_TX, CoinbaseTransaction, GENESIS_BLOCK_DATA, GenesisBlock, INITIAL_DIFFICULTY, Mempool, NUM_OF_BLOCKS_TO_HALF_MINING_REWARD, TARGET_MINE_RATE_MS, Transaction, type TransactionType, Wallet, getSHA256Hash };
