<template>
<div class='relative content-center w-full h-screen overflow-hidden antialiased bg-center main' style="background-image: url('https://images.unsplash.com/photo-1467810563316-b5476525c0f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80')">
  <div class='absolute z-10 flex flex-col items-center justify-center w-full h-screen text-white'>
    <h1 class="text-4xl lg:text-6xl">New Year Countdown</h1>
    <div class="flex justify-between w-full max-w-lg mt-8">
      <div class="text-lg text-center lg:text-2xl">
        <h2>{{diff.d}}</h2>
        <p>days</p>
      </div>
      <div class="text-lg text-center lg:text-2xl">
        <h2>{{diff.h}}</h2>
        <p>hours</p>
      </div>
      <div class="text-lg text-center lg:text-2xl">
        <h2>{{diff.m}}</h2>
        <p>minutes</p>
      </div>
      <div class="text-lg text-center lg:text-2xl">
        <h2>{{diff.s}}</h2>
        <p>seconds</p>
      </div>
    </div>
    <h1 class="mt-16 text-gray-700" style="font-size: 12rem">{{this.currentYear + 1}}</h1>
  </div>
</div>

</template>

<script>
export default {
    data() {
        return {
            currentTime: new Date(),
            diff: {}
        }
    },
    computed: {
        currentYear() {
            return this.currentTime.getFullYear();
        },

        newYearTime() {
            return new Date(`January 01 ${this.currentYear + 1} 00:00:00`);
        }
        
    },
    mounted() {
        this.updateCountdown();
        setInterval(this.updateCountdown, 1000);
    },
    methods: {
        updateCountdown() {
            this.currentTime = new Date();
            const diff = this.newYearTime - this.currentTime;
            const d = Math.floor(diff / 1000 / 60 / 60 / 24);
            const h = Math.floor(diff / 1000 / 60 / 60) % 24;
            const m = Math.floor(diff / 1000 / 60) % 60;
            const s = Math.floor(diff / 1000) % 60;
            this.diff = { d,h,m,s }
        }
    }
}
</script>

<style scoped>
.main::after {
  z-index: 5;
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

</style>