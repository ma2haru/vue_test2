<template>
  <div id="shopDetail">
    <div id="contents">
      <div class="top">
        <div>
          <img :src="shop.photo.pc.l">
        </div>
        <div class="info">
          <div class="kana">
            {{ shop.name_kana }}
          </div>
          <div class="name">
            {{ shop.name }}
          </div>

          <div class="address">
            {{ shop.address }}
          </div>
        </div>
      </div>
      <div class="catch">
        <span class="catch_text">
        {{ shop.catch }}
        </span>
      </div>
      <div class="tag">
        <div>{{ shop.genre.name }}</div>
        <div>{{ shop.station_name }}</div>
        <div>{{ shop.budget.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopDetail',
  data () {
    return {
      shop: []
    }
  },
  methods: {
    fetchData () {
      this.axios
        .get(
          'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=69aa75b2c091aee7&id=' + this.$route.params.shopId + '&format=json',
          {headers: this.headers}
        )
        .then(response => {
          this.shop = response.data.results.shop[0]
        })
        .catch(e => {
          alert(e)
        })
    }
  },
  mounted: function () {
    this.fetchData()
  }
}
</script>

<style scoped>
#shopDetail {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#contents {
  display: inline-block;
  width: 80%;
}

.top {
  display: flex;
}

.info {
  padding: 20px;
}

.kana {
  font-size: 1em;
  overflow-wrap: break-word;
  min-width: 70%;
  max-width: 70%;
  text-align: left;
}

.name {
  font-size: 2em;
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
  font-size: 1.5em;
}

.address {
  margin-top: 20px;
  font-size: 1.5em;
  text-align: left;
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
