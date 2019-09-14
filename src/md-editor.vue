<template lang="pug">
  div.nandenjin_md-editor
    div.toolbar
    div.content(
      ref="content"
      contenteditable='true'
      @input='onChange'
    )
</template>

<script>
import Vue from 'vue'
const h2m = require('h2m')

export default Vue.extend({
  props: {
    value: {
      type: String,
      required: true
    }
  },

  methods: {
    onChange() {
      const value = this.$refs.content.innerHTML
      this.$emit('input', h2m(value))
    }
  }
})
</script>

<style lang="sass">
.nandenjin_md-editor
  display: grid
  grid-template-rows: 20px 1fr
  background-color: #fff

  .toolbar
    grid-row: 1

  .content
    grid-row: 2
    outline: 0

    font: normal 17px sans-serif
    line-height: 1.8em

    div
      margin-bottom: .5em
</style>
