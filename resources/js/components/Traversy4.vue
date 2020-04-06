<template>
    <div class="flex flex-col items-center container mx-auto p-8">
        <div class='mt-8'>
            <img src="images/money.png" alt="" class="w-48 h-48" />
        </div>
        <h1 class='text-4xl text-green-700 font-semibold my-4'>Exchange Rate Calculator</h1>
        <p class="text-sm mb-4">Choose the currency and the amounts to get the exchange rate</p>

        <div class="flex justify-between w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mt-8">
            <div class="relative ml-4">
                <select 
                    class="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    @change="getExchangeRate()"
                    v-model='currencyOne'
                >
                <option value="CNY">CNY</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>

            <input v-model.number="amountOne" class="w-24 text-right text-lg px-2"/>
        </div>

        <div class="flex justify-between w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mt-8">
            <button 
            class="ml-6 bg-green-700 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
            @click="swap">
                Swap
            </button>
            <div>Exchange Rate: {{this.currentExchangeRate}}</div>
        </div>

        <div class="flex justify-between w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mt-8">
            <div class="relative ml-4">
                <select 
                    class="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                    v-model='currencyTwo'
                >
                <option value="CNY">CNY</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>

            <input v-model.number="amountTwo" class="w-24 text-right text-lg px-2"/>
        </div>
    
    </div>
</template>

<script>
export default {
    data() {
        return {
            currencyOne: 'USD',
            currencyTwo: 'EUR',
            exchangeRate: {},
            currentExchangeRate: null,
            amountOne: 1,
        }
    },
    computed: {
        amountTwo() {
            return this.exchangeRate[this.currencyTwo] * this.amountOne;
        }
    },
    methods: {
        getExchangeRate() {
            axios.get(`https://cors-anywhere.herokuapp.com/https://api.exchangerate-api.com/v4/latest/${this.currencyOne}`)
                .then(res => res.data.rates)
                .then(rates => {
                    this.exchangeRate = rates;
                    this.currentExchangeRate = rates[this.currencyTwo]
                });
        },
        swap() {
            let swap = this.currencyOne;
            this.currencyOne = this.currencyTwo;
            this.currencyTwo = swap;
            this.getExchangeRate();
        }
    },
    mounted() {
        this.getExchangeRate();

    }
}
</script>

<style>

</style>
