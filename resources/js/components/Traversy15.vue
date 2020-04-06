<template>
  <div>         
    <header class="w-full h-64">
      <div class="flex flex-col items-center">
          <h1 class="mt-16 text-4xl font-bold text-center text-white">Lyrics Search</h1>
          <div class="relative w-2/3 mt-8">
            <input
              type="text"
              placeholder="Enter artist or song name..." 
              class='block w-full px-6 py-3 text-lg rounded-full focus:outline-none'
              v-model="term"
            />
            <button class="absolute inset-y-0 right-0 flex items-center px-8 my-1 mr-1 tracking-wider text-white bg-purple-500 rounded-full focus:outline-none hover:bg-purple-700"
              @click="search"
            >
            Search
            </button>
          </div>
      </div>
    </header>
    <div class="container max-w-lg mx-auto mt-8 text-center">
      <p v-if="!songs.length">Results will be displayed here</p>
      <div v-else-if="lyrics">
        <pre>{{this.lyrics}}</pre>
      </div>
      <div v-else>
        <div v-for="(song, index) in songs" :key="index" class='flex justify-between pb-2'>
          <div><span class="font-semibold">{{song.artist.name}}</span> - {{song.title}}</div>
          <div>
              <button 
                class="px-4 py-1 mx-2 tracking-wider text-white bg-purple-500 rounded-full focus:outline-none hover:bg-purple-700" 
                @click="getLyrics(song.artist.name, song.title)">Lyrics
              </button>
          </div>
        </div>
        <div class="flex items-center justify-center">
          <div v-if="prev">
              <button 
                class="px-4 py-1 mx-2 tracking-wider text-white bg-purple-500 rounded-full focus:outline-none hover:bg-purple-700" 
                @click="proceed(prev)">Prev
              </button>
          </div>
           <div v-if="next">
              <button 
                class="px-4 py-1 mx-2 tracking-wider text-white bg-purple-500 rounded-full focus:outline-none hover:bg-purple-700" 
                @click="proceed(next)">Next
              </button>
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
      term: '',
      songs: [],
      total: 0,
      next: '',
      lyrics: ''
    }
  },
  methods: {
    search() {
      if (this.term !== '') {
        this.getData(`https://api.lyrics.ovh/suggest/${this.term}`)
      }
    },
    proceed(url) {
      this.getData(`https://cors-anywhere.herokuapp.com/${url}`)
    },
    getData(url) {
      this.lyrics = '';
      axios.get(url)
        .then(res => {
          this.songs = res.data.data;
          this.next = res.data.next;
          this.prev = res.data.prev;
          this.total = res.data.total;
        })
    },
    getLyrics(artist, song) {
      axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
        .then(res => {
          this.lyrics = res.data.lyrics;
        })
        .catch(res => {
          this.lyrics = 'We cannot find the lyrics for this song.';
        })
    },
  }
}
</script>

<style scoped>

header {
  background-image: url('https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

header::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 16rem;
  background-color: rgba(0, 0, 0, 0.4);
}
header * {
  z-index: 1;
}
</style>