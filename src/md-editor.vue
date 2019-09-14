<template lang="pug">
  div.nandenjin_md-editor
    div.toolbar
      ul.tool-group
        button.tool-item(
          :disabled='isInsideOf.bold'
          @click="execCommand('bold')"
        )
          | Bold
        button.tool-item(
          :disabled='isInsideOf.italic'
          @click="execCommand('italic')"
        )
          | Italic
        button.tool-item(
          :disabled='isInsideOf.title'
          @click="execCommand('formatBlock', '<h1>')"
        )
          | T
        button.tool-item(
          :disabled='isInsideOf.title'
          @click="execCommand('insertUnOrderedList')"
        )
          | UL
        button.tool-item(
          :disabled='isInsideOf.title'
          @click="execCommand('insertOrderedList')"
        )
          | OL
      ul.tool-group
        button.tool-item(@click="execCommand('undo')")
          | Undo
        button.tool-item(@click="execCommand('redo')")
          | Redo
    div.content(
      ref="content"
      contenteditable='true'
      @input='onChange'
      @keydown='onKeyDown'
      @click='onClick'
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

  data() {
    return {
      isInsideOf: {
        bold: false,
        italic: false,
        title: false,
        unorderedList: false,
        orderedList: false
      }
    }
  },

  methods: {
    onChange() {
      const value = this.$refs.content.innerHTML
      this.$emit('input', h2m(value))
      this.updateView()
    },

    onClick() {
      this.updateView()
    },

    onKeyDown() {
      this.updateView()
    },

    updateView() {
      const selection = window.getSelection()
      let node = selection.anchorNode

      for(let k in this.isInsideOf) {
        this.$set(this.isInsideOf, k, false)
      }

      while(node && node !== this.$refs.content) {
        const nodeName = node.nodeName.toLowerCase()
        if(nodeName === 'b') {
          this.$set(this.isInsideOf, 'bold', true)
        }else if(nodeName === 'i') {
          this.$set(this.isInsideOf, 'italic', true)
        }else if(nodeName.match(/^h[1-6]$/)) {
          this.$set(this.isInsideOf, 'title', true)
        }else if(nodeName === 'ul') {
          this.$set(this.isInsideOf, 'unorderedList', true)
        }else if(nodeName === 'ol') {
          this.$set(this.isInsideOf, 'orderedList', true)
        }
        node = node.parentNode
      }
    },

    execCommand(cmd, arg = null) {
      document.execCommand(cmd, false, arg)
    }
  }
})
</script>

<style lang="sass">
.nandenjin_md-editor
  display: grid
  grid-template-rows: 40px 1fr
  background-color: #fff

  .toolbar
    grid-row: 1

    .tool-group
      list-style-type: none
      margin: 0
      padding: 0

      .tool-item
        display: list-item
        float: left

  .content
    grid-row: 2
    outline: 0
    padding: 20px

    font: normal 17px sans-serif
    line-height: 1.8em

    div
      margin-bottom: .5em
</style>
