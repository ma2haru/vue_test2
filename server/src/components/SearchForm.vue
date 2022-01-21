<template>
  <div id="searchForm">
      <div class="searchRow" style="display:flex;">
        <div id="keyword">
          キーワード:
          <input v-model="keyword" placeholder="キーワード">
        </div>
        <div id="genre">
          ジャンル：
          <select v-model="genreSelected">
            <option value="">選択して下さい</option>
            <option v-for="(genre, index) in genries" :key="index" v-bind:value="genre.code">
                {{ genre.name }}
            </option>
          </select>
        </div>
        <div id="budget">
          予算：
          <select v-model="budgetSelected">
            <option value="">選択して下さい</option>
            <option v-for="(budget, index) in budgets" :key="index" v-bind:value="budget.code">
                {{ budget.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="searchRow" style="display:flex;">
        <div id="largeArea">
          エリア:
          <select v-model="largeAreaSelected" @change="chengeLargeArea(largeAreaSelected)">
            <option value="">選択して下さい</option>
            <option v-for="(largeArea, index) in largeAreas" :key="index" v-bind:value="largeArea.code">
                {{ largeArea.name }}
            </option>
          </select>
        </div>
        <div id="middleArea">
          中エリア：
          <select v-model="middleAreaSelected" :disabled="middleDisabled" @change="chengeMiddleArea(middleAreaSelected)">
            <option value="">選択して下さい</option>
            <option v-for="(middleArea, index) in middleAreas" :key="index" v-bind:value="middleArea.code">
                {{ middleArea.name }}
            </option>
          </select>
        </div>
        <div id="smallArea">
          小エリア：
          <select v-model="smallAreaSelected" :disabled="smallDisabled">
            <option value="">選択して下さい</option>
            <option v-for="(smallArea, index) in smallAreas" :key="index" v-bind:value="smallArea.code">
                {{ smallArea.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="searchRow" style="display:flex;">
        <div id="lunch">
          ランチ:
          <input type="checkbox" v-model="lunch">
        </div>
        <div id="sake">
          酒：
          <input type="checkbox" v-model="sake">
        </div>
        <div id="search">
          <input type="button" value="検索" class="searchBtn" @click="search()">
        </div>
      </div>
  </div>
</template>

<script>
import config from './../config/api.ts'
export default {
  name: 'SearchForm',
  data () {
    return {
      genries: [],
      budgets: [],
      largeAreas: [],
      middleAreas: [],
      smallAreas: [],
      genreSelected: [],
      budgetSelected: [],
      largeAreaSelected: [],
      middleAreaSelected: [],
      middleDisabled: true,
      smallAreaSelected: [],
      smallDisabled: true,
      shops: [],
      searchStr: '',
      keyword: '',
      lunch: false,
      sake: false,
      config: config
    }
  },
  methods: {
    fetchGenre () {
      this.axios
        .get(
          'http://webservice.recruit.co.jp/hotpepper/genre/v1/?key=' + this.config.key + '&format=json'
        )
        .then(response => {
          this.genries = response.data.results.genre
        })
        .catch(e => {
          alert(e)
        })
    },
    fetchBudget () {
      this.axios
        .get(
          'http://webservice.recruit.co.jp/hotpepper/budget/v1/?key=' + this.config.key + '&format=json'
        )
        .then(response => {
          this.budgets = response.data.results.budget
        })
        .catch(e => {
          alert(e)
        })
    },
    fetchLargeArea () {
      this.axios
        .get(
          'http://webservice.recruit.co.jp/hotpepper/large_area/v1/?key=' + this.config.key + '&format=json'
        )
        .then(response => {
          this.largeAreas = response.data.results.large_area
        })
        .catch(e => {
          alert(e)
        })
    },
    fetchMiddleArea (largeAreaCode) {
      this.axios
        .get(
          'http://webservice.recruit.co.jp/hotpepper/middle_area/v1/?key=' + this.config.key + '&large_area=' + largeAreaCode + '&format=json'
        )
        .then(response => {
          this.middleAreas = response.data.results.middle_area
        })
        .catch(e => {
          alert(e)
        })
    },
    fetchSmallArea (middleAreaCode) {
      this.axios
        .get(
          'http://webservice.recruit.co.jp/hotpepper/small_area/v1/?key=' + this.config.key + '&middle_area=' + middleAreaCode + '&format=json'
        )
        .then(response => {
          this.smallAreas = response.data.results.small_area
        })
        .catch(e => {
          alert(e)
        })
    },
    chengeLargeArea (largeAreaCode) {
      if (largeAreaCode !== '') {
        this.middleDisabled = false
        this.fetchMiddleArea(largeAreaCode)
      } else {
        this.middleDisabled = true
        this.middleAreas = []
        this.smallDisabled = true
        this.smallAreas = []
      }
    },
    chengeMiddleArea (middleAreaCode) {
      if (middleAreaCode !== '') {
        this.smallDisabled = false
        this.fetchSmallArea(middleAreaCode)
      } else {
        this.smallDisabled = true
        this.smallAreas = []
      }
    },
    search () {
      this.searchStr = ''
      if (this.keyword !== '') {
        this.searchStr += '&keyword=' + this.keyword
      }
      if (this.genreSelected[0] != null) {
        this.searchStr += '&genre=' + this.genreSelected
      }
      if (this.budgetSelected[0] != null) {
        this.searchStr += '&budget=' + this.budgetSelected
      }
      if (this.largeAreaSelected[0] != null) {
        this.searchStr += '&large_area=' + this.largeAreaSelected
      }
      if (this.middleAreaSelected[0] != null) {
        this.searchStr += '&middle_area=' + this.middleAreaSelected
      }
      if (this.smallAreaSelected[0] != null) {
        this.searchStr += '&small_area=' + this.smallAreaSelected
      }
      if (this.lunch) {
        this.searchStr += '&lunch=1'
      }
      if (this.sake) {
        this.searchStr += '&sake=1'
      }
      this.axios
        .get(
          'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=' + this.config.key + this.searchStr + '&count=100&format=json'
        )
        .then(response => {
          this.shops = response.data.results.shop
          this.$emit('search-result', this.shops)
        })
        .catch(e => {
          alert(e)
        })
    }
  },
  mounted: function () {
    this.fetchGenre()
    this.fetchBudget()
    this.fetchLargeArea()
  }
}
</script>

<style scoped>
#searchForm {
  text-align: center;
  display: inline-block;
  width:90%;
}

.searchRow div {
  width: 30%;
  margin: 10px;
}

.searchBtn {
  display: inline-block;
  border-radius: 5%;
  font-size: 18pt;
  text-align: center;
  cursor: pointer;
  padding: 5px;
  width: 60%;
  background: #99ccff;
  color: #000000;
  line-height: 1em;
  transition: .1s;
}
.searchBtn:hover {
  opacity: 0.8;
}

</style>
