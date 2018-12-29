<template>
  <div id="calculator">
    <div class="screen-container">
      <div class="result">
        <transition name="slide-fade">
          <div
            v-if="tempResult !== ''"
            v-cloak
            :style="{fontSize : fontSize + 'px'}"
            class="number">{{ tempResult | number | hugeNumber }}</div>
        </transition>
      </div>
      <div class="calculation">
        <div
          v-cloak
          class="number">{{ calculation | number | calculation }}</div>
      </div>
    </div>
    <div class="btn-container">
      <div class="oper-container">
        <div
          id="clear"
          class="btn"
          @click="clear()">
          <div class="number">AC</div>
        </div>
        <div
          class="btn operations divide"
          @click="append('/')">
          <div class="number">÷</div>
        </div>
        <div
          class="btn operations multiplication"
          @click="append('*')">
          <div class="number">×</div>
        </div>
        <div
          class="btn operations plus"
          @click="append('+')">
          <div class="number">+</div>
        </div>
        <div
          class="btn operations less"
          @click="append('-')">
          <div class="number">-</div>
        </div>
      </div>

      <div class="row">
        <div
          class="btn"
          @click="append('7')">
          <div class="number">7</div>
        </div>
        <div
          class="btn"
          @click="append('8')">
          <div class="number">8</div>
        </div>
        <div
          class="btn"
          @click="append('9')">
          <div class="number">9</div>
        </div>
        <!-- 				<div class="btn" @click="append('/')">÷</div> -->
      </div>
      <div class="row">
        <div
          class="btn"
          @click="append('4')">
          <div class="number">4</div>
        </div>
        <div
          class="btn"
          @click="append('5')">
          <div class="number">5</div>
        </div>
        <div
          class="btn"
          @click="append('6')">
          <div class="number">6</div>
        </div>
        <!-- 				<div class="btn" @click="append('*')">×</div> -->

      </div>
      <div class="row">
        <div
          class="btn"
          @click="append('1')">
          <div class="number">1</div>
        </div>
        <div
          class="btn"
          @click="append('2')">
          <div class="number">2</div>
        </div>
        <div
          class="btn"
          @click="append('3')">
          <div class="number">3</div>
        </div>
        <!-- 				<div class="btn" @click="append('-')">-</div> -->
      </div>
      <div class="row">
        <div
          id="dot"
          class="btn"
          @click="append('.')">
          <div class="number">.</div>
        </div>
        <div
          class="btn"
          @click="append('0')">
          <div class="number">0</div>
        </div>
        <div class="btn">
          <div class="number" />
        </div>
        <div
          id="result"
          class="btn"
          @click="getResult()">
          <div class="number">=</div>
        </div>
        <!-- 				<div class="btn" @click="append('+')">+</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import restdbconfig from '../restdbconfig.js'

String.prototype.replaceAll = function(search, replacement) {
  var target = this
  return target.split(search).join(replacement)
}

export default {
  filters: {
    hugeNumber: value => {
      let parts = value.toString().split('.')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      return parts.join('.')
    },
    number: value => {
      return value.replaceAll('*', 'x')
    },
    calculation: value => {
      return value
        .replaceAll('x', ' x ')
        .replaceAll('/', ' / ')
        .replaceAll('+', ' + ')
        .replaceAll('-', ' - ')
    }
  },
  data() {
    return {
      // calculation:'15*98',
      // tempResult:'1470',
      calculation: '',
      tempResult: ''
    }
  },
  computed: {
    result() {
      if (!isNaN(this.calculation.slice(-1))) return eval(this.calculation)
      else return eval(this.calculation.slice(0, -1))
    },
    fontSize() {
      return 50 - this.tempResult.length * 1.25
    }
  },
  watch: {
    calculation() {
      if (
        this.calculation !== '' &&
        !isNaN(this.calculation.slice(-1)) &&
        this.calculation != this.result
      ) {
        this.tempResult = this.result.toString()
      }
    }
  },
  mounted() {
    let btns = document.querySelectorAll('.btn')
    for (let btn of btns) {
      btn.addEventListener('click', function() {
        this.classList.add('animate')
        this.classList.add('resetappearanim')
      })
      btn.addEventListener('animationend', function() {
        this.classList.remove('animate')
      })
    }
  },
  methods: {
    append(value) {
      this.calculation += value.toString()
    },
    clear() {
      this.calculation = ''
      this.tempResult = ''
    },
    getResult() {
      if (this.tempResult != '') {
        this.postResult()
        this.calculation = this.tempResult
        //this.tempResult = ''
      }
    },
    backspace() {
      this.calculation = this.calculation.slice(0, -1)
    },
    postResult() {
      axios
        .post(
          `https://calculator-625a.restdb.io/rest/calculator`,
          {
            calculation: this.calculation + ' = ' + this.tempResult,
            date: new Date(),
            _mock: true
          },
          restdbconfig
        )
        .then(response => {
          this.$parent._data.lastResults.push(response.data)
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
