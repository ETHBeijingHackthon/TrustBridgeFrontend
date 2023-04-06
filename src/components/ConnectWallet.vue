<script setup>
import { reactive } from 'vue'
import { useAccount, useConnect, useDisconnect } from 'vagmi'
import { InjectedConnector } from 'vagmi/connectors/injected'
import Wallet from '@/assets/images/icon/wallet.svg'
import Metamask from '@/assets/images/icon/metamask.svg'
import WalletConnect from '@/assets/images/icon/wallet-connect.svg'
import { formatAddress, getAvatar } from '@/utils/common'

const mapConnector = {
  metaMask: Metamask,
  walletConnect: WalletConnect
}

const ConnectWallet = reactive({
  visible: false
})

const { disconnect } = useDisconnect()

const { isConnected, address } = useAccount()

const { connect, connectors, pendingConnector, isLoading } = useConnect({
  connector: new InjectedConnector(),
})

const handleConnect = async (connector) => {
  await connect.value(connector)
  ConnectWallet.visible = false
}

const handleDisconnect = () => {
  disconnect()
}
</script>

<template>
  <a-button size="large" @click="ConnectWallet.visible = true" v-if="!address">
    <template #icon>
      <img :src="Wallet" alt="icon">
    </template>
    {{ address ? formatAddress(address) : 'Connect Wallet' }}
  </a-button>
  <a-popover position="br">
    <a-button size="large" v-if="address">{{ formatAddress(address) }}</a-button>
    <template #content>
      <div class="flex items-center mb-4">
        <a-avatar>
          <img :src="getAvatar(address)" :size="16" alt="avatar">
        </a-avatar>
        <div class="ml-4">{{ formatAddress(address) }}</div>
      </div>
      <a-button @click="handleDisconnect" long>Disconnect</a-button>
    </template>
  </a-popover>
  <a-modal :width="360" v-model:visible="ConnectWallet.visible" title="Connect Wallet" simple :footer="false">
    <ul>
      <li class="connector" v-for="connector in connectors" :key="connector.id" @click="handleConnect(connector)">
        <span>{{ connector.name }}{{ !connector.ready ? ' (unsupported)' : '' }} {{
          connector.id ===
          pendingConnector?.id && !isConnected
          ?
          ' (connecting)' : '' }}</span>
        <img :src="mapConnector[connector.id]" />
      </li>
    </ul>
  </a-modal>
</template>

<style lang="less" scoped>
.connector {
  @apply flex justify-between items-center px-4 py-4 mb-4 text-lg font-bold rounded-xl cursor-pointer;
  background-color: rgba(255, 255, 255, .1);

  &:nth-last-of-type(1) {
    margin-bottom: 0;
  }
}
</style>