<template>
  <div class="header">
    <a-row>
      <a-col :span="12">
        <img class="logo" :src="SecuFox" />
      </a-col>
      <a-col :span="12" class="content-right">
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
          <h3>Fast and aggregated contract security check service</h3>
        </a-col>
      </a-row>
      <a-row :style="{ marginTop: '35px' }" :gutter="16">
        <a-col :offset="5" :span="2">
          <a-select size="large" ghost ref="select" style="width: 100%" v-model:value="chain"
            :options="chains"></a-select>
        </a-col>
        <a-col :span="9">
          <a-input size="large" ghost placeholder="Enter Token Address" v-model:value="address" />
        </a-col>
        <a-col :span="3">
          <a-button :style="{ width: '100%' }" size="large" ghost @click="query" :loading="loading">Check</a-button>
        </a-col>
      </a-row>
      <a-row :style="{ marginTop: '15px' }">
        <a-col :offset="5" :span="11">
          <h3>{{ WarnNote }}</h3>
        </a-col>
      </a-row>
    </div>
  </div>
  <a-row class="result">
    <a-col :span="16">
      <a-card style="width: 100%;" :loading="loading">
        <div class="title">Contract Security</div>
        <div v-for="result in securitys">
          <a-row>
            <a-col :span="20" style="line-height: 32px;">
              <check-circle-outlined v-if="result.result" :style="{ fontSize: '16px', color: '#4FCA81' }" />
              <exclamation-circle-outlined v-else :style="{ fontSize: '16px', color: '#F5AF1C' }" />
              <span style="margin-left: 10px;">{{ result.label }}</span>
            </a-col>
            <a-col :span="4" class="content-right"><img v-for="base_on in result.base_on" :src="base_on" /></a-col>
          </a-row>
        </div>
      </a-card>
      <a-card style="width: 100%;" :style="{ marginTop: '24px' }" :loading="loading">
        <div class="title">Honeypot Risk</div>
        <div v-for="result in securitys">
          <a-row>
            <a-col :span="20" style="line-height: 32px;">
              <check-circle-outlined v-if="result.result" :style="{ fontSize: '16px', color: '#4FCA81' }" />
              <exclamation-circle-outlined v-else :style="{ fontSize: '16px', color: '#F5AF1C' }" />
              <span style="margin-left: 10px;">{{ result.label }}</span>
            </a-col>
            <a-col :span="4" class="content-right"><img v-for="base_on in result.base_on" :src="base_on" /></a-col>
          </a-row>
        </div>
      </a-card>
    </a-col>
    <a-col :span="8">
      <div>
        <div class="title">Check Result</div>
      </div>
      <div>
        <div class="title">Basic Info</div>
      </div>
      <div>
        <div class="title">Trade & Liquidity</div>
      </div>
      <div>
        <div class="title">More results please refer:</div>
      </div>
    </a-col>
  </a-row>

  <a-row class="result">
    <a-col :span="12">
      <a-card style="width: 100%;" :loading="loading">
        <div class="title">Honeypot Risk</div>
        <div v-for="result in honkebyList">
          <check-circle-outlined v-if="result.result" :style="{ fontSize: '16px', color: '#4FCA81' }" />
          <exclamation-circle-outlined v-else :style="{ fontSize: '16px', color: '#F5AF1C' }" />
          <span style="margin-left: 10px;">{{ result.label }}</span>

          <span style="text-align: right"> {{result.base_on}}</span>
        </div>
      </a-card>
    </a-col>


  </a-row>
  <a-row>
    <a-col>
      <a-descriptions bordered title="BasicInfo">
        <a-descriptions-item label="Token Name">
          {{ toPercentage(basicInfo.top10_token_holders_ratio)}}
        </a-descriptions-item>
      </a-descriptions>
    </a-col>
  </a-row>
</template>


<script setup>
import { ref } from 'vue'
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import axios from "axios";

const SecuFox = ref('src/assets/SecuFox.png');

const WarnNote = ref('Note: Results provided by third parties, we try detect all contract risks, ' +
  'but cannot guarantee 100% identification of all risks. ' +
  'It is recommended to use the detection results as a reference.');

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
// 合约安全数据
const KEY_HONEYPOT = 'honeypot'
const KEY_TRANSFER_PAUSE = 'transfer_pause'
const KEY_CAN_SELL = 'can_sell'
const KEY_CAN_BUY = 'can_buy'
const KEY_TRADING_COOLDOWN = 'trading_cooldown'
const KEY_WHITELIST = 'whitelist'
const KEY_BLACKLIST = 'blacklist'
const KEY_PERSONAL_TAX_CHANGES = 'tax_change'
const KEY_LIMITED_TRANSACTIONS = 'limited_transactions'

