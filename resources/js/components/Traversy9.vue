<template>
  <div class="mx-auto container px-8 max-w-md">

    <h2 class='text-center py-8 text-3xl'>Expense Tracker</h2>
    <h4 class="uppercase">Your Balance</h4>
    <h1 class='py-2 text-3xl font-bold'>${{balance.toFixed(2)}}</h1>

    <div class="flex justify-around p-4 bg-white shadow-md text-xl">
        <div class='text-center'>
            <h4 class="uppercase">Income</h4>
            <p class="text-green-500">+${{income.toFixed(2)}}</p>
        </div>
        <div class='text-center'>
            <h4 class="uppercase">Expense</h4>
            <p class="text-red-500">${{(-expense).toFixed(2)}}</p>
        </div>
    </div>

    <div v-if="transactions.length">
        <h4 class="text-2xl font-semibold pt-6">History</h4>
        <hr class="border-0 bg-gray-500 text-gray-500 h-px">

        <table class="table-auto w-full border-none">
            <tbody>
                <tr v-for="transaction in transactions" :key="transaction.id">
                    <td class='py-1 px-2 border-l-2' :class="transaction.amount > 0 ? 'border-green-500' : 'border-red-500'">{{transaction.text}}</td>
                    <td class='py-1'>${{transaction.amount.toFixed(2)}}</td>
                    <td class='py-1 text-right'>
                        <button class="text-red-500" @click="remove(transaction.id)">
                            <font-awesome-icon  :icon="['fas', 'times']" flip="horizontal" size="1x" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <h4 class="text-2xl font-semibold mt-10">Add new transaction</h4>
    <form class="w-full my-4" @submit.prevent="add">
        <div class="flex flex-col mb-4">
            <label class="mb-2 font-semibold text-lg text-gray-800" for="text">Text</label>
            <input 
                class="border py-2 px-3 text-grey-darkest" 
                type="text" 
                name="text" 
                placeholder="Enter text..."
                v-model='text'
            >
        </div>
        <div class="flex flex-col mb-4">
            <label class="mb-2 font-semibold text-lg text-gray-800" for="amount">Amount</label>
            <input 
                class="border py-2 px-3 text-grey-darkest" 
                type="number" 
                name="amount" 
                step="any"
                placeholder="Enter amount..."
                v-model.number='amount'
            >
        </div>
        <button class="block w-full bg-purple-600 hover:bg-purple-700 text-white text-lg mx-auto p-2 rounded focus:outline-none" type="submit">Add Transaction</button>
    </form>
</div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
    data() {
        return {
            text: '',
            amount: '',
            transactions: []
        }
    },
    mounted() {
        const storage = localStorage.getItem('transactions');
        if (storage) {
            this.transactions = JSON.parse(storage);
        }
    },
    computed: {
        income() {
            let income_transactions = this.transactions.filter(item => item.amount > 0);
            let total = 0;
            income_transactions.forEach(item => {
                total += item.amount
            })
            return total;
        },
        expense() {
            let expense_transactions = this.transactions.filter(item => item.amount <= 0);
            let total = 0;
            expense_transactions.forEach(item => {
                total += item.amount
            })
            return total;
        },
        balance() {
            return this.income + this.expense;
        }
    },
    methods: {
        add() {
            this.transactions.push({
                id: uuidv4(),
                text: this.text,
                amount: this.amount
            })
            this.text = '';
            this.amount = '';
            this.updateStorage();
        },
        remove(id) {
            this.transactions.forEach((item, index) => {
                if (id === item.id) {
                    this.transactions.splice(index, 1);
                }
            });
            this.updateStorage();

        },
        updateStorage() {
            localStorage.setItem('transactions', JSON.stringify(this.transactions));
        }
    }
}
</script>

<style>

</style>