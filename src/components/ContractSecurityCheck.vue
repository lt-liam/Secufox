<template>
  <div class="header">
    <a-row>
      <a-col :span="12">
        <img class="logo" :src="SecuFox" />
      </a-col>
      <a-col :span="12" class="click">
        <a-button size="large" href="#/contract-code-audit" ghost>Contract Code Audit</a-button>
      </a-col>
    </a-row>
    <div class="retrieval">
      <a-row>
        <a-col :offset="5">
          <h2>Demo Experience</h2>
        </a-col>
      </a-row>
      <a-row>
        <a-col :offset="5">
          <h3>Fast token security detection service</h3>
        </a-col>
      </a-row>
      <a-row :style="{ marginTop: '35px' }" :gutter="16">
        <a-col :offset="5" :span="2">
          <a-select size="large" ghost ref="select" style="width: 100%" v-model:value="chain"
                    :options="chains"></a-select>
        </a-col>
        <a-col :span="9">
          <a-input size="large" ghost placeholder="Enter Token Address" v-model:value="address"  />
        </a-col>
        <a-col :span="3">
          <a-button :style="{ width: '100%' }" size="large" ghost @click="query" :loading="loading">Check</a-button>
        </a-col>
      </a-row>
    </div>
  </div>
  <a-row class="result">
    <a-col :span="12">
      <a-card style="width: 100%;" :loading="loading">
        <div class="title">Contract Security</div>
        <div v-for="result in resultList">
          <check-circle-outlined v-if="result.result" :style="{ fontSize: '16px', color: '#4FCA81' }" />
          <exclamation-circle-outlined v-else :style="{ fontSize: '16px', color: '#F5AF1C' }" />
          <span style="margin-left: 10px;">{{ result.label }}</span>

          <span style="text-align: right"> {{result.base_on}}</span>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>


<script setup>
import { ref } from 'vue'
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import axios from "axios";

const SecuFox = ref('src/assets/SecuFox.png')

const chains = ref([{
  value: 'bsc',
  label: 'BSC',
}, {
  value: 'eth',
  label: 'ETH',
}]);

let chain = ref('eth');
let address = ref('0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39')

const KEY_OPENSOURCE = 'opensource'
const KEY_PROXY = 'proxy'
const KEY_MINT = 'mint'
const KEY_TAKEOWNERSHIP = 'take_back_ownership'
const KEY_OWNER_CHANGE_BALANCE = 'owner_change_back'
const KEY_ADMIN_PRIVILEGES = 'admin_privileges'
const KEY_HIDDEN_OWNER = 'hidden_owner'
const KEY_SELF_DESTRUCT = 'self_destruct'
const KEY_EXTERNAL_CALL = 'external_call'
const KEY_SLIPPAGE_MODIFIED = 'slippage_modified'
const KEY_LP_LOCKED = 'lp_locked'

const resultList = ref([{
  result: false,
  key: KEY_OPENSOURCE,
  label: 'This token contract is open source.',
  base_on: []
},
{
  result: false,
  key: KEY_PROXY,
  label: 'There is no proxy in the contract.',
  base_on: []
},
{
  result: false,
  key: KEY_MINT,
  label: 'Mint function is transparent or non- existent.',
  base_on: []
},
{
  result: false,
  key: KEY_TAKEOWNERSHIP,
  label: 'Can not take back ownership.',
  base_on: []
},
{
  result: false,
  key: KEY_OWNER_CHANGE_BALANCE,
  label: "Owner can't change balance.",
  base_on: []
},
{
  result: false,
  key: KEY_ADMIN_PRIVILEGES,
  label: 'Has not dropped admin privileges.',
  base_on: []
},
{
  result: false,
  key: KEY_HIDDEN_OWNER,
  label: 'No hidden owner address was found for the token.',
  base_on: []
},
{
  result: false,
  key: KEY_SELF_DESTRUCT,
  label: 'This token can not self destruct.',
  base_on: []
}, {
  result: false,
  key: KEY_EXTERNAL_CALL,
  label: 'No external call risk found.',
  base_on: []
},
{
  result: false,
  key: KEY_SLIPPAGE_MODIFIED,
  label: 'Slippage cannot be modified.',
  base_on: []
}, {
  result: false,
  key: KEY_LP_LOCKED,
  label: 'LP is locked.',
  base_on: []
}])

const loading = ref(false)

const goPlus = 'goPlus'
const aveAi = 'aveAi'
const bitying = 'bitying'

