<template>
  <div class="flex items-center justify-center min-h-screen">
    <div v-if="submitted"> Thanks for the submission!</div>
    <form v-if="!submitted" class="bg-white shadow-lg px-8 py-4" @submit.prevent="submit">
    <h2 class="text-center py-4 px-12 text-2xl">Register With Us</h2>

    <div class="mt-2">
        <label class="block text-sm" for="username">Username</label>
        <input 
            type="text" 
            placeholder="Enter username" 
            class="border border-gray-200 w-full rounded-sm py-1 px-2 my-1 focus:outline-none focus:shadow-outline focus:bg-gray-200 hover:bg-gray-200"
            v-model.trim="username"
        />
        <div class="text-red-500 text-xs" v-if="usernameError">{{usernameError}}</div>
    </div>
    <div class="mt-2">
        <label class="block text-sm" for="email">Email</label>
        <input 
            type="text" 
            placeholder="Enter email" 
            class="border border-gray-200 w-full rounded-sm py-1 px-2 my-1 focus:outline-none focus:shadow-outline focus:bg-gray-200 hover:bg-gray-200"
            v-model.trim='email'
        />
        <div class="text-red-500 text-xs" v-if="emailError">{{emailError}}</div>
    </div>
    <div class="mt-2">
        <label class="block text-sm" for="password">Password</label>
        <input 
            type="password" 
            placeholder="Enter password" 
            class="border border-gray-200 w-full rounded-sm py-1 px-2 my-1 focus:outline-none focus:shadow-outline focus:bg-gray-200 hover:bg-gray-200"
            v-model.trim='password'
        />
        <div class="text-red-500 text-xs" v-if="passwordError">{{passwordError}}</div>
    </div>
    <div class="mt-2">
        <label class="block text-sm" for="password2">Confirm Password</label>
        <input
            type="password"
            placeholder="Enter password again"
            class="border border-gray-200 w-full rounded-sm py-1 px-2 my-1 focus:outline-none focus:shadow-outline focus:bg-gray-200 hover:bg-gray-200"
            v-model.trim='password2'
        />
        <div class="text-red-500 text-xs" v-if="password2Error">{{password2Error}}</div>
    </div>
    <button type="submit" class="my-4 p-1 text-white block w-full bg-purple-500 rounded-sm hover:bg-purple-600 ">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            password2: '',
            usernameError: '',
            emailError: '',
            passwordError: '',
            password2Error: '',
            submitted: false
        }
    },
    methods: {
        submit() {
            this.reset();
            this.checkRequired();
            this.checkUsernameLength();
            this.checkPasswordeLength();
            this.checkEmailFormat();
            this.checkPasswordMatch();
            this.submitForm();
        },
        reset() {
            this.usernameError = ''
            this.emailError = ''
            this.passwordError = ''
            this.password2Error = ''
        },
        checkRequired() {
            if (this.username === '') {
                this.usernameError = 'Username is required'
            }

            if (this.email === '') {
                this.emailError = 'Email is required'
            }

            if (this.password === '') {
                this.passwordError = 'Password is required'
            }

            if (this.password2 === '') {
                this.password2Error = 'Password Confirmation is required'
            }
        },
        checkUsernameLength() {
            if (this.username.length < 3) {
                this.usernameError = "Username must be at least 3 characters"
            }
            if (this.username.length > 15) {
                this.usernameError = "Username must be at most 15 characters"
            }
        },
        checkPasswordeLength() {
            if (this.password.length < 6) {
                this.passwordError = "Password must be at least 6 characters"
            }
            if (this.password.length > 25) {
                this.passwordError = "Password must be at most 25 characters"
            }
        },
        checkEmailFormat() {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(this.email)) {
                this.emailError = 'Email is not valid'
            }            
        },
        checkPasswordMatch() {
            if (this.password !== this.password2) {
                this.password2Error = 'Password must match'
            }       
        },
        submitForm() {
            if (!this.usernameError && !this.emailError && !this.passwordError && !this.password2Error) {
                this.submitted = true;
            }
        }
    },


}
</script>

<style>

</style>