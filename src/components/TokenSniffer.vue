<template>
  <a-card title="TokenSniffer" bordered>
    <a-row>
      <a-col span="8" style="text-align: right">
        <a-select  v-model:value="network"  style="width: 120px">
          <a-select-option value="56">BSC</a-select-option>
          <a-select-option value="1">Ethereum</a-select-option>
          <a-select-option value="128">HECO</a-select-option>
          <a-select-option value="137">Polygon</a-select-option>
          <a-select-option value="42161">Arbitrum</a-select-option>
          <a-select-option value="10">Optimism</a-select-option>
          <a-select-option value="43114">Avalanche</a-select-option>
          <a-select-option value="250">Fantom</a-select-option>
          <a-select-option value="66">OKC</a-select-option>
          <a-select-option value="25">Cronos</a-select-option>
          <a-select-option value="321">KCC</a-select-option>
          <a-select-option value="100">Gnosis</a-select-option>
          <a-select-option value="tron">Tron</a-select-option>
        </a-select>
      </a-col>
      <a-col span="5">
        <a-input v-model:value="address"  style="width: 240px"></a-input>
      </a-col>
      <a-col>
        <a-button type="primary" @click="query" :loading="loading">query</a-button>
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <a-descriptions>
          <a-descriptions-item label="Token is sellable"></a-descriptions-item>
        </a-descriptions>
      </a-col>
    </a-row>

  </a-card>
</template>

<script setup>

import {ref} from "vue";
import axios from "axios";

const network = ref('56')
const address = ref('0x111111111117dC0aa78b770fA6A738034120C302')
const loading = ref(false)
const issueNum = ref('')
const risk = ref({})

const query = () => {
  loading.value = true
  axios({
    url: `/tokensniffer/api/internal?type=reports&network=ETH&addr=0x111111111117dc0aa78b770fa6a738034120c302&hmac=e9ccbb3c7a8c204404b9ceb99278c432f104e094c6955934e50c4ff4a4a1a00dcc1a0af934f66c61d7cf9f5a98024377`,
    method: 'get',
  }).then(data => {
    console.log(data)
  }).catch(err => {

  }).finally(()=> {
    loading.value = false
  })
}


</script>

<style scoped>

</style>
