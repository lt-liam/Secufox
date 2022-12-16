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

        <a-row>
          <a-col>
            <a-descriptions title="风险" bordered >
              <a-descriptions-item label="风险评估"> {{ risk.risk_score }} </a-descriptions-item>
              <a-descriptions-item label="合约包含外部方法，可能被用于貔貅合约"> {{ risk.external_call }} </a-descriptions-item>
              <a-descriptions-item label="可增发，存在恶意发行砸盘的可能"> {{risk.has_mint_method }} </a-descriptions-item>
              <a-descriptions-item label="交易可暂停"> {{ risk.transfer_pausable}} </a-descriptions-item>
              <a-descriptions-item label="看起来不像貔貅">{{ risk.is_honeypot }}</a-descriptions-item>
              <a-descriptions-item label="合约已开源"> {{ risk.source_code? '开源': '未开源' }} </a-descriptions-item>
              <a-descriptions-item label="所有者不能篡改余额">{{ risk.owner_change_balance }}</a-descriptions-item>
              <a-descriptions-item label="看起来不像代理合约">{{ risk.is_proxy }}</a-descriptions-item>
              <a-descriptions-item label="滑点费率不可修改"> {{risk.slippage_modifiable}} </a-descriptions-item>
              <a-descriptions-item label="不存在白名单">{{ risk.has_white_method }}</a-descriptions-item>
              <a-descriptions-item label="不存在黑名单">{{ risk.has_black_method }}</a-descriptions-item>
              <a-descriptions-item label="已抛弃管理员权限">{{ risk.owner === '0x0000000000000000000000000000000000000000' }}</a-descriptions-item>
              <a-descriptions-item label="池子已加锁">{{ risk.has_lock_method }}</a-descriptions-item>
              <a-descriptions-item label="不能找回管理员权限">{{ risk.can_take_back_ownership }}</a-descriptions-item>
              <a-descriptions-item label="无交易冷却机制">{{ risk.trading_cooldown }}</a-descriptions-item>
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
const risk = ref({})

const query = () => {
  loading.value = true
  axios({
    url: `/aveai/v1api/v2/tokens/contract?token_id=${address.value}-${network.value}&type=token&user_address=`,
    method: 'get',
    headers: {
      "x-auth": '6359bc6122e3930be34a36319ec159a41671001252326238764'
    }
  }).then((data)=> {
    risk.value = data.data.data.token_contract.contract_data
    console.log(risk.value)
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
