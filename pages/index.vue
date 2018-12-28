<template>
  <div
    v-cloak
    id="app">
    <calculator />
    <div class="calc__last-results">
      <div class="calc__last-results__wrapper">
        <p
          v-for="res in lastResults.slice(0, 5)"
          :key="res.id">
          <b>{{ res.calculation }}</b>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Calculator from '../components/Calculator.vue'

const config = {
  headers: {
    'Content-Type': 'application/json',
    'x-apikey': '5c250529b358007a7c8d7937'
  }
}

String.prototype.replaceAll = function(search, replacement) {
  var target = this
  return target.split(search).join(replacement)
}

export default {
  components: {
    Calculator
  },
  async asyncData({ $axios }) {
    const lastResults = await $axios.$get(
      `https://calculator-625a.restdb.io/rest/calculator`,
      config
    )
    return { lastResults }
  }
}
</script>
