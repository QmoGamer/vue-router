<template>
	<div class="card" style="max-width: 50vw; margin: 12vh auto;">
		<div class="card-header">Select address</div>
		<div class="card-body">
		<div class="row">
			<div class="form-group col">
			<label>City</label>
			<my-select :options="getCities" v-on:selected="getCity"></my-select>
			</div>
			<div class="form-group col">
			<label>Area</label>
			<my-select :options="getAreas" v-on:selected="getArea"></my-select>
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
import axios from 'axios'

export default {
	name: 'app',
    data() {
      return {
        cities: [],
        city: '',
        areas: [],
        area: '',
        zip: '0',
        show: true
      }
	},
	components: {
    MySelect
	},
	created() {
    axios
      .get('/api/answer')
      .then(res => {
        this.cities = res.data
        this.areas = this.cities[0].areas
        this.zip = this.areas[0].zip

        this.city = this.cities[0].name
        this.area = this.areas[0].name
      })
	},
	methods: {
    getCity(val) {  
      this.areas = this.cities[val].areas      
      this.zip = this.areas[0].zip

      this.city = this.cities[val].name
      this.area = this.areas[0].name
    },
    getArea(val) {
      this.zip = this.areas[val].zip

      this.area = this.areas[val].name
    }
	},
	computed: {
    getCities() {
      return this.cities
    },
    getAreas() {
      return this.areas
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
