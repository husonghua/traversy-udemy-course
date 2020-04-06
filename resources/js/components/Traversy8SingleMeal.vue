<template>
    <div class='my-8 text-center flex justify-center'>
        <div class="max-w-lg rounded overflow-hidden shadow-lg">
            <img :src="meal['strMealThumb']" alt="image">
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{{meal.strMeal}}</div>
                <div class="px-6 py-4">
                    <span 
                        v-for="(ingredient, index) in ingredients" :key="index"
                        class="inline-block bg-gray-200 rounded-full px-2 py-1 my-1 font-semibold text-gray-700 mr-2 text-xs"
                    >
                    {{ingredient}}
                    </span>
                </div>
                <p class="text-gray-700 text-sm text-left">
                    {{meal.strInstructions}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['meal'],
    computed: {
        ingredients() {
            let ingredients = [];
            for (let i = 1; i <= 20; i++) {
                if (this.meal[`strIngredient${i}`]) {
                    ingredients.push(
                        `${this.meal[`strIngredient${i}`]} - ${this.meal[`strMeasure${i}`]}`
                    );
                } else {
                    break;
                }
            }
            return ingredients;
        }
    }
}
</script>

<style>

</style>