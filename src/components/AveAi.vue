<template>
  <div>
      <a-card :title="name">
        <a-row>
          <a-col span="8" style="text-align: right">
            <a-select  v-model:value="network"  style="width: 120px">
              <a-select-option value="56">BSC</a-select-option>
              <a-select-option value="eth">Ethereum</a-select-option>
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
            <a-descriptions :title="name" bordered >
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

const name = ref('ave.ai')
const network = ref('eth')
const address = ref('0x111111111117dC0aa78b770fA6A738034120C302')
const loading = ref(false)
const issueNum = ref('')

const query = () => {
  loading.value = true
  axios({
    url: `/aveai/v1api/v2/tokens/contract?token_id=${address.value}-${network.value}&type=token&user_address=`,
    method: 'get',
    headers: {
      "x-auth": '6359bc6122e3930be34a36319ec159a41671001252326238764'
    }
  }).then((data)=> {
    console.log(data)
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
