import Vue from 'vue'
import RatioItem from './RatioItem'

const Ratio = Vue.component('ratio', {
  components: { RatioItem },
  props: { items: [] },
  template: `
    <div>
      <h2 class="mb-1 h4">Language Ratio</h2>
      <ul>
        <ratio-item v-for="item in items" :language="item.language" :value="item.value" />
      </ul>
    </div>
  `
})

module.exports = Ratio
