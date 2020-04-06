<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
      <div class="flex items-center mb-8">
        <label>Pick a movie:</label>
        <div class="relative ml-4">
            <select 
                v-model="selectedMovieId"
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            >
            <option v-for="(movie) in movies" :key="movie.id" :value="movie.id">{{movie.title}}</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
      </div>

    <div class="flex">
      <div class="flex items-center mr-8">
        <div class="h-3 w-4 bg-gray-400 rounded-t-full mr-2"></div>
        <div>Available</div>
      </div>
      <div class="flex items-center mr-8">
        <div class="h-3 w-4 bg-blue-400 rounded-t-full mr-2"></div>
        <div>Selected</div>
      </div>
      <div class="flex items-center">
        <div class="h-3 w-4 bg-red-400 rounded-t-full mr-2"></div>
        <div>Occupied</div>
      </div>
    </div>

    <div class="w-64 h-32 bg-white my-8">Screen</div>
    <div class="flex ml-2">
        <div 
          @click='select(seat.id)'
          v-for="seat in seats" 
          :key="seat.id" 
          class="h-3 w-4 bg-white rounded-t-full mr-2"
          :class="[
            seat.available ? 'bg-gray-400 cursor-pointer' : 'bg-red-400', 
            selectedSeatIds.includes(seat.id) ? 'bg-blue-400' : '',
            seat.col == 3 || seat.col == 8 ? 'ml-4' : '',
          ]"
        >
        </div>
    </div>
    <div class="mt-8">
        You have selected {{selectedSeatIds.length}} seats for a price of ${{totalCost}}
    </div>
    <button type="submit" @click="purchase" class=" my-4 p-1 text-white w-64 bg-purple-500 rounded-sm hover:bg-purple-600 disabled:cursor-not-allowed" :disabled="!selectedSeatIds.length">Purchase</button>
    
  </div>
</template>

<script>
export default {
    data() {
        return {
            movies: [
              {id: 1, title: "Avengers: Endgame ($10)", price: 10},
              {id: 2, title: "Joker ($12)", price: 12},
              {id: 3, title: "Toy Story 4 ($8)", price: 8},
              {id: 4, title: "The Lion King ($9)", price: 9},
            ],
            selectedMovieId: null,
            seats: [
              {id: 1, row: 1, col: 1, available: true},
              {id: 2, row: 1, col: 2, available: true},
              {id: 3, row: 1, col: 3, available: true},
              {id: 4, row: 1, col: 4, available: true},
              {id: 5, row: 1, col: 5, available: false},
              {id: 6, row: 1, col: 6, available: true},
              {id: 7, row: 1, col: 7, available: false},
              {id: 8, row: 1, col: 8, available: true},
              {id: 9, row: 1, col: 9, available: true},
            ],
            selectedSeatIds: [] 
        }
    },
    computed: {
      selectedMovie() {
        return this.movies.find((movie) => movie.id === this.selectedMovieId );
      },
      totalCost() {
        if (this.selectedMovie) {
          return this.selectedMovie.price * this.selectedSeatIds.length;
        }
      }
    },
    mounted() {
      console.log(this.totalCost);
      let storedMovieId = localStorage.getItem('selectedMovieId');
      let selectedSeatIds = localStorage.getItem('selectedSeatIds');
      if (storedMovieId === null || storedMovieId == 'undefined') {
         this.selectedMovieId = this.movies[0].id;
      } else {
        this.selectedMovieId = +storedMovieId
      }
      if (selectedSeatIds) {
        this.selectedSeatIds = JSON.parse(selectedSeatIds);
      }      
    },
    watch: {
      selectedMovieId: function (val) {
        localStorage.setItem('selectedMovieId', val);
      },
    },
    methods: {
      select(id) {
        const seat = this.seats.find((seat) => seat.id === id);
        if (seat && seat.available) {
          let index = this.selectedSeatIds.indexOf(id);
          if (index == -1) {
            this.selectedSeatIds.push(id);
          } else {
            this.selectedSeatIds.splice(index, 1);
          }
          localStorage.setItem('selectedSeatIds', JSON.stringify(this.selectedSeatIds));
        }
      },
      purchase() {
        alert('puchased!');
        this.selectedSeatIds = [];
        this.selectedMovieId = 1;
        localStorage.removeItem('selectedSeatIds');
        localStorage.removeItem('selectedMovieId');

      }
    }
}
</script>

<style>

</style>