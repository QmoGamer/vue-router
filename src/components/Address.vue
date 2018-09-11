<template>
  <div class="card" style="max-width: 50vw; margin: 12vh auto;">
    <div class="card-header">Select address</div>
    <div class="card-body">   
      <div class="row">
        <div class="form-group col">
          <label>City</label>
          <my-select :options="getCities" :value="cityIndex" v-on:selected="getCity"></my-select>
        </div>
        <div class="form-group col">
          <label>Area</label>
          <my-select :options="getAreas" :value="0" v-on:selected="getArea"></my-select>
        </div>
        <div class="form-group col">
          <label>Zip</label>
          <input class="form-control" disabled :value="zip" />           
        </div>
      </div>
      <div class="row">
        <div class="form-group col">
          <label>Address</label>
          <transition name="in-out-translate-fade" mode="out-in">
            <div class="alert alert-primary" v-if="show" key="1"><strong>{{city}} {{area}} {{zip}}</strong></div>
            <div class="alert alert-primary" v-else key="2"><strong>{{city}} {{area}} {{zip}}</strong></div>
          </transition>
        </div>          
      </div>
    </div>
  </div>  
</template>

<script>
import MySelect from './MySelect.vue'

const cities = [
  {
    name: '基隆市',
    areas: [
      { name: '仁愛區', zip: '200' },
      { name: '信義區', zip: '201' },
      { name: '中正區', zip: '202' },
      { name: '中山區', zip: '203' },
      { name: '安樂區', zip: '204' },
      { name: '暖暖區', zip: '205' },
      { name: '七堵區', zip: '206' },
    ],
  },
  {
    name: '台北市',
    areas: [
      { name: '中正區', zip: '300' },
      { name: '大同區', zip: '301' },
      { name: '中山區', zip: '302' },
      { name: '松山區', zip: '303' },
      { name: '大安區', zip: '304' },
      { name: '萬華區', zip: '305' },
      { name: '信義區', zip: '306' },
      { name: '士林區', zip: '307' },
      { name: '北投區', zip: '308' },
      { name: '內湖區', zip: '309' },
      { name: '南港區', zip: '310' },
      { name: '文山區', zip: '311' },
    ],
  },
  {
    name: '新竹市',
    areas: [
      { name: '新竹市', zip: '400' },
    ],
  },
]

export default {
  name: 'app',
  data() {
    return { 
      cities,
      cityIndex: 0,
      city: '',
      area: '',
      zip: '0',
      show: true
    }
  },
  components: {
    MySelect
  },
  methods: {
    getCity(val) {
      this.cityIndex = val
      this.city = this.cities[val].name      
    },
    getArea(val) {
      this.area = this.cities[this.cityIndex].areas[val].name
      this.zip = this.cities[this.cityIndex].areas[val].zip
    }
  },
  computed: {
    getCities() {
      this.getCity(0)
      return this.cities
    },
    getAreas() {
      this.getArea(0)
      return this.cities[this.cityIndex].areas
    }
  },
  watch: {
    zip: function () {
      this.show = !this.show
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}

.in-out-translate-fade-enter-active, .in-out-translate-fade-leave-active {
  transition: all .4s;
}
.in-out-translate-fade-enter, .in-out-translate-fade-leave-active {
  opacity: 0;
}
.in-out-translate-fade-enter {
  transform: translateX(30px);
}
.in-out-translate-fade-leave-active {
  transform: translateX(-30px);
}
</style>
