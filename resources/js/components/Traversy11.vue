<template>
  <div class='container mx-auto max-w-md mt-6'>
    <h1 class="text-center text-3xl mb-3">My Blog</h1>
    <div class="text-center mb-6">
        <input 
            class="bg-white border border-gray-200 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-200 w-full rounded-lg" 
            type="text" 
            placeholder="Filter posts..."
            v-model="query"
        >
    </div>
    <traversy-11-post v-for="post in posts" :key="post.id" :post="post" :query="query">
    </traversy-11-post>
    <div class='flex justify-end text-gray-700' v-if="loader">
        <svg xmlns="http://www.w3.org/2000/svg" class="fill-current"><circle cx="15" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"/><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"/></circle><circle cx="60" cy="15" r="9" fill-opacity=".3"><animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite"/><animate attributeName="fill-opacity" from=".5" to=".5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite"/></circle><circle cx="105" cy="15" r="15"><animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"/><animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"/></circle></svg>
    </div>
  </div>
</template>

<script>
import Traversy11Post from './Traversy11Post';

export default {
    components: {
        'traversy-11-post': Traversy11Post
    },
    data() {
        return {
            query: '',
            loader: true, 
            page: 1,
            posts: [],
        }
    }, 
    mounted() {
        this.loadPosts();
        window.addEventListener('scroll', () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 5) {
                this.loader = true;
                this.loadPosts();
            }
        })
    },
    methods: {
        loadPosts() {
            axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${this.page}`)
                .then(res => res.data)
                .then(data => {
                    data.forEach(element => {
                        element.show = true;
                        this.posts.push(element)
                    });
                    this.filteredPosts = this.posts;
                })
            this.page++;
            this.loader = false;
        },
    }
    
}
</script>

<style>

</style>