<template>
  <div class="header">
    <a-row>
      <a-col :span="24">
        <a href="#/">
          <img class="logo" :src="SecuFox" />
        </a>
      </a-col>
    </a-row>
    <a-row class="link" type="flex" justify="space-around">
      <a-col :span="8">
        <a href="#/contract-security-check">
          <a-card>
            <div class="img">
              <img :src="linkSecurityCheck" />
            </div>
            <h1>Contract Security Check</h1>
            <div class="describe">
              <p>Detailed, aggregated and comprehensive</p>
              <p>contract security detection for specific</p>
              <p>contracts</p>
            </div>

          </a-card>
        </a>

      </a-col>
      <a-col :span="8">
        <a href="#/contract-code-audit">
          <a-card>
            <div class="img">
              <img :src="linkCodeAudit" />
            </div>

            <h1>Contract Code Audit</h1>
            <div class="describe">
              <p>Contract development security</p>
              <p>detection to avoid potential security </p>
              <p>risks</p>
            </div>

          </a-card>
        </a>
      </a-col>
    </a-row>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const SecuFox = ref('src/assets/SecuFox.png');
const linkCodeAudit = ref('src/assets/LinkCodeAudit.svg');
const linkSecurityCheck = ref('src/assets/LinkSecurityCheck.svg');

</script>
<style scoped lang="less">
.header {
  height: 100vh;
  background: linear-gradient(89.97deg, #4C41F5 1.5%, #58AAF9 100%);
  padding: 24px 40px;

  .logo {
    width: 185px;
    height: 42px;
  }

  .link {
    margin-top: 170px;
    text-align: center;

    .img {
      height: 300px;
      line-height: 300px;

      img {
        display: inline-block;
      }
    }

    .describe {
      display: inline-block;

      p {
        text-align: left;
      }
    }
  }

  h1 {
    font-weight: 700;
    font-size: 24px;
    line-height: 31px;
  }

  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 115%;
  }
}
</style>