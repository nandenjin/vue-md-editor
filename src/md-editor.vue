<template lang="pug">
  div.nandenjin_md-editor
    div.toolbar
      ul.tool-group
        button.tool-item.material-icons(
          :class='{ active: isInsideOf.bold }'
          @click.prevent="execCommand('bold')"
        )
          | format_bold
        button.tool-item.material-icons(
          :class='{ active: isInsideOf.italic }'
          @click.prevent="execCommand('italic')"
        )
          | format_italic
        button.tool-item.material-icons(
          :class='{ active: isInsideOf.title }'
          @click.prevent="toggleTitle"
        )
          | title
        button.tool-item.material-icons(
          :class='{ active: isInsideOf.unorderedList }'
          @click.prevent="execCommand('insertUnOrderedList')"
        )
          | format_list_bulleted
        button.tool-item.material-icons(
          :class='{ active: isInsideOf.orderedList }'
          @click.prevent="execCommand('insertOrderedList')"
        )
          | format_list_numbered
      ul.tool-group
        button.tool-item.material-icons(@click="execCommand('undo')")
          | undo
        button.tool-item.material-icons(@click="execCommand('redo')")
          | redo
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

import 'material-design-icons-iconfont/dist/material-design-icons.css'

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

      for (let k in this.isInsideOf) {
        this.$set(this.isInsideOf, k, false)
      }

      while (node && node !== this.$refs.content) {
        const nodeName = node.nodeName.toLowerCase()
        if (nodeName === 'b') {
          this.$set(this.isInsideOf, 'bold', true)
        } else if (nodeName === 'i') {
          this.$set(this.isInsideOf, 'italic', true)
        } else if (nodeName.match(/^h[1-6]$/)) {
          this.$set(this.isInsideOf, 'title', true)
        } else if (nodeName === 'ul') {
          this.$set(this.isInsideOf, 'unorderedList', true)
        } else if (nodeName === 'ol') {
          this.$set(this.isInsideOf, 'orderedList', true)
        }
        node = node.parentNode
      }
    },

    toggleTitle() {
      if (this.isInsideOf.title) {
        const selection = window.getSelection()
        const node = selection.anchorNode
        node.parentNode.parentNode.replaceChild(node, node.parentNode)
        this.$set(this.isInsideOf, 'title', false)
      } else {
        this.execCommand('formatBlock', '<h1>')
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
      float: left
      list-style-type: none
      margin: 10px 8px
      padding: 0

      .tool-item
        display: list-item
        -webkit-appearance: none
        appearance: none
        float: left
        width: 30px
        height: 30px
        padding: 0
        line-height: 30px
        text-align: center

        border: none
        border-radius: 50%
        outline: 0
        cursor: pointer
        background-color: transparent

        transition: background-color .2s ease 0s

        &.active
          background-color: rgba(0, 0, 0, .2)

  .content
    grid-row: 2
    outline: 0
    padding: 20px
    overflow-y: auto

    font: normal 17px sans-serif
    line-height: 1.8em

    div
      margin-bottom: .5em
</style>
