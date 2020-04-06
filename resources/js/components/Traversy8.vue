<template>
  <div class="bg-gray-100 min-h-screen">
      <div class="container mx-auto">
        <h1 class='text-center text-4xl py-4'>Meal Finder</h1>
        <div class="flex justify-center">
          <form class="flex">
              <input 
                class="bg-gray-100 border border-gray-200 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-200 w-64 rounded-l-lg" 
                type="text" 
                placeholder="Search for meals or keywords"
                v-model="query"
              >
            <button class="py-2 px-4 border-gray-200 bg-purple-400 rounded-r-lg focus:outline-none hover:bg-purple-500 text-white" @click.prevent="search()">
              <font-awesome-icon :icon="['fas', 'search']" flip="horizontal" size="1x" />
            </button>

            <button class="ml-2 py-2 px-4 border bg-purple-400 rounded-lg focus:outline-none hover:border-purple-200 hover:bg-purple-500 text-white" @click.prevent="random()">
              <font-awesome-icon :icon="['fas', 'random']" flip="horizontal" size="1x" />
            </button>
          </form>
        </div>

        <div v-if="meals.length > 1">
          <h1 class='text-center text-xl p-4'>Search Result for '{{query}}'</h1>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-4">
            <div v-for="(meal, index) in meals" :key="index">
              <a href="#" @click.prevent="getMeal(meal.idMeal)">
                 <img :src="meal['strMealThumb']" alt="">
              </a>
              <h3 class='text-center py-2'>{{meal['strMeal']}}</h3>
            </div>
          </div>
        </div>
        <div v-if="meals.length == 1">
          <traversy-8-single-meal :meal="meals[0]"/>
        </div>
    </div>
  </div>

</template>

<script>
import Traversy8SingleMeal from './Traversy8SingleMeal';

export default {
  components: {
    'traversy-8-single-meal': Traversy8SingleMeal
  },
  data() {
    return {
      query: '',
      meals: [],
    }
  },
  methods: {
    search() {
      axios.get(`https://cors-anywhere.herokuapp.com/https://www.themealdb.com/api/json/v1/1/search.php?s=${this.query}`)
        .then(res => {
          this.meals = res.data.meals;
        })
    },
    random() {
      axios.get(`https://cors-anywhere.herokuapp.com/https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => {
          this.meals = res.data.meals;
        })
        this.query = '';
    }, 
    getMeal(id) {
      axios.get(`https://cors-anywhere.herokuapp.com/https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}
`)
        .then(res => {
          this.meals = res.data.meals;
        })
    }, 
  },
}
</script>

<style>

</style>