const basicInfo = ref({

})

const securitys = ref([{
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
// 蜜罐风险数据
const risks = ref([{
  result: false,
  key: KEY_OPENSOURCE,
  label: 'This does not appear to be a honeypot.',
  base_on: []
},
{
  result: false,
  key: KEY_PROXY,
  label: 'Transfer can pause..',
  base_on: []
},
{
  result: false,
  key: KEY_MINT,
  label: 'Holders can sell all of the token.',
  base_on: []
},
{
  result: false,
  key: KEY_TAKEOWNERSHIP,
  label: 'The token can be bought.',
  base_on: []
},
{
  result: false,
  key: KEY_OWNER_CHANGE_BALANCE,
  label: "No trading-cool-down mechanism.",
  base_on: []
},
{
  result: false,
  key: KEY_ADMIN_PRIVILEGES,
  label: 'No whitelist.',
  base_on: []
},
{
  result: false,
  key: KEY_HIDDEN_OWNER,
  label: 'No blacklist.',
  base_on: []
},
{
  result: false,
  key: KEY_SELF_DESTRUCT,
  label: 'Tax cannot be modified.',
  base_on: []
}, {
  result: false,
  key: KEY_EXTERNAL_CALL,
  label: 'No tax changes found for personal addresses.',
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
  label: 'limited number of transactions.',
  base_on: []
}])
// 校验结果数据
const checkResult = ref({
  error: 0,
  warn: 1,
  security: 20,
  percent: 55
})
// 基本数据
const basicInfo = ref({
  name: "MetamonkeyAi",
  symbol: "MMAI",
  address: "0xB8c7...1bDD52",
  creator: "0xB8c7...1bDD52",
  owner: "0xB8c7...1bDD52",
  holders: "1093",
  ratio: "58.17%",
  lp_holders: "3",
  lp_locaked: "93.17%"
})
// 交易和流动性
const tradeInfo = ref({
  buyTax: "5%",
  sellTax: "10%"
})
// 更多链接
const moreLink = ref([{
  icon: "",
  name: "",
  link: ""
}])

const loading = ref(false)

const aveAi = 'src/assets/AveAi.svg';
const bitying = 'src/assets/Bitying.svg';
const goPlus = 'src/assets/GoPlus.svg';

const pushResult = (key, value, result) => {
  let index = securitys.value.findIndex(t => t.key === key)
  if (index >= 0) {
    if (securitys.value[index].base_on.findIndex(t => t === value) === -1) {
      securitys.value[index].base_on.push(value)
      if (result !== undefined) {
        securitys.value[index].result = result
      }
    }
  }
}

const honkebyList = ref([
  {
    result: false,
    key: KEY_HONEYPOT,
    label: 'This does not appear to be a honeypot.',
    base_on: []
  },
  {
    result: false,
    key: KEY_TRANSFER_PAUSE,
    label: 'Transfer can pause.',
    base_on: []
  },
  {
    result: false,
    key: KEY_CAN_SELL,
    label: 'Holders can sell all of the token.',
    base_on: []
  },
  {
    result: false,
    key: KEY_CAN_BUY,
    label: 'The token can bought.',
    base_on: []
  },
  {
    result: false,
    key: KEY_TRADING_COOLDOWN,
    label: 'No trading-cool-down mechanism. ',
    base_on: []
  },
  {
    result: false,
    key: KEY_WHITELIST,
    label: 'No whitelist.',
    base_on: []
  },
  {
    result: false,
    key: KEY_BLACKLIST,
    label: 'No blacklist.',
    base_on: []
  },
  {
    result: false,
    key: KEY_PERSONAL_TAX_CHANGES,
    label: 'No tax changes found for personal address.',
    base_on: []
  },
  {
    result: false,
    key: KEY_LIMITED_TRANSACTIONS,
    label: 'limited number of transactions.',
    base_on: []
  },
])



const pushHonkeby = (key, value, result) => {
  let index = honkebyList.value.findIndex(t => t.key === key)
  if(index >= 0) {
    if (honkebyList.value[index].base_on.findIndex(t => t === value) === -1 ){
      honkebyList.value[index].base_on.push(value)
      if (result !== undefined) {
        honkebyList.value[index].result = result
      }
    }
  }
}

const query = () => {

  loading.value = true
  Promise.all([queryGoPlusPromise(), queryAveAiPromise(), queryBityingPromise()]).then(result => {
    if (result[0] && result[0].status === 200) {
      let goPlusResult = Object.values(result[0].data.result)[0]
      pushResult(KEY_OPENSOURCE, goPlus, goPlusResult.is_open_source === '1')
      pushResult(KEY_PROXY, goPlus, goPlusResult.is_proxy === '0')
      pushResult(KEY_MINT, goPlus, goPlusResult.is_mintable === '1')
      pushResult(KEY_TAKEOWNERSHIP, goPlus, goPlusResult.can_take_back_ownership === '0')
      pushResult(KEY_OWNER_CHANGE_BALANCE, goPlus, goPlusResult.owner_change_balance === '0')
      pushResult(KEY_ADMIN_PRIVILEGES, goPlus, goPlusResult.owner_address === '')
      pushResult(KEY_HIDDEN_OWNER, goPlus, goPlusResult.hidden_owner === '0')
      pushResult(KEY_SELF_DESTRUCT, goPlus, goPlusResult.selfdestruct === '0')
      pushResult(KEY_EXTERNAL_CALL, goPlus, goPlusResult.external_call === '0')
      pushResult(KEY_SLIPPAGE_MODIFIED, goPlus, goPlusResult.slippage_modifiable === '0')
      pushResult(KEY_LP_LOCKED, goPlus, goPlusResult.lp_holders.reduce((total, s) => {
        return total && s.is_locked === 0
      }, true ))

      pushHonkeby(KEY_HONEYPOT,goPlus,goPlusResult.is_honeypot === '0')
      pushHonkeby(KEY_TRANSFER_PAUSE,goPlus,goPlusResult.transfer_pausable === '0')
      pushHonkeby(KEY_CAN_SELL,goPlus,goPlusResult.cannot_sell_all === '0')
      pushHonkeby(KEY_CAN_BUY,goPlus,goPlusResult.cannot_buy === '0')
      pushHonkeby(KEY_TRADING_COOLDOWN,goPlus,goPlusResult.trading_cooldown === '0')
      pushHonkeby(KEY_WHITELIST,goPlus,goPlusResult.is_whitelisted === '0')
      pushHonkeby(KEY_BLACKLIST,goPlus,goPlusResult.is_blacklisted === '0')
      pushHonkeby(KEY_PERSONAL_TAX_CHANGES,goPlus,goPlusResult.personal_slippage_modifiable === '0')
      pushHonkeby(KEY_LIMITED_TRANSACTIONS,goPlus,goPlusResult.is_anti_whale === '0')


      basicInfo.value.token_name = goPlusResult.token_name
      basicInfo.value.token_symbol = goPlusResult.token_symbol
      basicInfo.value.token_address = Object.entries(result[0].data.result)[0][0]
      basicInfo.value.creator_address = goPlusResult.creator_address
      basicInfo.value.owner_address = goPlusResult.owner_address
      basicInfo.value.holder_count = goPlusResult.holder_count
      basicInfo.value.top10_token_holders_ratio = goPlusResult.holders.reduce((total,item) => {
        return total+ parseFloat(item.percent)
      },0)
      basicInfo.value.lp_holder_count = goPlusResult.lp_holder_count
      basicInfo.value.lp_lock_percetage = goPlusResult.lp_holders.reduce((total,item)=> {
        return total+ parseFloat(item.percent)
      },0)
      basicInfo.value.buy_tax = goPlusResult.buy_tax
      basicInfo.value.sell_tax = goPlusResult.sell_tax
    }

    if (result[1] && result[1].status === 200) {
      let aveaiData = result[1].data.data.token_contract.contract_data

      if(aveaiData.has_code) {
        pushResult(KEY_OPENSOURCE, aveAi, aveaiData.has_code === 1)
      }
      if(aveaiData.is_proxy) {
        pushResult(KEY_PROXY, aveAi, aveaiData.is_proxy === '0')
      }
      if(aveaiData.has_mint_method) {
        pushResult(KEY_MINT, aveAi, aveaiData.has_mint_method === 1)
      }
      if(aveaiData.can_take_back_ownership) {
        pushResult(KEY_TAKEOWNERSHIP, aveAi, aveaiData.can_take_back_ownership === '0')
      }
      if(aveaiData.owner_change_balance){
        pushResult(KEY_OWNER_CHANGE_BALANCE,aveAi,aveaiData.owner_change_balance === '0')
      }
      if(aveaiData.owner) {
        pushResult(KEY_ADMIN_PRIVILEGES, aveAi, aveaiData.owner === '')
      }
      if(aveaiData.hidden_owner){
        pushResult(KEY_HIDDEN_OWNER,aveAi,aveaiData.hidden_owner === '0')
      }
      if(aveaiData.selfdestruct){
        pushResult(KEY_SELF_DESTRUCT,aveAi,aveaiData.selfdestruct === '0')
      }
      if(aveaiData.external_call){
        pushResult(KEY_EXTERNAL_CALL,aveAi,aveaiData.external_call === '0')
      }
      if(aveaiData.slippage_modifiable){
        pushResult(KEY_SLIPPAGE_MODIFIED,aveAi,aveaiData.slippage_modifiable === 0)
      }
      if(aveaiData.pair_lock_percent){
        pushResult(KEY_LP_LOCKED,aveAi,aveaiData.pair_lock_percent === 0)
      }

      if(aveaiData.is_honeypot){
        pushHonkeby(KEY_HONEYPOT,aveAi,aveaiData.is_honeypot === -1 )
      }
      if(aveaiData.transfer_pausable){
        pushHonkeby(KEY_TRANSFER_PAUSE,aveAi,aveaiData.transfer_pausable === '0')
      }
      if(aveaiData.cannot_sell_all){
        pushHonkeby(KEY_CAN_SELL,aveAi,aveaiData.cannot_sell_all === '0')
      }
      if(aveaiData.cannot_buy){
        pushHonkeby(KEY_CAN_BUY,aveAi,aveaiData.cannot_buy === '0')
      }
      if(aveaiData.trading_cooldown){
        pushHonkeby(KEY_TRADING_COOLDOWN,aveAi,aveaiData.trading_cooldown === '0')
      }
      if(aveaiData.has_white_method){
        pushHonkeby(KEY_WHITELIST,aveAi,aveaiData.has_white_method === 0)
      }
      if(aveaiData.has_black_method){
        pushHonkeby(KEY_BLACKLIST,aveAi,aveaiData.has_black_method === 0)
      }
      if(aveaiData.personal_slippage_modifiable){
        pushHonkeby(KEY_PERSONAL_TAX_CHANGES,aveAi,aveaiData.personal_slippage_modifiable === '0')
      }
    }

    if(result[2] && result[2].status === 200) {
      let bityingData = result[2].data.data
      let remask = bityingData.remask
      remask.forEach(item => {
        if (item.content === '合约代码开源') {
          pushResult(KEY_OPENSOURCE, bitying, item.ispassed === 1)
        }
        if (item.content === '项目方没有过多特权') {
          pushResult(KEY_ADMIN_PRIVILEGES, bitying, item.ispassed === 1)
        }
        if (item.content === '不存在代币增发') {
          pushResult(KEY_MINT, bitying, item.ispassed === 1)
        }
        if (item.content === '不能更改滑点') {
          pushResult(KEY_SLIPPAGE_MODIFIED, bitying, item.ispassed === 1)
        }
        if (item.content === '不存在黑名单'){
          pushHonkeby(KEY_BLACKLIST,bitying,item.ispassed === 1)
        }
        if (item.content === '不存在交易锁'){
          pushHonkeby(KEY_LP_LOCKED,bitying,item.ispassed === 1)
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

  if (networkIdMap.has(chain.value)) {
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

const queryBityingPromise = () => {
  return axios.post('/bitying/ceye/contract',
    {
      "uname": "biteagle",
      "chain": 2,
      "address": "0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD",
      "time": new Date().getTime(),
      "sign": "fDaSGLxOsiG0lTbnVVicECexBeNMZFVtlChy+78Bb6gg+PSO3ZP5O9QkDtIkypxqQ4iXYOnNwuM4pL/juQqs8slMOID0SJZXkbZ60ZeJv2+4Y2bxM/BNxyRyltrNMnfokAe+cpliW4FWk49miapIvnRE8T9iclUgNQmRba+p9tt/505JyB8io6NfVDr/OnTc3wu5oa3GKyM/LxST+qFHP/wzphfORMdJ8fD4NdfM9dFwMQqyD5hkmXeGqiUjZ1E9Cngsm7bBPx1qBMcVS7HQEV9OPSJtsU1nil9w0lSb1t/tjsOQnY+Z4TycCLMZbluwhSAei6RjXf3fBSmrISpM6g=="
    }
  )
}

const toPercentage = (num) => {
  return num.toFixed(4)*100+'%'
}
</script>

<style scoped lang="less">
.header {
  height: 400px;
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
  margin-left: 2px;
}

h3 {
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #FFFFFF;
  margin-left: 3px;
}

.content-right {
  justify-content: right;
  display: flex;
}

.result {
  padding: 24px 53px;

  .title {
    font-weight: 700;
    font-size: 24px;
    line-height: 31px;
    margin-bottom: 24px;
  }
}
</style>
