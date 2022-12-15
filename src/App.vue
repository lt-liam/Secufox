<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import GoPlus from '/@/components/GoPlus.vue'
import AveAi from "./components/AveAi.vue";
</script>

<template>
  <div class="header">
    <a-row>
      <a-col :span="12">
        <h1>Secufox</h1>
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

    </div>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <GoPlus />
  <AveAi />
</template>

<style scoped lang="less">
.header {
  height: 350px;
  background: linear-gradient(89.97deg, #4C41F5 1.5%, #58AAF9 100%);
  padding: 24px 60px;

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
}

h3 {
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #FFFFFF;
}

.click {
  justify-content: right;
  display: flex;
}
</style>
