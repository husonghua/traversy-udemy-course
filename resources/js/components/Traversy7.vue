<template>
<div class="flex flex-col h-screen my-auto items-center bg-gray-700 text-white justify-between">
    <div class="flex flex-col items-center text-center">
        <h1 class="text-4xl font-bold my-4">Hangman</h1>
        <p>Find the hidden word - Enter a letter</p>
        <div class="mt-10 content-center">
            <svg height="250" width="200" class="figure-container">
                <!-- Rod -->
                <line x1="60" y1="20" x2="140" y2="20" />
                <line x1="140" y1="20" x2="140" y2="50" />
                <line x1="60" y1="20" x2="60" y2="230" />
                <line x1="20" y1="230" x2="100" y2="230" />

                <!-- Head -->
                <circle cx="140" cy="70" r="20" v-if="wrongLetters.length >= 1" />
                <!-- Body -->
                <line x1="140" y1="90" x2="140" y2="150" v-if="wrongLetters.length >= 2"  />
                <!-- Arms -->
                <line x1="140" y1="120" x2="120" y2="100" v-if="wrongLetters.length >= 3"  />
                <line x1="140" y1="120" x2="160" y2="100" v-if="wrongLetters.length >= 4"  />
                <!-- Legs -->
                <line x1="140" y1="150" x2="120" y2="180" v-if="wrongLetters.length >= 5"  />
                <line x1="140" y1="150" x2="160" y2="180" v-if="wrongLetters.length >= 6"  />
            </svg>
            <div class='flex content-left'>
                <span v-for='(letter, index) in wipWordArray' :key="index" class='border-b border-blue-500 mx-1 w-6 h-8 text-center text-xl'>
                    {{letter}}
                </span>
            </div>
            <div class='pt-6 text-left mx-1' v-if='wrongLetters.length'>
                <h3 class='text-lg'>Wrong Letters:</h3>
                <p>{{wrongLetters.join(', ')}}</p>
            </div>
        </div>
    </div>
    

    <transition name="slide-up">
        <div v-if='warning' class='bg-blue-400 p-2 m-2 rounded-sm'>
            <p>{{warning}}</p>
        </div>
    </transition>
     <div v-if="message" class="modal absolute w-full h-full top-0 left-0 flex items-center justify-center z-10">
        <div class="absolute w-full h-full bg-black opacity-25 top-0 left-0"></div>
        <div class="absolute bg-white rounded-sm shadow-lg text-black w-64 text-center">
            <h3 class='py-8 text-3xl'>{{message}}</h3>
            <button class='mb-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' @click="reset()">Play Again</button>
        </div>
    </div>
</div>

</template>

<script>
export default {
    data() {
        return {
            words: ['application', 'information', 'hello', 'ninja'],
            currentWord: '',
            correctLetters: [],
            wrongLetters: [],
            warning: '',
            message: '',
        }
    },
    computed: {
        allLetters() {
            return this.correctLetters.concat(this.wrongLetters);
        },
        wipWordArray() {
            let arr = [];
            this.currentWord.split('').forEach(c => {
                if (this.correctLetters.includes(c)) {
                    arr.push(c);
                } else {
                    arr.push('');
                }
            });
            return arr;
        },
        win() {
            if (this.wipWordArray.join('') === this.currentWord) {
                this.message = 'You Win!'
            }
        },
        lose() {
            if (this.wrongLetters.length >= 6) {
                this.message = 'You Lose!'
            }
        }
    },
    mounted() {
        this.selectWord();
        window.addEventListener("keydown", (e) => {
            if (e.keyCode >= 65 && e.keyCode <= 90) {
                this.process(e.key);
            } else {
                this.showToast('Please use lower case letters only in this game');
            }
        })
    },
    methods: {
        process(key) {
            if (this.allLetters.includes(key)) {
                this.showToast('You have guessed this letter. Please try another');
            } else {
                if (this.currentWord.includes(key)) {
                    this.correctLetters.push(key);
                } else {
                    this.wrongLetters.push(key);
                }
            }
        }, 
        selectWord() {
            this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
        },
        showToast(message) {
            this.warning = message;
            setTimeout(() => {
                this.warning = '';
            }, 1000);
        },
        reset() {
            this.selectWord();
            this.correctLetters = [];
            this.wrongLetters =[];
            this.warning = '';
            this.message = '';
        }
    }

}
</script>

<style scoped>

.figure-container {
  fill: transparent;
  stroke: white;
  stroke-width: 5px;
  stroke-linecap: round;
}

.slide-up-enter-active {
  transition: all .2s ease;
}
.slide-up-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-up-enter, .slide-fade-leave-to {
  opacity: 0;
}

</style>