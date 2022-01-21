<template>
  <div id="shopList">
    <searchForm v-on:search-result="searchResult"/>
      <table id="shopTable">
        <tbody>
          <div class="row" v-for="(item, index) in shops" :key="index" @click="linkToDetail( item.id )">
            <div style="display:flex;">
              <div>
                <img :src="item.logo_image">
              </div>
              <div style="width: 100%;">
              <tr>
                <td colspan="2" style="width:65%">
                  <div class="kana">
                    {{ item.name_kana }}
                  </div>
                  <div class="name">
                    {{ item.name }}
                  </div>
                </td>
                <td class="tag" colspan="1">
                  <div>{{ item.genre.name }}</div>
                  <div>{{ item.station_name }}</div>
                  <div>{{ item.budget.name }}</div>
                </td>
              </tr>
              <tr>
                <td class="address" colspan="3">{{ item.address }}</td>
              </tr>
              </div>
            </div>
            <div class="catch">
              <span class="catch_text">
              {{ item.catch }}
              </span>
            </div>
          </div>
        </tbody>
      </table>
  </div>
</template>

<script>
import SearchForm from './SearchForm'
import config from './../config/api.ts'
export default {
  name: 'ShopList',
  components: {
    SearchForm
  },
  data () {
    return {
      shops: [],
      config: config
    }
  },
  methods: {
    initDisplay () {
      this.axios
        .get(
          'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=' + this.config.key + '&large_area=Z011&count=100&format=json'
        )
        .then(response => {
          this.shops = response.data.results.shop
        })
        .catch(e => {
          alert(e)
        })
    },
    linkToDetail (id) {
      this.$router.push({ path: '/shop/' + id })
    },
    searchResult (shops) {
      this.shops = shops
    }
  },
  mounted: function () {
    this.initDisplay()
  }
}
</script>

<style scoped>
#shopList {
  text-align: center;
}

#shopTable {
  display: inline-block;
  width: 80%;
}

#shopTable tr {
  min-width: 100%;
}

.row {
  border: 1px solid #000000;
  margin: 10px 0px;
}

.row:hover {
  background-color: #e9ffd0;
}

.logo {
  width: 200px;
}

.logo img {
  width: 150px;
}

.kana {
  font-size: 0.5em;
  overflow-wrap: break-word;
  min-width: 70%;
  max-width: 70%;
  text-align: left;
}

.name {
  text-align: left;
}

.tag {
  display: flex;
}

.tag div {
  margin: 0px 5px;
  background-color: #e63720;
  color: #FFFFFF;
  border-radius: 5px;
  padding: 2px 5px;
}

.address {
  text-align: left;
  font-size: 0.8em;
}

.catch {
  text-align: center;
  overflow:hidden;
}

.catch_text {
  display: inline-block;
  color: orangered;
  /* white-space: nowrap; */
  animation: text_scroll 3s infinite ease-in-out;
  /* padding-left:100%; */
}

@keyframes text_scroll{
   0% { transform: translate(0, -3px)}
   50% { transform: translate(0, 3px)}
   100% { transform: translate(0, -3px)}
}
</style>
