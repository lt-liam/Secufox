<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import GoPlus from '/@/components/GoPlus.vue'
import AveAi from "./components/AveAi.vue";
import { ref } from 'vue'

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
        <h1>SecuFox</h1>
      </a-col>
      <a-col :span="12" class="click">
        <a-button size="large" ghost> I'm a developer</a-button>
      </a-col>
    </a-row>
    <div class="retrieval">
      <a-row>
        <a-col :offset="3" :span="3">
          <h2>Demo Experience</h2>
        </a-col>
      </a-row>
      <a-row>
        <a-col :offset="3">
          <h3>Fast token security detection service</h3>
        </a-col>
      </a-row>
      <a-row :style="{ marginTop: '35px' }" :gutter="16">
        <a-col :offset="3" :span="2">
          <a-select size="large" ghost ref="select" style="width: 100%" v-model:value="chain"
            :options="chains"></a-select>
        </a-col>
        <a-col :span="9">
          <a-input size="large" ghost placeholder="Enter Token Address" />
        </a-col>
        <a-col :span="4">
          <a-button :style="{ width: '100%' }" size="large" ghost>Security Detect</a-button>
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
  <GoPlus />
  <AveAi />
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

h1 {
  font-size: 32px;
  font-weight: 400;
  line-height: 42px;
  letter-spacing: 0em;
  text-align: left;
  color: #FFFFFF;
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
