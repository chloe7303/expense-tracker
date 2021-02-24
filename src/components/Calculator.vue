<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="300"
      transition="dialog-top-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          @click="display = ''"
          color="black"
          text
          dark
        >
        <v-icon left>mdi-calculator</v-icon>計算機
        </v-btn>
      </template>

      <v-card class="wrapper">
        <div class="display">{{ display || '0' }}</div>
        <div @click="reset">AC</div>
        <div @click="sign">+/-</div>
        <div @click="percent">%</div>
        <div @click="divide">÷</div>
        <div @click="append('7')">7</div>
        <div @click="append('8')">8</div>
        <div @click="append('9')">9</div>
        <div @click="times">×</div>
        <div @click="append('4')">4</div>
        <div @click="append('5')">5</div>
        <div @click="append('6')">6</div>
        <div @click="minus">-</div>
        <div @click="append('1')">1</div>
        <div @click="append('2')">2</div>
        <div @click="append('3')">3</div>
        <div @click="plus">+</div>
        <div @click="append('0')" class="zero">0</div>
        <div @click="dot('.')">.</div>
        <div @click="equal">=</div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    display: '',
    previous: '',
    // 運算 function
    operation: null,
    // 是否按了運算子
    isOperate: false
  }),
  methods: {
    append (text) {
      // 避免數字前面出現 0 (有小數點除外)
      if (this.display.charAt(0) === '0' && this.display.indexOf('.') === -1) {
        this.display = ''
      }
      if (this.isOperate) {
        this.display = ''
        this.isOperate = false
      }
      this.display = `${this.display}${text}`
    },
    reset () {
      this.display = ''
    },
    sign () {
      // if (this.display.indexOf('-') === -1) {
      //   this.display = `-${this.display}`
      // } else if (this.display.indexOf('-') === 0) {
      //   this.display = this.display.slice(1)
      // }
      this.display = this.display.charAt(0) === '-' ? this.display.slice(1) : `-${this.display}`
    },
    percent () {
      this.display = `${Number(this.display) / 100}`
    },
    dot (text) {
      // 未找到該值則回傳 -1
      if (this.display.indexOf('.') === -1) {
        this.display = `${this.display || 0}${text}`
      }
    },
    setOperate () {
      this.previous = this.display
      this.isOperate = true
    },
    divide () {
      this.operation = (pre, cur) => pre / cur
      this.setOperate()
    },
    times () {
      this.operation = (pre, cur) => pre * cur
      this.setOperate()
    },
    minus () {
      this.operation = (pre, cur) => pre - cur
      this.setOperate()
    },
    plus () {
      this.operation = (pre, cur) => pre + cur
      this.setOperate()
    },
    equal () {
      this.display = `${this.operation(Number(this.previous), Number(this.display))}`
      this.previous = null
      this.isOperate = true
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 300px;
  display: grid;
  /* 一塊重複四次 */
  grid-template-columns: repeat(4, 1fr);
  /* 最小575px 最大auto */
  grid-auto-rows: minmax(60px, auto);
  font-size: 30px;
  text-align: center;
}

.wrapper div:not(.display) {
  border: 1px solid #999;
  line-height: 60px;
  background-color: #f7ede2;
  cursor: pointer;
  &:hover {
    background-color: #e6dbd0;
  }
}

.wrapper div:nth-child(4n+1):not(.display),
.wrapper div:last-child
{
  background-color: #f6bd60;
  color: #fff;
  font-size: 35px;
  &:hover {
    background-color: #e7b15a;
  }
}

.display {
  /* 1開始 5結束 */
  grid-column: 1 / 5;
  height: 75px;
  background-color: #222;
  color: #fff;
  font-size: 50px;
  text-align: right;
  padding-right: 20px;
}

.zero {
  grid-column: 1 / 3;
}
</style>
