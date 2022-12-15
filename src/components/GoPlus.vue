<template>
  <div>
      <a-card title="go-plus">
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
            <a-descriptions title="issue" bordered >
              <a-descriptions-item label="number of issue">{{ issueNum }}</a-descriptions-item>
            </a-descriptions>
          </a-col>
        </a-row>
      </a-card>
  </div>
</template>

<script setup lang="ts">
import {defineComponent, onMounted, ref} from 'vue'
import axios from 'axios'

const network = ref('56')
const address = ref('0x111111111117dC0aa78b770fA6A738034120C302')
const loading = ref(false)
const issueNum = ref('')

const query = () => {
  loading.value = true
  axios.get(`/goplus/api/v1/token_security/${network.value}?contract_addresses=${address.value}`).then(data => {
    console.log(data)
  }).catch(err => {

  }).finally(()=> {
    loading.value = false
  })
}

onMounted(() => {
  console.log('onMounted')
})

</script>

<style scoped>

</style>
