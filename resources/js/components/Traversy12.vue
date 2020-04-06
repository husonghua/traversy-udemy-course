<template>
<div>
    <button 
        class="absolute text-black bg-white py-1 px-4 mx-8 my-8 rounded cursor-pointer bottom-0 left-0"
        @click="showSetting = !showSetting"
    >
        <font-awesome-icon :icon="['fas', 'cog']" />
    </button>
    <transition
        enter-active-class="transition-all duration-500 ease-out"
        leave-active-class="transition-all duration-500 ease-in"
        enter-class="opacity-0 scale-70"
        enter-to-class="opacity-100 scale-100"
        leave-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-70" 
    >
    <div v-if="showSetting" class="absolute w-full top-0 text-center z-10 flex justify-center items-center py-4 bg-gray-900 ">
        <label class="font-semibold tracking-wide">Difficulty Level</label>
        <div class="relative ml-2">
            <select 
                class="bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                v-model="level"
                @change="levelChanged"
            >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
        </div>
    </div>
    </transition>

    <div class="flex flex-col items-center justify-center container mx-auto p-8 h-screen">
        <div v-if='playing' class="bg-gray-800 px-16 py-8 rounded shadow-lg text-center">
            <h2 class="text-3xl">👩‍💻 Speed Typer 👨‍💻</h2>
            <div class='flex justify-between py-4'>
                <div>Timer: {{timer}}</div>
                <div>Score: {{score}}</div>
            </div>
            <p class='text-sm italic'>Type the following:</p>
            <h1 class='py-1 text-3xl'>{{selectedWord}}</h1>
            <input
                type="text"
                autocomplete="off"
                placeholder="Type the word here..."
                v-model="typedWord"
                @input="inputChanged"
                class="text-gray-900 py-1 px-2 focus:outline-none focus:shadow-outline rounded-sm"
                autofocus
            />
        </div>
        <div v-else class="bg-gray-800 px-16 py-8 rounded shadow-lg text-center">
            <h2 class="text-3xl">👩‍💻 Time Ran Out 👨‍💻</h2>
            <p class='text-sm italic mt-2'>Your final score is {{this.score}}</p>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                @click="reload">
                Reload
            </button>
        </div>
    </div>

</div>

</template>

<script>
export default {
    data() {
        return {
            showSetting: true,
            level: "easy",
            levelIncrement: {
                'easy': 5,
                'medium': 3,
                'hard': 2
            },
            playing: true,
            typedWord: '',
            selectedWord: '',
            score: 0,
            timer: 0,
            originalTimer: 10,
            words: [
                'sigh',
                'tense',
                'airplane',
                'ball',
                'pies',
                'juice',
                'warlike',
                'bad',
                'north',
                'dependent',
                'steer',
                'silver',
                'highfalutin',
                'superficial',
                'quince',
                'eight',
                'feeble',
                'admit',
                'drag',
                'loving'
            ]
        }
    },
    methods: {
        selectWord() {
            return this.words[Math.floor(Math.random() * this.words.length)];
        },
        inputChanged() {
            if (this.typedWord == this.selectedWord) {
                this.reset();
                this.score++;
                this.timer += this.levelIncrement[this.level];
            }
        },
        reset() {
           this.selectedWord = this.selectWord();
           this.typedWord = '';
        },
        reload() {
            this.timer = this.originalTimer;
            this.reset();
            this.score = 0;
            this.playing = true;
        },
        levelChanged() {
            localStorage.setItem('level', this.level);
        }
    },
    mounted() {
        this.level = localStorage.getItem('level') !== null ? localStorage.getItem('level') : 'medium';
        this.timer = this.originalTimer;
        this.selectedWord = this.selectWord();
        const timeInterval = setInterval(() => {
            this.timer--;
            if (this.timer <= 0) {
                clearInterval(timeInterval);
                this.playing = false;
            }
        }, 1000);
    }
}
</script>

<style>

</style>