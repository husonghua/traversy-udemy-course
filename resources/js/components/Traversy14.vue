<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <div class="container px-2 w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
        <div class="flex justify-between items-center">
            <h1 class="text-3xl">Memory Cards</h1>
            <button class="border px-2 rounded border-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:shadow-outline" @click="showModal = true">
                <i class="fas fa-plus"></i> Add New Card
            </button>
        </div>
        <div v-if="currentCard">
            <card :currentCard="currentCard"></card>
            <div class="text-center pt-2">
                <button v-if="currentCardIndex != 0" @click="rewind" class="focus:outline-none"> <i class="fas fa-arrow-left"></i> </button>
                <span> {{currentCardIndex + 1}} / {{cards.length}} </span>
                <button v-if="currentCardIndex != cards.length - 1" @click="forward" class="focus:outline-none"> <i class="fas fa-arrow-right"></i> </button>
            </div>
        </div>
    </div>
    <div class="absolute left-0 bottom-0 ml-4 mb-4">
        <button class="border px-2 py-2 rounded border-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:shadow-outline"
        @click="clear">
        <i class="fas fa-trash"></i> Clear Cards
        </button>
    </div>
    <div v-if="showModal" class="absolute w-full h-full top-0 left-0 flex items-center justify-center z-10">
        <div class="absolute w-full h-full bg-gray-200 opacity-100 top-0 left-0">

        </div>
        <div class="absolute w-2/3">
            <div class="flex justify-between items-center">
                <h1 class="text-3xl">Add New Card</h1>
                <button class="border px-2 rounded border-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:shadow-outline" @click="closeModal">
                    X
                </button>
            </div>
            <label class="block mt-2 " for="newQuestion">Question</label>
            <textarea class="w-full px-2 py-1 rounded border border-gray-700" placeholder="Enter question..." v-model.trim="newQuestion"></textarea>
            <label class="block mt-2 " for="newAnswer">Answer</label>
            <textarea class="w-full px-2 py-1 rounded border border-gray-700" placeholder="Enter answer..." v-model.trim="newAnswer"></textarea>
            <button class="border mt-4 px-2 py-1 rounded border-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:shadow-outline" @click="addCard">
                Submit
            </button>
        </div>
    </div>
  </div>
</template>

<script>
import Card from './Traversy14Card';
export default {
    components: {
        Card
    },
    data() {
        return {
            newQuestion: '',
            newAnswer: '',
            showModal: false,
            currentCard: {},
            cards: []
        }
    },
    mounted() {
        this.currentCard = this.cards[0];
    },
    computed: {
        currentCardIndex() {
            return this.cards.indexOf(this.currentCard);
        }
    },
    methods: {
        forward() {
            this.currentCard = this.cards[this.currentCardIndex + 1];
        },
        rewind() {
           this.currentCard = this.cards[this.currentCardIndex - 1];
        },
        clear() {
            this.currentCard = null;
            this.cards = [];
        },
        closeModal() {
            this.showModal = false;
        },
        addCard() {
            if (this.newQuestion !== '' && this.newAnswer !== '') {
                this.cards.push({
                    question: this.newQuestion,
                    answer: this.newAnswer
                })
                this.newAnswer = '';
                this.newQuestion = '';
                this.showModal = false;
                this.currentCard = this.cards[0];
            }
        }

    }
}
</script>

<style>

</style>