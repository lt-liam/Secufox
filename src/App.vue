<script>
import Home from './components/Home.vue'
import ContractSecurityCheck from './components/ContractSecurityCheck.vue'
import NotFound from './components/NotFound.vue'
import ContractCodeAudit from './components/ContractCodeAudit.vue'

const routes = {
  '/': Home,
  '/contract-security-check': ContractSecurityCheck,
  '/contract-code-audit': ContractCodeAudit
}

export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
    })
  }
}
</script>

<template>
  <a href="#/">Home</a> |
  <a href="#/contract-security-check">ContractSecurityCheck</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
</template>