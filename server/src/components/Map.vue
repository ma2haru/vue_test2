<template>
  <div id="map">
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  name: 'Map',
  mounted () {
    this.map = L.map('map')
    this.map.setView(this.latlng, this.scale)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map)
  },
  data () {
    return {
      latlng: [],
      scale: 16
    }
  }
}
</script>
