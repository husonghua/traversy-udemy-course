<template>
    <div class="container mx-auto">
        <h1 class='text-center text-3xl'>DOM Array Methods</h1>
        <div class='flex'>
            <aside class='flex flex-col w-1/4 pr-4 border-r-2 items-center'>
                <button id="add-user" class="text-white py-1 bg-teal-500 hover:bg-teal-600 rounded-lg font-bold focus:outline-none w-64 mb-3" @click="addUser">Add User 👱‍♂️</button>
                <button id="double" class="text-white py-1 bg-teal-500 hover:bg-teal-600 rounded-lg font-bold focus:outline-none w-64 mb-3" @click="doubleMoney">Double Money 💰</button>
                <button id="show-millionaires" class="text-white py-1 bg-teal-500 hover:bg-teal-600 rounded-lg font-bold focus:outline-none w-64 mb-3" @click="onlyMil">Show Only Millionaires 💵</button>
                <button id="sort" class="text-white py-1 bg-teal-500 hover:bg-teal-600 rounded-lg font-bold focus:outline-none w-64 mb-3" @click="sortWealth">Sort by Richest ↓</button>
           </aside>
            <div class="mx-4 w-3/4">
                <div class='flex justify-between'>
                    <div class="text-2xl font-bold">Person</div>
                    <div class="text-2xl font-semibold">Wealth</div>
                </div>
                <div class="border-b-2"></div>
                <div v-for="(user, index) in users" :key="index">
                    <div class='flex justify-between mb-2'>
                        <div>{{user.name}}</div>
                        <div>{{formatMoney(user.wealth)}}</div>
                    </div>
                </div>
                <div class="border-t-2"></div>
                <div class='flex justify-between'>
                    <div class="text-2xl font-bold">Summary</div>
                    <div class="text-2xl font-semibold">{{formatMoney(sumWealth)}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                users: [],
            }
        },
        computed: {
            sumWealth() {
                return this.users.reduce((total, user) => { return total + user.wealth }, 0);
            }
        },
        mounted() {
            this.getRandomPerson(5);
        },
        methods: {
            getRandomPerson(num) {
                axios.get('https://randomuser.me/api/?results=' + num)
                    .then(res => res.data.results)
                    .then(data => {
                        data.forEach(user => {
                            this.users.push({
                                name: `${user.name.first} ${user.name.last}`,
                                wealth: Math.floor(Math.random() * 1000000)
                            })
                        })
                    })
            },
            formatMoney(num) {
                return '$' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            },
            addUser() {
                this.getRandomPerson(1);
            },
            doubleMoney() {
                this.users.forEach(user => {
                    user.wealth = user.wealth * 2;
                });
            },
            onlyMil() {
                this.users = this.users.filter(user => {
                    return user.wealth > 1000000;
                });
            },
            sortWealth() {
                this.users = this.users.sort((a, b) => b.wealth - a.wealth)
            }
        }
    }
</script>
