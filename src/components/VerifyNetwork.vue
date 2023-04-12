<script setup>
import { useNetwork, useSwitchNetwork } from 'vagmi'

const chainTarget = {
  id: import.meta.env.VITE_CHAIN_ID,
  name: import.meta.env.VITE_CHAIN_NAME,
  idDecimal: import.meta.env.VITE_CHAIN_ID_DECIMAL
}
const { chain } = useNetwork();
const { switchNetwork }
  = useSwitchNetwork({
    chainId: chainTarget.id,
    throwForSwitchChainNotSupported: true,
    onError(error) {
      notiError(error.internal.message)
    }
  });
</script>

<template>
  <div>
    <template v-if="chainTarget.idDecimal == chain?.id">
      <slot />
    </template>
    <a-button v-else type="outline" size="large" class="mx-auto" @click="switchNetwork()">
      <template #icon>
        <icon-bulb />
      </template>
      Switch your network to {{ chainTarget.name }} to start!</a-button>
  </div>
</template>

<style scoped></style>