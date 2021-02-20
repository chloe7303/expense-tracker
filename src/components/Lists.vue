<template>
  <div id="lists">
    <v-card>
      <v-card-title class="headline pb-0">
        <span class="font-weight-medium pl-2">新增支出</span>
        <v-spacer></v-spacer>
        <v-btn color="black" text dark><v-icon left>mdi-calculator</v-icon>計算機</v-btn>
      </v-card-title>

        <v-form class="pa-2" @submit.prevent="add">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="name"
                  filled
                  rounded
                  dense
                  label="名稱"
                  color="black"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  v-model="expense"
                  filled
                  rounded
                  dense
                  label="金額"
                  type="number"
                  color="black"
                  hide-details
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
              <v-select
                v-model="category"
                :items="items"
                filled
                label="分類"
                dense
                rounded
                color="black"
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="1">
              <v-btn type="submit" class="ma-2" dark color="primary" @click="add">
                <v-icon left dark>mdi-plus</v-icon>新增
              </v-btn>
            </v-col>
            </v-row>
          </v-container>
        </v-form>
    </v-card>
    <div class="d-flex mb-8 pa-2">
      <v-btn text color="error" @click="lists = [];$emit('sendTotal', totalExpense)"><v-icon left>mdi-delete</v-icon>刪除全部</v-btn>
      <v-spacer></v-spacer>
      <h3 class="d-inline pa-1">總花費：${{ totalExpense }}</h3>
    </div>

    <!-- lists -->
    <v-card v-for="(list, idx) in lists" :key="list.name" class="mb-4">
      <v-card-title>
        <v-container class="py-0">
          <v-row>
            <v-col cols=12 md="4"><span>{{ list.name }}</span></v-col>
            <v-col cols=12 md="3"><span class="primary--text font-weight-black">${{ list.expense }}</span></v-col>
            <v-col cols=12 md="3"><span class="subtitle-1">{{ list.category }}</span></v-col>
            <v-col cols=12 md="2"><v-btn color="error" icon @click="del(idx)"><v-icon>mdi-delete</v-icon></v-btn></v-col>
          </v-row>
        </v-container>
        </v-card-title>
      </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    lists: [],
    name: '',
    expense: '',
    category: '',
    items: ['飲食', '交通', '娛樂', '學習', '購物', '投資', '日用品', '其他']
  }),
  computed: {
    totalExpense () {
      let total = 0
      if (this.lists.length > 0) {
        let i = 0
        while (i < this.lists.length) {
          total += this.lists[i].expense
          i++
        }
      }
      return total
    }
  },
  methods: {
    add () {
      if (!this.name || !this.expense || !this.category) return

      this.lists.push({
        name: this.name,
        expense: parseInt(this.expense),
        category: this.category
      })
      this.name = ''
      this.expense = ''
      this.category = ''
      this.$emit('sendTotal', this.totalExpense)
    },
    del (idx) {
      this.lists.splice(idx, 1)
      this.$emit('sendTotal', this.totalExpense)
    }
  }
}
</script>
