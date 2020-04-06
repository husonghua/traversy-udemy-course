<template>
  <div class="container flex flex-col items-center justify-start mx-auto">
    <h1 class="my-10 text-3xl font-bold">10 Richest People</h1>
    <p>Drag and drop the items into their corresponding spots</p>
    <div class="mt-10">
      <div v-for="(person, index) in displayedList" :key="index" class="flex w-64" >
        <div class="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-gray-500 border border-gray-400">
          <p class="text-2xl text-center">{{index + 1}}</p>
        </div> 
        <traversy-19-item :index="index" :person="person" v-on:dropped="dropped($event)" v-on:started="started($event)" :correct="checkOrder(index)"></traversy-19-item>
      </div>
    </div>
  </div>
 
</template>

<script>
import Traversy19Item from './Traversy19Item';

export default {
  components: {
    'traversy-19-item': Traversy19Item
  },
  data() {
    return {
      richestPeople: [
        'Jeff Bezos',
        'Bill Gates',
        'Warren Buffett',
        'Bernard Arnault',
        'Carlos Slim Helu',
        'Amancio Ortega',
        'Larry Ellison',
        'Mark Zuckerberg',
        'Michael Bloomberg',
        'Larry Page'
      ],
      displayedList: [],
      start: 0
    }
  },
  methods: {
    randomizedList() {
      return [...this.richestPeople].sort(() => Math.random() - 0.5);
    },
    dropped(endPosition) {
      this.displayedList.splice(endPosition, 0, this.displayedList.splice(this.start, 1)[0]);
    },
    started(startPosition) {
      this.start = startPosition;
    },
    checkOrder(index) {
      return this.richestPeople[index] === this.displayedList[index];
    }
  },
  mounted() {
    this.displayedList = this.randomizedList();
  }
  
}
</script>

<style>

</style>