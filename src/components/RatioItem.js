import Vue from 'vue'

const RatioItem = Vue.component('ratio-item', {
  props: { language: '', value: 0 },
  template: `<li>{{ language }}: {{ value }}%</li>`
})

module.exports = RatioItem
