<template>
  <div class="header">
    <a-row>
      <a href="#/">
        <img class="logo" :src="SecuFox" />
      </a>
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
  <a-row class="result" v-show="displayResult" >
    <a-col class="list" :span="16">
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
        <div v-for="result in honkebyRisk">
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
      <div class="info" >
        <div>
          <div class="title" style="margin-bottom: 0">Check Result</div>
          <div class="gauge" ref="score"></div>
          <a-row style="margin-bottom: 36px">
            <a-col :span="8">
              <div><close-circle-outlined :style="{ fontSize: '25px', color: '#E54346' }" />
                <span class="show">{{ riskItemNum }}</span>
                <span class="item">item</span>
              </div>
            </a-col>
            <a-col :span="8">
              <div><check-circle-outlined :style="{ fontSize: '25px', color: '#4FCA81' }" />
                <span class="show">{{ attentionItemNum }}</span>
                <span class="item">item</span>
              </div>
            </a-col>
            <a-col :span="8">
              <div><exclamation-circle-outlined :style="{ fontSize: '25px', color: '#F5AF1C' }" />
                <span class="show">{{ scanItemNum }}</span>
                <span class="item">item</span>
              </div>
            </a-col>
          </a-row>
        </div>
        <div style="margin-bottom: 36px">
          <div class="title">Basic Info</div>
          <a-list item-layout="horizontal" :split="false" size="small">
            <a-list-item>
              <template #actions>
                <b>{{ basicInfo.name }}</b>
              </template>
              <div>
                Token Name
              </div>
            </a-list-item>
            <a-list-item>
              <template #actions>
                <b>{{ basicInfo.symbol }}</b>
              </template>
              <div>
                Token Symbol
              </div>
            </a-list-item>
            <a-list-item>
              <template #actions>
                <b><address-display :address="basicInfo.address" /></b>
              </template>
              <div>
                Token Address
              </div>
            </a-list-item>
            <a-list-item>
              <template #actions>
                <b><address-display :address="basicInfo.creator" /></b>
              </template>
              <div>
                Contract Creator
              </div>
            </a-list-item>
            <a-list-item>
              <template #actions>
                <b><address-display :address="basicInfo.owner" /></b>
              </template>
              <div>
                Contract Owner
              </div>
            </a-list-item>
            <a-list-item>
              <template #actions>
                <b>{{ basicInfo.holders }}</b>
              </template>
              <div>
                Token Holders
              </div>
            </a-list-item>
            <a-list-item>
              <template #actions>
                <b>{{ toPercentage (basicInfo.ratio) }}</b>
              </template>
              <div>
                Top10 Token Holders Ratio
              </div>
            </a-list-item>
            <a-list-item>
              <template #actions>
                <b>{{ basicInfo.lp_holders }}</b>
              </template>
              <div>
                LP Holders
              </div>
            </a-list-item>
            <a-list-item>
              <template #actions>
                <b>{{ toPercentage(basicInfo.lp_locaked) }}</b>
              </template>
              <div>
                Percent of LP Locked
              </div>
            </a-list-item>
          </a-list>
        </div>
        <div style="margin-bottom: 36px">
          <div class="title">Trade & Liquidity</div>
          <a-list item-layout="horizontal" :split="false" size="small">
            <a-list-item>
              <template #actions>
                <b>{{ basicInfo.buy_tax }}</b>
              </template>
              <div>
                Buy Tax
              </div>
            </a-list-item>
            <a-list-item>
              <template #actions>
                <b>{{ basicInfo.sell_tax }}</b>
              </template>
              <div>
                Sell Tax
              </div>
            </a-list-item>
          </a-list>
        </div>
        <div class="more">
          <div class="title">More results please refer:</div>

          <span v-for="link in moreLink">
            <a :href="link.link"><img :src="link.icon" /><span>{{ link.name }}</span></a>
          </span>
        </div>
      </div>
    </a-col>
  </a-row>
</template>


<script setup>
import { computed, ref, onMounted } from 'vue'
import { CheckCircleOutlined, ExclamationCircleOutlined, CloseCircleOutlined } from '@ant-design/icons-vue';
import axios from "axios";
import AddressDisplay from "./AddressDisplay.vue";

import { Gauge } from '@antv/g2plot';

