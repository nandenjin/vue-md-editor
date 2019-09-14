<template lang="pug">
  div.wrap
    md-editor.editor(v-model="output")
    code.preview
      | {{ output }}
</template>

<script>
import Vue from 'vue'
import MdEditor from './md-editor.vue'

export default Vue.extend({
  components: {
    MdEditor
  },
  data() {
    return {
      output: ''
    }
  }
})
</script>

<style lang="sass">
html, body
  margin: 0

.wrap
  display: flex
  width: 100vw
  height: 100vh

  .editor, .preview
    width: 50%
    height: 100%
    flex: 1 1 auto

  .preview
    background-color: #eee
    white-space: pre-wrap
    overflow-y: auto
</style>
