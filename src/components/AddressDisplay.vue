<template>
  <div>
    <label>{{opermiseAddress}}</label>
    <a-tooltip trigger="hover" @visibleChange="hide">
      <template #title>{{ copy_msg }}</template>
      <a-button type="text" size="small" @click="onCopy(address)">
        <template #icon><copy-two-tone /></template>
      </a-button>
    </a-tooltip>
  </div>
</template>

<script setup>
import {computed, defineComponent, defineProps,ref} from 'vue';
import { CopyTwoTone } from '@ant-design/icons-vue';
const props = defineProps({
  address:String
})

const copy_msg = ref('copy')

const opermiseAddress = computed(()=>{
  if (props.address.length > 12){
    return props.address.slice(0,6) + "..." + props.address.slice(-6)
  }else {
    return props.address
  }

})

const onCopy = (certB64) => {
  copy_msg.value = 'copied'
  let oInput = document.createElement('input')
  oInput.value = certB64;
  document.body.appendChild(oInput)
  oInput.select() // 选择对象
  document.execCommand("Copy") // 执行浏览器复制命令
  oInput.remove()

}

const hide = (visible)=> {
  if(visible === true){
    copy_msg.value = 'copy'
  }
}

defineComponent({
  components: {
    CopyTwoTone,
  },
});

</script>

<style scoped>

</style>
