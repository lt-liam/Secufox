<script setup>
import { ref } from 'vue'
const SecuFox = ref('src/assets/SecuFox.png')

const chains = ref([{
  value: 'bsc',
  label: 'BSC',
}, {
  value: 'eth',
  label: 'ETH',
}]);

let chain = ref('bsc');
</script>

<template>
  <div class="header">
    <a-row>
      <a-col :span="12">
        <img class="logo" :src="SecuFox" />
      </a-col>
      <a-col :span="12" class="click">
        <a-button size="large" href="#/contract-code-audit" ghost> I'm a developer</a-button>
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
  <div class="result">
    <div class="resultTitle">Detect Result</div>
    <a-card style="width: 100%;margin-top: 37px;">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </a-card>
  </div>
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

  .resultTitle {
    font-weight: 700;
    font-size: 32px;
    line-height: 42px;
  }
}
</style>
