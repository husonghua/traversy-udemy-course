<template>
  <div class='flex flex-col items-center justify-start h-screen antialiased text-white' style="background-image: url('/images/20/bg.jpg')">
  <div class="mt-16">
    <img src="images/20/mic.png" alt="Speak" />
  </div>

    <h1 class="mt-8 text-3xl font-semibold">Guess a Number Between 1 - 100</h1>

    <h3 class="mt-4 text-xl">Speak the number into your microphone</h3>

    <div v-if="result" class="flex flex-col items-center mt-8">
      <div class="text-xl">
        You said:
      </div>
      <div class="max-w-md p-4 mt-8 text-3xl border border-gray-200">
        {{result}}
      </div>
      <div class="my-8 text-xl">
        {{message}}
      </div>
      <div v-if="won">
        <button class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          @click="replay">
          Play Again
        </button>
      </div>
      
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      randomNumber: null,
      result: '',
      won: true
    }
  },
  mounted() {
    this.randomNumber = this.getRandomNumber();
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new window.SpeechRecognition();
    recognition.start();
    recognition.addEventListener('result', this.onSpeak);
    recognition.addEventListener('end', () => recognition.start());
  },
  methods: {
    getRandomNumber() {
      return Math.floor(Math.random() * 100) + 1;

    },
    replay() {
      window.location.reload()
    },
    onSpeak(e) {
      this.result = e.results[0][0].transcript;
      const num = +this.result;
      if (Number.isNaN(num)) {
        this.message = "This is not a valid number";
        return;
      } 
      if (num > 100 || num < 1) {
        this.message = "Number must be between 1 and 100";
        return;
      }
      if (num == this.randomNumber) {
        this.message = `Congrats! You have guessed the number! It was ${num}`;
        this.won = true;
      } else if (num > this.randomNumber) {
        this.message = 'GO LOWER';
      } else {
        this.message = 'GO HIGHER';
      }
    }
  }
}
</script>

<style scoped>


</style>