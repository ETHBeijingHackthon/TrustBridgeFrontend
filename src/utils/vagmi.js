import { chain, configureChains, createClient } from 'vagmi'
import { publicProvider } from 'vagmi/providers/public'
import { MetaMaskConnector } from 'vagmi/connectors/metaMask'
import { WalletConnectConnector } from 'vagmi/connectors/walletConnect'

const fantom = {
  id: import.meta.env.VITE_CHAIN_ID,
  name: import.meta.env.VITE_CHAIN_NAME,
  network: 'fantom',
  nativeCurrency: {
    decimals: 18,
    name: import.meta.env.VITE_CHAIN_NAME,
    symbol: 'FTM',
  },
  rpcUrls: {
    default: import.meta.env.VITE_RPC_URLS,
  },
  blockExplorers: {
    default: {
      name: 'fantom',
      url: import.meta.env.VITE_BLOCK_EXPLORER_URLS,
    },
  },
  testnet: true,
}

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, fantom],
  [publicProvider()]
)
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
        projectId: import.meta.env.VITE_WALLETCONNECT_ID,
        rpc: {
          250: import.meta.env.VITE_RPC_URLS,
        },
      },
    }),
  ],
  provider,
  webSocketProvider,
})

export { client }
