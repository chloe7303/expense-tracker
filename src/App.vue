<template>
  <v-app>
    <v-main>
      <v-container class="mt-6">
        <v-row>
          <v-col cols="12" sm="3">
            <div class="text-center">
              <v-progress-circular
                :rotate="-90"
                :size="150"
                :width="20"
                :value="progress"
                color="secondary"
                class="mb-4"
              >
                <h2>{{ progress }}%</h2>
              </v-progress-circular>
              <h1>${{ balance }}</h1>
              <h4>剩餘金額</h4>
              <v-divider class="ma-6"></v-divider>
              <h4>預算金額：
                <v-chip color="primary" class="px-4" @click:close="chip1 = false">
                <div v-if="!isEdit" class="d-flex align-center">
                  <h3 class="d-inline">${{ budget }}</h3>
                  <v-btn dark small icon @click="isEdit = true"><v-icon button small>mdi-pencil</v-icon></v-btn>
                </div>
                <div v-else class="d-flex align-center">
                  <v-text-field type="number" class="pb-2" dense hide-details v-model="newBudget" dark style="width:80px;"></v-text-field>
                  <v-btn dark small icon @click="budget = newBudget;isEdit = false;"><v-icon small>mdi-check-bold</v-icon></v-btn>
                </div>
              </v-chip>
              </h4>
            </div>
          </v-col>

          <v-col cols="12" sm="9">
            <Lists @sendTotal="handleTotal"/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Lists from './components/Lists'
export default {
  name: 'App',

  components: {
    Lists
  },

  data: () => ({
    totalExpense: 0,
    budget: 5000,
    newBudget: null,
    isEdit: false
  }),
  computed: {
    balance () {
      return this.budget - this.totalExpense
    },
    progress () {
      return Math.round(this.balance / this.budget * 100)
    }
  },
  methods: {
    saveBudget () {
      this.isEdit = false
    },
    handleTotal (value) {
      this.totalExpense = value
    }
  }
}
</script>

<style scoped>
* {
  font-family: arial, 'Microsoft JhengHei', '微軟正黑體', sans-serif
}

#app {
  background-color: #f7ede2;
}
</style>
