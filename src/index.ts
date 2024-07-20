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