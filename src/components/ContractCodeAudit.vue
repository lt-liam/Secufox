<script setup>
import { ref } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue';
const SecuFox = ref('src/assets/SecuFox.png');
const chains = ref([{
  value: 'bsc',
  label: 'BSC',
}, {
  value: 'eth',
  label: 'ETH',
}]);
let chain = ref('eth');

</script>

<template>
  <div class="header">
    <a-row>
      <a-col :span="24">
        <a href="#/">
          <img class="logo" :src="SecuFox" />
        </a>
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
          <a-upload class="upload" name="file">
            <a-input size="large" disabled placeholder="Upload local files">
              <template #suffix>
                <upload-outlined></upload-outlined>
              </template>
            </a-input>
          </a-upload>
        </a-col>
        <a-col :span="3">
          <a-button :style="{ width: '100%' }" size="large" ghost>Coming Soon</a-button>
        </a-col>
      </a-row>
      <a-row :style="{ marginTop: '15px' }">
        <a-col :offset="5" :span="11">
          <h3>{{ WarnNote }}</h3>
        </a-col>
      </a-row>
    </div>
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

.upload:deep(.ant-upload) {
  width: 100%;
}
</style>