const score = ref(null);
const displayResult = ref(false)

let gauge = null;

let initChart = () => {
  const ticks = [0, 1 / 3, 2 / 3, 1];
  const color = ['#F4664A', '#FAAD14', '#30BF78'];
  gauge = new Gauge(score.value, {
    percent: 0,
    innerRadius: 0.75,
    type: 'meter',
    // 自定义 meter 总步数 以及 step 占比
    meter: {
      steps: 50,
      stepRatio: 0.6,
    },
    range: {
      ticks: [0, 1 / 3, 2 / 3, 1],
      color: ["#F4664A", "#FAAD14", "#30BF78"]
    },
    indicator: {
      pointer: {
        style: {
          stroke: '#D0D0D0',
        },
      },
      pin: {
        style: {
          stroke: '#D0D0D0',
        },
      },
    },
    statistic: {
      content: {
        style: ({ percent }) => {
          return {
            fontSize: "36px",
            lineHeight: 1,
            color:
              percent < ticks[1]
                ? color[0]
                : percent < ticks[2]
                  ? color[1]
                  : color[2]
          };
        }
      }
    },
  });

  gauge.render();
}

onMounted(initChart)

const SecuFox = ref('src/assets/SecuFox.png');

const WarnNote = ref('Note: Results provided by third parties, we try to detect all contract risks, ' +
  'but cannot guarantee 100% identification of all risks. ' +
  'It is recommended to use the detection results as a reference.');

const chains = ref([{
  value: 'bsc',
  label: 'BSC',
}, {
  value: 'eth',
  label: 'ETH',
}]);

let chain = ref('bsc');
let address = ref('')

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

// 基本数据
const basicInfo = ref({
  name: "",
  symbol: "",
  address: "",
  creator: "",
  owner: "",
  holders: "",
  ratio: "",
  lp_holders: "",
  lp_locaked: ""
})

// 更多链接
const moreLink = ref([{
  icon: "src/assets/Devnav.svg",
  name: "Devnav",
  link: "https://dexnav.com/#term-221"
}])

const loading = ref(false)
const goplusData = ref({
  is_honeypot: '',
  sell_tax: '0',
  buy_tax: '0',
  cannot_buy: '',
  is_anti_whale: '',
  slippage_modifiable: '',
  transfer_pausable: '',
})

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