const pushResult = (key, value, result) => {
  let index = resultList.value.findIndex(t => t.key === key)
  if(index >= 0) {
    if (resultList.value[index].base_on.findIndex(t => t === value) === -1 ){
      resultList.value[index].base_on.push(value)
      if (result !== undefined) {
        resultList.value[index].result = result
      }
    }
  }
}
const query = ()=> {

  loading.value = true
  Promise.all([queryGoPlusPromise(),queryAveAiPromise(),queryBityingPromise()]).then(result => {
    if(result[0] && result[0].status === 200){
      let goPlusResult = Object.values(result[0].data.result)[0]
      pushResult(KEY_OPENSOURCE,goPlus,goPlusResult.is_open_source === '1')
      pushResult(KEY_PROXY,goPlus,goPlusResult.is_proxy === '0')
      pushResult(KEY_MINT,goPlus,goPlusResult.is_mintable === '1')
      pushResult(KEY_TAKEOWNERSHIP,goPlus,goPlusResult.can_take_back_ownership === '0')
      pushResult(KEY_OWNER_CHANGE_BALANCE,goPlus,goPlusResult.owner_change_balance === '0')
      pushResult(KEY_ADMIN_PRIVILEGES,goPlus,goPlusResult.owner_address === '')
      pushResult(KEY_HIDDEN_OWNER,goPlus,goPlusResult.hidden_owner === '0')
      pushResult(KEY_SELF_DESTRUCT,goPlus,goPlusResult.selfdestruct === '0')
      pushResult(KEY_EXTERNAL_CALL,goPlus,goPlusResult.external_call === '0')
      pushResult(KEY_SLIPPAGE_MODIFIED,goPlus,goPlusResult.slippage_modifiable === '0')
      pushResult(KEY_LP_LOCKED,goPlus,goPlusResult.lp_holders.reduce((total, s) =>{
        return total && s.is_locked === 0
      }, true ))
    }

    if(result[1] && result[1].status === 200){
      let aveaiData = result[1].data.data.token_contract.contract_data

      pushResult(KEY_OPENSOURCE,aveAi,aveaiData.has_code === 1)
      pushResult(KEY_PROXY,aveAi,aveaiData.is_proxy === '0')
      pushResult(KEY_MINT,aveAi,aveaiData.has_mint_method === 1)
      pushResult(KEY_TAKEOWNERSHIP,aveAi,aveaiData.can_take_back_ownership === '0')
      pushResult(KEY_OWNER_CHANGE_BALANCE,aveAi,aveaiData.owner_change_balance === '0')
      pushResult(KEY_ADMIN_PRIVILEGES,aveAi,aveaiData.owner === '')
      pushResult(KEY_HIDDEN_OWNER,aveAi,aveaiData.hidden_owner === '0')
      pushResult(KEY_SELF_DESTRUCT,aveAi,aveaiData.selfdestruct === '0')
      pushResult(KEY_EXTERNAL_CALL,aveAi,aveaiData.external_call === '0')
      pushResult(KEY_SLIPPAGE_MODIFIED,aveAi,aveaiData.slippage_modifiable === 0)
      pushResult(KEY_LP_LOCKED,aveAi,aveaiData.pair_lock_percent === 0)
    }

    if(result[2] && result[2].status === 200) {
      let bityingData = result[2].data.data
      let remask = bityingData.remask
      remask.forEach(item => {
        if (item.content === '合约代码开源'){
          pushResult(KEY_OPENSOURCE,bitying,item.ispassed === 1)
        }
        if (item.content === '项目方没有过多特权'){
          pushResult(KEY_ADMIN_PRIVILEGES,bitying,item.ispassed === 1)
        }
        if (item.content === '不存在代币增发'){
          pushResult(KEY_MINT,bitying,item.ispassed === 1)
        }
        if (item.content === '不能更改滑点'){
          pushResult(KEY_SLIPPAGE_MODIFIED,bitying,item.ispassed === 1)
        }
      })
    }


  }).finally(() => {
    loading.value = false
  })
}

const networkIdMap = new Map()
networkIdMap['eth'] = 1
networkIdMap['bsc'] = 56

const queryGoPlusPromise = () => {
  let networkId = 1

  if(networkIdMap.has(chain.value)) {
    networkId = networkIdMap[chain.value]
  }
  return axios.get(`/goplus/api/v1/token_security/${networkId}?contract_addresses=${address.value}`)
}

const queryAveAiPromise = () => {
  return axios({
    url: `/aveai/v1api/v2/tokens/contract?token_id=${address.value}-${chain.value}&type=token&user_address=`,
    method: 'get',
    headers: {
      "x-auth": '6359bc6122e3930be34a36319ec159a41671001252326238764'
    }
  })
}

const queryBityingPromise = ()=> {
  return axios.post('/bitying/ceye/contract',
      {
        "uname":"biteagle",
        "chain":2,
        "address":"0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD",
        "time":new Date().getTime(),
        "sign":"fDaSGLxOsiG0lTbnVVicECexBeNMZFVtlChy+78Bb6gg+PSO3ZP5O9QkDtIkypxqQ4iXYOnNwuM4pL/juQqs8slMOID0SJZXkbZ60ZeJv2+4Y2bxM/BNxyRyltrNMnfokAe+cpliW4FWk49miapIvnRE8T9iclUgNQmRba+p9tt/505JyB8io6NfVDr/OnTc3wu5oa3GKyM/LxST+qFHP/wzphfORMdJ8fD4NdfM9dFwMQqyD5hkmXeGqiUjZ1E9Cngsm7bBPx1qBMcVS7HQEV9OPSJtsU1nil9w0lSb1t/tjsOQnY+Z4TycCLMZbluwhSAei6RjXf3fBSmrISpM6g=="
      }
  )
}

</script>

<style scoped lang="less">
.header {
  height: 350px;
  background: linear-gradient(89.97deg, #4C41F5 1.5%, #58AAF9 100%);
  padding: 24px 40px;

  .retrieval {
    margin-top: 60px;
  }
}

.logo {
  width: 185px;
  height: 42px;
}

h2 {
  font-weight: 700;
  font-size: 24px;
  line-height: 31px;
  color: #FFFFFF;
  margin-left: 1px;
}

h3 {
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #FFFFFF;
  margin-left: 2px;
}

.click {
  justify-content: right;
  display: flex;
}

.result {
  padding: 24px 53px;

  .title {
    font-weight: 700;
    font-size: 24px;
    line-height: 31px;
    margin-bottom: 30px;
  }
}
</style>
