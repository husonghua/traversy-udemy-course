<template>
  <div class='container max-w-xl px-8 mx-auto mt-6 mb-16'>
    <h1 class="mb-3 text-3xl text-center">Overview</h1>
    <div class="mb-6 text-left">
        This website is based on Traversy Media's "20+ Web Projects With Vanilla JavaScript" Udemy course. 
    </div>
        <div class="mb-2 text-left">
        The original course uses vanilla CSS and JavaScript. See the referenced links below.
    </div>
    <div>
        <a href="https://www.udemy.com/course/web-projects-with-vanilla-javascript/" class='text-blue-500'>Udemy Course Link</a>
    </div>
    <div>
        <a href="https://vanillawebprojects.com/" class='text-blue-500'>Live Memo By Traversy Media</a>
    </div>
    <div class="mt-6 mb-3 text-left">
        This site takes on the same 20 exercises using Tailwind CSS, VueJS and PHP Laravel Framework. See the referenced Github repo below. 
    </div>
      <div>
        <a href="https://github.com/husonghua/traversy-udemy-course" class='text-blue-500'>My Github Repo</a>
    </div>
    <div class="w-full mt-8">
      <table class="w-full table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2">#</th>
            <th class="px-4 py-2">Practice</th>
            <th class="px-4 py-2">Live Demo</th>
          </tr>
        </thead>
      <tbody>
        <tr v-for="(practice, index) in practices" :key="index">
          <td class="px-4 py-2 text-center border">{{practice.id}}</td>
          <td class="px-4 py-2 text-center border">{{practice.title}}</td>
          <td class="px-4 py-2 text-center border">
            <a :href="practice.id" class='text-blue-500'>Live Demo</a>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      practices: [
        { id: 1, title: "Form Validator" },
        { id: 2, title: "Movie Seat Booking" },
        { id: 3, title: "Custom Video Player" },
        { id: 4, title: "Exchange Rate Calculator" },
        { id: 5, title: "DOM Array Methods Project" },
        { id: 6, title: "Menu Slider & Modal" },
        { id: 7, title: "Hangman Game" },
        { id: 8, title: "Mealfinder App" },
        { id: 9, title: "Expense Tracker	" },
        { id: 10, title: "Music Player" },
        { id: 11, title: "Infinite Scrolling" },
        { id: 12, title: "Typing Game" },
        { id: 13, title: "Speech Text Reader" },
        { id: 14, title: "Memory Cards" },
        { id: 15, title: "LyricsSearch App" },
        { id: 16, title: "Relaxer App" },
        { id: 17, title: "Breakout Game	" },
        { id: 18, title: "New Year Countdown" },
        { id: 19, title: "Sortable List" },
        { id: 20, title: "Speak Number Guessing Game" },
      ]
    }
  }
}
</script>

<style>

</style>