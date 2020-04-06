<template>
  <div class='relative bg-blue-500 mb-4 text-white py-4 px-8 rounded-lg' v-if="showPost">
    <div class="absolute bg-gray-700 h-6 w-6 text-center rounded-full top-0 left-0" style="top: -10px;
  left: -10px;">{{post.id}}</div>
    <div class="text-lg font-semibold">{{post.title}}</div>
    <div>{{post.body}}</div>
  </div>
</template>

<script>
export default {
    props: ['post', 'query'],
    computed: {
        showPost() {
            if (this.query === '') return true;
            const query = this.query.toUpperCase();
            const title = this.post.title.toUpperCase();
            const body = this.post.body.toUpperCase();
            if (title.indexOf(query) > -1 || body.indexOf(query) > -1) {
                return true
            } else {
                return false;
            }
        }
    }
}
</script>

<style>

</style>