const honkebyRisk = ref([
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
  let index = honkebyRisk.value.findIndex(t => t.key === key)
  if (index >= 0) {
    if (honkebyRisk.value[index].base_on.findIndex(t => t === value) === -1) {
      honkebyRisk.value[index].base_on.push(value)
      if (result !== undefined) {
        honkebyRisk.value[index].result = result
      }
    }
  }
}

const query = () => {
  loading.value = true
  basicInfo.value = {
    name: "",
    symbol: "",
    address: "",
    creator: "",
    owner: "",
    holders: "",
    ratio: "",
    lp_holders: "",
    lp_locaked: ""
  }
  Promise.all([queryGoPlusPromise(), queryAveAiPromise(), queryBityingPromise()])
      .then(result => {
    displayResult.value = true
    if (result[0] && result[0].status === 200 && Object.values(result[0].data.result).length > 0) {
      let goPlusResult = Object.values(result[0].data.result)[0]
      goplusData.value = goPlusResult
      if(goPlusResult.is_open_source){
        pushResult(KEY_OPENSOURCE, goPlus, goPlusResult.is_open_source === '1')
      }
      if(goPlusResult.is_proxy){
        pushResult(KEY_PROXY, goPlus, goPlusResult.is_proxy === '0')
      }
      if(goPlusResult.is_mintable){

        pushResult(KEY_MINT, goPlus, goPlusResult.is_mintable === '0')
      }
      if(goPlusResult.can_take_back_ownership){

        pushResult(KEY_TAKEOWNERSHIP, goPlus, goPlusResult.can_take_back_ownership === '0')
      }
      if(goPlusResult.owner_change_balance){

        pushResult(KEY_OWNER_CHANGE_BALANCE, goPlus, goPlusResult.owner_change_balance === '0')
      }
      if(goPlusResult.owner_address){

        pushResult(KEY_ADMIN_PRIVILEGES, goPlus, goPlusResult.owner_address === '')
      }
      if(goPlusResult.hidden_owner){

        pushResult(KEY_HIDDEN_OWNER, goPlus, goPlusResult.hidden_owner === '0')
      }
      if(goPlusResult.selfdestruct){

        pushResult(KEY_SELF_DESTRUCT, goPlus, goPlusResult.selfdestruct === '0')
      }
      if(goPlusResult.external_call){

        pushResult(KEY_EXTERNAL_CALL, goPlus, goPlusResult.external_call === '0')
      }

      if(goPlusResult.slippage_modifiable ){

        pushResult(KEY_SLIPPAGE_MODIFIED, goPlus, goPlusResult.slippage_modifiable === '0')
      }
      if(goPlusResult.lp_holders) {
        pushResult(KEY_LP_LOCKED, goPlus, goPlusResult.lp_holders.reduce((total, s) => {
          return total + s.is_locked === 1? parseFloat(s.percent): 0
        }, 0) < 1)
      }
      if(goPlusResult.is_honeypot){

        pushHonkeby(KEY_HONEYPOT, goPlus, goPlusResult.is_honeypot === '0')
      }
      if(goPlusResult.transfer_pausable){

        pushHonkeby(KEY_TRANSFER_PAUSE, goPlus, goPlusResult.transfer_pausable === '0')
      }
      if(goPlusResult.cannot_sell_all){

        pushHonkeby(KEY_CAN_SELL, goPlus, goPlusResult.cannot_sell_all === '0')
      }
      if(goPlusResult.cannot_buy){

        pushHonkeby(KEY_CAN_BUY, goPlus, goPlusResult.cannot_buy === '0')
      }
      if(goPlusResult.trading_cooldown){

        pushHonkeby(KEY_TRADING_COOLDOWN, goPlus, goPlusResult.trading_cooldown === '0')
      }
      if(goPlusResult.is_whitelisted ){

        pushHonkeby(KEY_WHITELIST, goPlus, goPlusResult.is_whitelisted === '0')
      }
      if(goPlusResult.is_blacklisted){

        pushHonkeby(KEY_BLACKLIST, goPlus, goPlusResult.is_blacklisted === '0')
      }
      if(goPlusResult.personal_slippage_modifiable){

        pushHonkeby(KEY_PERSONAL_TAX_CHANGES, goPlus, goPlusResult.personal_slippage_modifiable === '0')
      }
      if(goPlusResult.is_anti_whale){
        pushHonkeby(KEY_LIMITED_TRANSACTIONS, goPlus, goPlusResult.is_anti_whale === '0')
      }

      if(goPlusResult.token_name){

        basicInfo.value.name = goPlusResult.token_name
      }
      if(goPlusResult.token_symbol){

        basicInfo.value.symbol = goPlusResult.token_symbol
      }

      if(Object.entries(result[0].data.result)[0][0]){

        basicInfo.value.address = Object.entries(result[0].data.result)[0][0]
      }
      if(goPlusResult.creator_address){

        basicInfo.value.creator = goPlusResult.creator_address
      }
      basicInfo.value.owner = goPlusResult.owner_address
      basicInfo.value.holders = goPlusResult.holder_count
      if(goPlusResult.holders && goPlusResult.holders.length > 0){
        basicInfo.value.ratio = goPlusResult.holders.reduce((total, item) => {
          return total + parseFloat(item.percent)
        }, 0)
      }
      basicInfo.value.lp_holders = goPlusResult.lp_holder_count
      if(goPlusResult.lp_holders) {
        basicInfo.value.lp_locaked = goPlusResult.lp_holders.reduce((total, item) => {
          return total + item.is_locked === 1? parseFloat(item.percent):0
        }, 0)
      }
      basicInfo.value.buy_tax = goPlusResult.buy_tax
      basicInfo.value.sell_tax = goPlusResult.sell_tax
    }

    if (result[1] && result[1].status === 200) {
      let aveaiData = result[1].data.data.token_contract.contract_data

      if (aveaiData.has_code) {
        pushResult(KEY_OPENSOURCE, aveAi, aveaiData.has_code === 1)
      }
      if (aveaiData.is_proxy) {
        pushResult(KEY_PROXY, aveAi, aveaiData.is_proxy === '0')
      }
      if (aveaiData.has_mint_method) {
        pushResult(KEY_MINT, aveAi, aveaiData.has_mint_method === 0)
      }
      if (aveaiData.can_take_back_ownership) {
        pushResult(KEY_TAKEOWNERSHIP, aveAi, aveaiData.can_take_back_ownership === '0')
      }
      if (aveaiData.owner_change_balance) {
        pushResult(KEY_OWNER_CHANGE_BALANCE, aveAi, aveaiData.owner_change_balance === '0')
      }
      if (aveaiData.owner) {
        pushResult(KEY_ADMIN_PRIVILEGES, aveAi, aveaiData.owner === '')
      }
      if (aveaiData.hidden_owner) {
        pushResult(KEY_HIDDEN_OWNER, aveAi, aveaiData.hidden_owner === '0')
      }
      if (aveaiData.selfdestruct) {
        pushResult(KEY_SELF_DESTRUCT, aveAi, aveaiData.selfdestruct === '0')
      }
      if (aveaiData.external_call) {
        pushResult(KEY_EXTERNAL_CALL, aveAi, aveaiData.external_call === '0')
      }
      if (aveaiData.slippage_modifiable) {
        pushResult(KEY_SLIPPAGE_MODIFIED, aveAi, aveaiData.slippage_modifiable === 0)
      }
      if (aveaiData.pair_lock_percent) {
        pushResult(KEY_LP_LOCKED, aveAi, aveaiData.pair_lock_percent < 1)
      }

      if (aveaiData.is_honeypot) {
        pushHonkeby(KEY_HONEYPOT, aveAi, aveaiData.is_honeypot === -1)
      }
      if (aveaiData.transfer_pausable) {
        pushHonkeby(KEY_TRANSFER_PAUSE, aveAi, aveaiData.transfer_pausable === '0')
      }
      if (aveaiData.cannot_sell_all) {
        pushHonkeby(KEY_CAN_SELL, aveAi, aveaiData.cannot_sell_all === '0')
      }
      if (aveaiData.cannot_buy) {
        pushHonkeby(KEY_CAN_BUY, aveAi, aveaiData.cannot_buy === '0')
      }
      if (aveaiData.trading_cooldown) {
        pushHonkeby(KEY_TRADING_COOLDOWN, aveAi, aveaiData.trading_cooldown === '0')
      }
      if (aveaiData.has_white_method) {
        pushHonkeby(KEY_WHITELIST, aveAi, aveaiData.has_white_method === 0)
      }
      if (aveaiData.has_black_method) {
        pushHonkeby(KEY_BLACKLIST, aveAi, aveaiData.has_black_method === 0)
      }
      if (aveaiData.personal_slippage_modifiable) {
        pushHonkeby(KEY_PERSONAL_TAX_CHANGES, aveAi, aveaiData.personal_slippage_modifiable === '0')
      }
      if (aveaiData.risk_score) {
        gauge.changeData(aveaiData.risk_score / 100);
      } else {
        gauge.changeData(0);
      }
    }

    if (result[2] && result[2].status === 200) {
      let bityingData = result[2].data.data
      let remask = bityingData.remask
      remask.forEach(item => {
        if (item.content === '合约代码开源') {
          pushResult(KEY_OPENSOURCE, bitying, item.ispassed === 1)
        }
        if (item.content === '项目方没有过多特权') {
          pushResult(KEY_ADMIN_PRIVILEGES, bitying, item.ispassed === 1)
        }
        // if (item.content === '不存在代币增发') {
        //   pushResult(KEY_MINT, bitying, item.ispassed === 1)
        // }
        if (item.content === '不能更改滑点') {
          pushResult(KEY_SLIPPAGE_MODIFIED, bitying, item.ispassed === 1)
        }
        if (item.content === '不存在黑名单') {
          pushHonkeby(KEY_BLACKLIST, bitying, item.ispassed === 1)
        }
        if (item.content === '不存在交易锁') {
          pushHonkeby(KEY_LP_LOCKED, bitying, item.ispassed === 1)
        }
      })
    }
  }).catch(err => {
    console.log(err)
  }).finally(() => {
    loading.value = false
  })
}

const networkIdMap = new Map()
networkIdMap['eth'] = 1
networkIdMap['bsc'] = 56

const queryGoPlusPromise = () => {
  let networkId = 1

  if (networkIdMap[chain.value]) {
    networkId = networkIdMap[chain.value]
  }
  return axios.get(`/goplus/api/v1/token_security/${networkId}?contract_addresses=${address.value}`)
}

const queryAveAiPromise = () => {
  return new Promise((resolve, reject) => {
    axios({
      url: `/aveai/v1api/v2/tokens/contract?token_id=${address.value}-${chain.value}&type=token&user_address=`,
      method: 'get',
      headers: {
        "x-auth": '6359bc6122e3930be34a36319ec159a41671001252326238764'
      }
    }).then(res => {
      resolve(res)
    }).catch(err => {
      resolve(err)
    })
  })


}

const queryBityingPromise = () => {
  let networkId = 2
  if('bsc' === chain.value){
    networkId = 1
  }
  return new Promise((resolve, reject) => {
    axios.post('/bitying/ceye/contract',
        {
          "uname": "biteagle",
          "chain": networkId,
          "address": "0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD",
          "time": new Date().getTime(),
          "sign": "fDaSGLxOsiG0lTbnVVicECexBeNMZFVtlChy+78Bb6gg+PSO3ZP5O9QkDtIkypxqQ4iXYOnNwuM4pL/juQqs8slMOID0SJZXkbZ60ZeJv2+4Y2bxM/BNxyRyltrNMnfokAe+cpliW4FWk49miapIvnRE8T9iclUgNQmRba+p9tt/505JyB8io6NfVDr/OnTc3wu5oa3GKyM/LxST+qFHP/wzphfORMdJ8fD4NdfM9dFwMQqyD5hkmXeGqiUjZ1E9Cngsm7bBPx1qBMcVS7HQEV9OPSJtsU1nil9w0lSb1t/tjsOQnY+Z4TycCLMZbluwhSAei6RjXf3fBSmrISpM6g=="
        }
    ).then(res => {
      resolve(res)
    }).catch(err => {
      resolve(err)
    })
  })

}

const toPercentage = (num) => {
  if (isNumber(num)) {
    return (num * 100).toFixed(2)  + '%'
  } else {
    return num
  }
}

const isNumber = (obj) => {
  return obj === +obj
}

const riskItemNum = computed(() => {
  let risk = 0;
  if(goplusData.value.is_honeypot && goplusData.value.is_honeypot === '1'){
    risk++
  }
  if(goplusData.value.sell_tax && parseFloat(goplusData.value.sell_tax) > 0.1){
    risk++
  }
  if (goplusData.value.buy_tax && parseFloat(goplusData.value.buy_tax) > 0.1){
    risk++
  }
  return risk
})
const attentionItemNum = computed(() => {
  let attention = 0
  if(goplusData.value.cannot_buy && goplusData.value.cannot_buy === '1'){
    attention++
  }
  if(goplusData.value.is_anti_whale && goplusData.value.is_anti_whale === '1'){
    attention++
  }
  if(goplusData.value.slippage_modifiable && goplusData.value.slippage_modifiable === '1'){
    attention++
  }
  if(goplusData.value.transfer_pausable  && goplusData.value.transfer_pausable === '1'){
    attention++
  }
  if(goplusData.value.is_mintable && goplusData.value.is_mintable === '1'){
    attention++
  }
  return attention
})

const scanItemNum = computed(() => {
  return 20 - riskItemNum.value - attentionItemNum.value
})
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

  .list {
    img {
      width: 32px;
      height: 32px;
    }
  }

  .title {
    font-weight: 700;
    font-size: 24px;
    line-height: 31px;
    margin-bottom: 24px;
  }

  .info {

    .show {
      font-weight: 400;
      font-size: 32px;
      line-height: 42px;
      margin-left: 10px;
    }

    .item {
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;
      margin-left: 10px;
    }

    .gauge {
      margin: 0px 50px;
    }

    margin-left: 50px;

    .more {
      a {
        color: #383B46;

        img {
          height: 24px;
        }

        span {
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          margin-left: 10px;
        }
      }
    }
  }

  .info:deep(.ant-list-sm .ant-list-item) {
    padding: 0;
    line-height: 32px;
  }
}
</style>
