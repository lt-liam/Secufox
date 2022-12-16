<script setup>
import { ref } from 'vue'
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';

const SecuFox = ref('src/assets/SecuFox.png')

const chains = ref([{
  value: 'bsc',
  label: 'BSC',
}, {
  value: 'eth',
  label: 'ETH',
}]);

let chain = ref('bsc');


const resultList = ref([{
  result: true,
  label: 'This token contract is open source.',
  base_on: []
},
{
  result: false,
  label: 'There is no proxy in the contract.',
  base_on: []
},
{
  result: true,
  label: 'Mint function is transparent or non- existent.',
  base_on: []
},
{
  result: true,
  label: 'Can not take back ownership.',
  base_on: []
},
{
  result: true,
  label: "Owner can't change balance.",
  base_on: []
},
{
  result: true,
  label: 'Has not dropped admin privileges.',
  base_on: []
},
{
  result: true,
  label: 'No hidden owner address was found for the token.',
  base_on: []
},
{
  result: true,
  label: 'This token can not self destruct.',
  base_on: []
}, {
  result: true,
  label: 'No external call risk found.',
  base_on: []
},
{
  result: true,
  label: 'Slippage cannot be modified.',
  base_on: []
}, {
  result: true,
  label: 'LP is locked.',
  base_on: []
}])

</script>

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
          <a-input size="large" ghost placeholder="Enter Token Address" />
        </a-col>
        <a-col :span="3">
          <a-button :style="{ width: '100%' }" size="large" ghost>Check</a-button>
        </a-col>
      </a-row>
    </div>
  </div>
  <a-row class="result">
    <a-col :span="12">
      <a-card style="width: 100%;">
        <div class="title">Contract Security</div>
        <div v-for="result in resultList">
          <check-circle-outlined v-if="result.result" :style="{ fontSize: '16px', color: '#4FCA81' }" />
          <exclamation-circle-outlined v-else :style="{ fontSize: '16px', color: '#F5AF1C' }" />
          <span style="margin-left: 10px;">{{ result.label }}</span>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

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
