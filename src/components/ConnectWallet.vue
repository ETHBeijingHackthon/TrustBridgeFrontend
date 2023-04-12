<script setup>
import { reactive } from 'vue'
import { Message, Notification } from '@arco-design/web-vue'
import { useAccount, useConnect, useDisconnect } from 'vagmi'
import { useClipboard } from '@vueuse/core'
import Wallet from '@/assets/images/icon/wallet.svg'
import Metamask from '@/assets/images/icon/metamask.svg'
import WalletConnect from '@/assets/images/icon/wallet-connect.svg'
import { formatAddress, getAvatar } from '@/utils/common'

const mapConnector = {
  metaMask: Metamask,
  walletConnect: WalletConnect
}

const { copy, isSupported } = useClipboard()
const { disconnect } = useDisconnect()
const { address, status } = useAccount()
const { connect, connectors, pendingConnector } = useConnect({
  onConnect: () => {
    ConnectWallet.visible = false
  }
})

const ConnectWallet = reactive({
  visible: false,
  disConcVisible: false,
  handleCopyAddress() {
    if (isSupported.value) {
      if (address.value) {
        copy(address.value)
          .then(() => {
            Message.success('Copied!')
          })
          .catch(() => {
            Notification.error('Copy failed!')
          })
      } else {
        Notification.error('Please connect wallet.')
      }
    } else {
      Notification.error('Your browser does not support Clipboard API')
    }
  }
})

const handleDisconnect = () => {
  ConnectWallet.disConcVisible = false
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
  <a-popover position="br" trigger="click" :popup-visible="ConnectWallet.disConcVisible">
    <a-button size="large" v-if="address" @click="ConnectWallet.disConcVisible = !ConnectWallet.disConcVisible">{{
      formatAddress(address)
    }}</a-button>
    <template #content>
      <div class="flex items-center mb-4">
        <a-avatar>
          <img :src="getAvatar(address)" :size="16" alt="avatar">
        </a-avatar>
        <div class="ml-2 mr-1">{{ formatAddress(address) }}</div>
        <icon-copy @click="ConnectWallet.handleCopyAddress" />
      </div>
      <a-button @click="handleDisconnect" long>Disconnect</a-button>
    </template>
  </a-popover>
  <a-modal :width="360" v-model:visible="ConnectWallet.visible" title="Connect Wallet" simple :footer="false">
    <ul>
      <li class="connector" v-for="connector in connectors" :key="connector.id" @click="connect(connector)">
        <span>{{ connector.name }}{{ !connector.ready ? ' (unsupported)' : '' }} {{
          connector.id ===
          pendingConnector?.id && ['connecting', 'reconnecting'].indexOf(status) > -1
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