<template>
    <div class="relative mt-8 border h-64 text-center border-gray-500 bg-gray-200">
        <div class="pt-4 text-3xl" v-if="!answer">Question</div>
        <div class="pt-4 text-3xl" v-if="answer">Answer</div>
        <div class="pt-12 text-lg" v-if="!answer">{{currentCard.question}}</div>
        <div class="pt-12 text-lg" v-if="answer">{{currentCard.answer}}</div>
        <div class="absolute right-0 top-0 mr-4 mt-4"> 
            <button class="border px-2 rounded border-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:shadow-outline"
                @click="answer = !answer">
                <i class="fas fa-sync"></i> flip
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['currentCard'],
    data() {
        return {
            answer: false
        }
    }
}
</script>

<style>

</style>