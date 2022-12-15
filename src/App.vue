<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import GoPlus from '/@/components/GoPlus.vue'
import AveAi from "./components/AveAi.vue";
</script>

<template>
  <div class="header">
  </div>
  <HelloWorld msg="Vite + Vue" />
  <GoPlus/>
  <AveAi />
</template>

<style scoped>
.header {
  height: 350px;
  background-image: linear-gradient(to right, #4C41F5 25%, #58AAF9 100%);
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
