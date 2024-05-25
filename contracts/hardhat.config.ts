import '@nomicfoundation/hardhat-toolbox';

require('dotenv').config();

const zora = process.env.ZORA_API_KEY as string;

const config = {
  solidity: {
    version: '0.8.24',
  },
  networks: {
    'zora-goerli': {
      chainId: 999999999,
      url: 'https://sepolia.rpc.zora.energy',
      accounts: [process.env.WALLET_KEY as string],
    },
    'zora-mainnet': {
      chainId: 7777777,
      url: 'https://rpc.zora.energy',
      accounts: [process.env.WALLET_KEY as string],
    },
  },
  etherscan: {
    apiKey: {
      zora,
    },
    customChains: [
      {
        network: 'zora',
        chainId: 7777777,
        urls: {
          apiURL: 'https://explorer.zora.energy/api',
          browserURL: 'https://explorer.zora.energy/',
        },
      },
    ],
  },
};

export default config;
