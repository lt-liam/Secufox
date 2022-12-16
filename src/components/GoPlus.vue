<template>
  <div>
      <a-card title="go-plus">
        <a-row>
          <a-col>
            <a-descriptions title="issue" bordered >
              <a-descriptions-item label="number of issue">{{ issueNum }}</a-descriptions-item>
              <a-descriptions-item label="可信任的代币">{{risk.trust_list}}</a-descriptions-item>
              <a-descriptions-item label="合约已开源">{{ risk.is_open_source}}</a-descriptions-item>
              <a-descriptions-item label="无代理合约">{{ risk.is_proxy }}</a-descriptions-item>
              <a-descriptions-item label="未发现可取回所有权">{{ risk.can_take_back_ownership }}</a-descriptions-item>
              <a-descriptions-item label="未发现Owner可改余额"> {{ risk.owner_change_balance }} </a-descriptions-item>
              <a-descriptions-item label="未发现隐藏的owner"> {{ risk.hidden_owner }} </a-descriptions-item>
              <a-descriptions-item label="该代币不能自毁"> {{ risk.selfdestruct}} </a-descriptions-item>
              <a-descriptions-item label="未发现外部合约调用风险">{{ risk.external_call }}</a-descriptions-item>
              <a-descriptions-item label="可能不是貔貅代币">{{ risk.is_honeypot }}</a-descriptions-item>
              <a-descriptions-item label="无暂停交易功能"> {{ risk.transfer_pausable }}</a-descriptions-item>
              <a-descriptions-item label="代币可全部卖出"> {{ risk.cannot_sell_all }} </a-descriptions-item>
              <a-descriptions-item label="可以买入">{{ risk.cannot_buy }}</a-descriptions-item>
              <a-descriptions-item label="无交易冷却功能">{{ risk.trading_cooldown }}</a-descriptions-item>
              <a-descriptions-item label="交易数量不限"> {{ risk.is_anti_whale }}</a-descriptions-item>
              <a-descriptions-item label="交易税不可改"> {{ risk.slippage_modifiable }}</a-descriptions-item>
              <a-descriptions-item label="不包含黑名单机制">{{ risk.is_blacklisted}}</a-descriptions-item>
              <a-descriptions-item label="不包含白名单机制"> {{ risk.is_whitelisted }}</a-descriptions-item>
              <a-descriptions-item label="未发现可针对特定地址改税">{{ risk.personal_slippage_modifiable }}</a-descriptions-item>

            </a-descriptions>
          </a-col>
        </a-row>
      </a-card>
  </div>
</template>

<script setup lang="ts">
import {defineComponent, onMounted, toRefs, ref, defineProps, computed} from 'vue'
import axios from 'axios'

const props = defineProps({
  network:String,
  address:String
})
const loading = ref(false)
const issueNum = ref('')
const risk = ref({})

//    <a-select-option value="56">BSC</a-select-option>
//    <a-select-option value="1">Ethereum</a-select-option>

const networkVal = computed(()=> {
  if (props.network.value === 'bsc'){
    return 56
  }else if (props.network.value === 'eth'){
    return 1
  }else {
    return 1
  }
})

const query = () => {
  loading.value = true
  console.log(props.address.value)
  axios.get(`/goplus/api/v1/token_security/${networkVal.value}?contract_addresses=${props.address}`).then(data => {
    // risk.value = data.data.result[`${address.value}`]
    risk.value = Object.values(data.data.result)[0]
  }).catch(err => {

  }).finally(()=> {
    loading.value = false
  })

  loading.value = false
}

const foo = () =>{
  console.log("foo")
  console.log(props.address)
  axios.post('/bitying/ceye/contract',
      {
        "uname":"biteagle",
        "chain":2,
        "address":"0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD",
        "time":new Date().getTime(),
        "sign":"fDaSGLxOsiG0lTbnVVicECexBeNMZFVtlChy+78Bb6gg+PSO3ZP5O9QkDtIkypxqQ4iXYOnNwuM4pL/juQqs8slMOID0SJZXkbZ60ZeJv2+4Y2bxM/BNxyRyltrNMnfokAe+cpliW4FWk49miapIvnRE8T9iclUgNQmRba+p9tt/505JyB8io6NfVDr/OnTc3wu5oa3GKyM/LxST+qFHP/wzphfORMdJ8fD4NdfM9dFwMQqyD5hkmXeGqiUjZ1E9Cngsm7bBPx1qBMcVS7HQEV9OPSJtsU1nil9w0lSb1t/tjsOQnY+Z4TycCLMZbluwhSAei6RjXf3fBSmrISpM6g=="
      }
  ).then(res => {
    console.log(res.data)
  })
}

onMounted(() => {
  console.log('onMounted')
})

defineExpose({
  foo,
  query
});
</script>

<style scoped>

</style>
