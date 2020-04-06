<template>
<div>
    <nav :class="showNav ? 'navbar-open' : 'navbar-close'"
      class="navbar w-64 absolute overflow-x-scroll bg-gray-700 top-0 h-screen z-10">
      <div class="flex justify-end">
        <button @click="tog()" class="p-2 text-white text-xl font-bold focus:outline-none">
            <font-awesome-icon  :icon="['fas', 'times']" flip="horizontal" size="1x" />
        </button>
      </div>

      <div class="flex justify-center">
        <img src="https://randomuser.me/api/portraits/men/76.jpg" alt="user" class="rounded-full"/>
      </div>
      <h1 class="text-xl text-center font-bold text-white pt-3">Menu</h1>
      <ul class="list-none text-white text-center">
        <li class="my-8"><a href="#">Home</a></li>
        <li class="my-8"><a href="#">Portfolio</a></li>
        <li class="my-8"><a href="#">Blog</a></li>
        <li class="my-8"><a href="#">Contact Me</a></li>
      </ul>
    </nav>
    <div :class="showNav ? 'bg-gray-200 opacity-25':'opacity-100'" class="h-screen">
        <div class="bg-purple-700">
            <div class="container mx-auto text-white px-4">
                <button @click="tog()" class="text-white text-left text-2xl p-2 font-bold focus:outline-none">
                    <font-awesome-icon :icon="['fas', 'bars']" flip="horizontal" size="1x" />
                </button>
                <h1 class="text-6xl text-center">My Landing Page</h1>
                <p class="text-center py-6 font-semibold">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, amet!
                </p>
                <div class="text-center pb-16">
                    <button class="bg-pink-600 hover:bg-pink-400 text-white font-bold py-2 px-4 rounded cursor-pointer focus:outline-none" @click="modal()">
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    <div class="container mx-auto px-4">
      <h2 class="text-3xl py-4">What is this landing page about?</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia iure
        accusamus ab consectetur eos provident ipsa est perferendis architecto.
        Provident, quaerat asperiores. Quo esse minus repellat sapiente, impedit
        obcaecati necessitatibus.
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente optio
        officia ipsa. Cum dignissimos possimus et non provident facilis saepe!
      </p>

      <h2 class="text-3xl py-4">Tell Me More</h2>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat eaque
        delectus explicabo qui reprehenderit? Aspernatur ad similique minima
        accusamus maiores accusantium libero autem iusto reiciendis ullam
        impedit esse quibusdam, deleniti laudantium rerum beatae, deserunt nemo
        neque, obcaecati exercitationem sit. Earum.
      </p>

      <h2 class="text-3xl py-4">Benefits</h2>
      <ul class='mb-4'>
        <li class="list-disc list-inside">Lifetime Access</li>
        <li class="list-disc list-inside">30 Day Money Back</li>
        <li class="list-disc list-inside">Tailored Customer Support</li>
      </ul>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse quam
        nostrum, fugiat, itaque natus officia laborum dolorum id accusantium
        culpa architecto tenetur fuga? Consequatur provident rerum eius ratione
        dolor officiis doloremque minima optio dignissimos doloribus odio
        debitis vero cumque itaque excepturi a neque, expedita nulla earum
        accusamus repellat adipisci veritatis quam. Ipsum fugiat iusto pariatur
        consectetur quas libero dolor dolores dolorem, nostrum ducimus
        doloremque placeat accusamus iste, culpa quaerat consequatur?
      </p>
    </div>
    <div v-if="showModal" class="modal absolute w-full h-full top-0 left-0 flex items-center justify-center z-10">
        <div class="absolute w-full h-full bg-black opacity-25 top-0 left-0"></div>
        <div class="absolute w-1/2 h-32 bg-white rounded-sm shadow-lg">
            <div class='flex justify-between bg-gray-600 items-center text-white'>
                <h3 class="text-2xl px-4 py-2">Sign Up</h3>
                <button class="text-2xl px-4 py-2 focus:outline-none" @click="showModal = false">
                    <font-awesome-icon :icon="['fas', 'times-circle']" flip="horizontal" size="1x" />
                </button>
            </div>
            <div>
                 <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                      Username
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
                  </div>
                  <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                      Password
                    </label>
                    <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
                    <p class="text-red-500 text-xs italic">Please choose a password.</p>
                  </div>
                  <div class="flex items-center justify-between">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                      Sign In
                    </button>
                    <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                      Forgot Password?
                    </a>
                  </div>
                </form>
            </div>
        </div>
    </div>
</div>

</div>

</template>

<script>
    export default {
        data() {
            return {
                showNav: false,
                showModal:false
            }
        },
        methods: {
            tog() {
                this.showNav = !this.showNav;
            },
            modal() {
                this.showModal = !this.showModal;
            }
        }
    }
</script>

<style scoped>
.navbar {
  transition: all 330ms ease-out;
}

.navbar-open {
  transform: translateX(0%);
}
.navbar-close {
  transform: translateX(-100%);
}

</style>
