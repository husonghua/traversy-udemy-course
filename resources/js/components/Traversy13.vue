<template>
    <div class="container mx-auto px-6">
      <h1 class='text-center text-3xl my-8 font-semibold'>Speech Text Reader</h1>
      <div class="text-center">
        <button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mb-6 focus:outline-none"
            @click="showModal = true">
            Toggle Text Box
        </button>
      </div>
      <div v-if="showModal" class="modal absolute w-full h-full top-0 left-0 flex items-center justify-center z-10">
        <div class="absolute w-full h-full bg-black opacity-25 top-0 left-0" @click="closeModal"></div>
            <div class="absolute w-2/3 bg-gray-800 rounded-lg shadow-lg p-4 text-white">
                <div class="flex justify-between items-center">
                    <h3 class="font-semibold" >Choose Voice</h3>
                    <button>
                        <font-awesome-icon :icon="['fas', 'times']" class="text-white" size="1x" @click="closeModal"/>
                    </button>
                </div>
                <div class="py-4">
                    <select v-model="selectedVoice" class="w-full bg-orange-500 border border-orange-500 text-white py-4 px-4 rounded leading-tight focus:outline-none" >
                    <option v-for="(voice, index) in voices" :key="index" :value="voice.name">{{voice.name}} {{voice.lang}}</option>
                    </select>
                </div>
 
                <textarea 
                    placeholder="Enter text to read..."
                    class="w-full p-2 rounded text-gray-900" 
                    v-model="freeText"
                >
                </textarea>
                <div class="pt-4">
                    <button class="w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-2 rounded focus:outline-none"
                        @click="speak(freeText)">
                        Read Text
                    </button>
                </div>
                
        </div>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 col-gap-4">
          <div v-for="(image, index) in images" :key="index" class="transform rounded-sm overflow-hidden cursor-pointer hover:shadow-outline mb-4" @click="speak(image.text)">
            <img :src="image.image" :alt="image.text" class="w-full h-48 content-center object-cover overflow-hidden">
            <div class="bg-orange-500 py-1">
                <p class="text-center text-white">{{image.text}}</p>
            </div>
          </div>
       </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showModal: false,
            freeText: '',
            voices: [],
            selectedVoice: 'Alex',
            images: [{
                image: '/images/13/drink.jpg',
                text: "I'm Thirsty"
            },
            {
                image: './images/13/food.jpg',
                text: "I'm Hungry"
            },
            {
                image: './images/13/tired.jpg',
                text: "I'm Tired"
            },
            {
                image: './images/13/hurt.jpg',
                text: "I'm Hurt"
            },
            {
                image: './images/13/happy.jpg',
                text: "I'm Happy"
            },
            {
                image: './images/13/angry.jpg',
                text: "I'm Angry"
            },
            {
                image: './images/13/sad.jpg',
                text: "I'm Sad"
            },
            {
                image: './images/13/scared.jpg',
                text: "I'm Scared"
            },
            {
                image: './images/13/outside.jpg',
                text: 'I Want To Go Outside'
            },
            {
                image: './images/13/home.jpg',
                text: 'I Want To Go Home'
            },
            {
                image: './images/13/school.jpg',
                text: 'I Want To Go To School'
            },
            {
                image: './images/13/grandma.jpg',
                text: 'I Want To Go To Grandmas'
            }]
        }
    },
    mounted() {
        speechSynthesis.addEventListener('voiceschanged', this.setVoices);
    },
    methods: {
        setVoices() {
            this.voices = speechSynthesis.getVoices();
        },
        speak(message) {
            const utterance = new SpeechSynthesisUtterance();
            utterance.text = message;
            utterance.voice = this.voices.find(voice => voice.name == this.selectedVoice);
            speechSynthesis.speak(utterance);
        },
        closeModal() {
            this.showModal = false;
            this.freeText = '';
        }
    }

}
</script>

<style>

</style>