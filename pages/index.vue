<template>
  <div
    v-cloak
    id="app">
    <calculator />
    <div class="calc__last-results">
      <div class="calc__last-results__wrapper">
        <h2>Last results:</h2>
        <no-ssr>
          <p
            v-for="res in lastResults.slice(lastResults.length - 6, lastResults.length).reverse()"
            :key="res.id">
            <b>{{ res.calculation }}</b>
          </p>
        </no-ssr>
      </div>
    </div>
  </div>
</template>

<script>
import Calculator from '../components/Calculator.vue'
import restdbconfig from '../restdbconfig.js'

export default {
  components: {
    Calculator
  },
  data() {
    return {
      lastResults: {
        calculation: ''
      }
    }
  },
  watchQuery: true,
  async asyncData({ $axios }) {
    const lastResults = await $axios.$get(
      `https://calculator-625a.restdb.io/rest/calculator`,
      restdbconfig
    )
    return { lastResults }
  }
}
</script>
