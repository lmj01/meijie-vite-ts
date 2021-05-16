<template>
  <div class="ecmascript-function">
    <p>function</p>
    <div id="codeDiv"></div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue'
import { codeMirrorEditor } from '@/helpers/CodeMirror'

export default defineComponent({
  name: 'Ecmascript.function',
  setup: () => {    
    const { mjCreateEditor, mjUpdateCode } = codeMirrorEditor();
    onMounted(()=>{
      mjCreateEditor(document.getElementById('codeDiv'))
      const filename = `/src/components/ecmascript/function.js`;
      // fetch(filename).then(res=>res.text()).then((res)=>{
      //   let res2 = res.split('//# sourceMappingURL');
      //   mjUpdateCode(res2[0]);
      // })
    })
    
    return { 
    }
  }
})
</script>

<style lang="scss" scoped>
#codeDiv {
  width: 400px;
  border: 1px dashed lightblue;
}
</style>
