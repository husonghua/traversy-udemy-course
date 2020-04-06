<template>
<div class='main'>
  <h1 class="text-3xl">Music Player</h1>

    <div class="music-container" id="music-container" :class="{'play': playing}">
      <div class="music-info">
        <h4 id="title">{{this.song}}</h4>
        <div class="progress-container" id="progress-container" >
          <div class="progress" id="progress" v-bind:style="{width: progress + '%'}"></div>
        </div>
      </div>

      <audio :src="audio" id="audio"></audio>

      <div class="img-container">
        <img :src="cover" alt="music-cover" id="cover" />
      </div>
      <div class="navigation">
        <button id="prev" class="action-btn">
          <i class="fas fa-backward" @click="prev"></i>
        </button>
        <button id="play" class="action-btn action-btn-big">
          <i class="fas fa-play" v-if="!playing" @click="play"></i>
          <i class="fas fa-pause" v-if="playing" @click="pause"></i>
        </button>
        <button id="next" class="action-btn">
          <i class="fas fa-forward" @click="next"></i>
        </button>
      </div>
    </div>

</div>

</template>

<script>
export default {
    data() {
        return {
            songs:  ['hey', 'summer', 'ukulele'],
            index: 1,
            playing: false,
            audioElement: null,
            progress: 0,
            progressContainer: null
        }
    },
    computed: {
      song() {
        return this.songs[this.index];
      },
      audio() {
        return `music/${this.song}.mp3`;
      },
      cover() {
        return `images/${this.song}.jpg`;
      },
    },
    mounted() {
      this.audioElement = document.getElementById('audio');
      this.audioElement.addEventListener('timeupdate', this.updateProgress);
      this.progressContainer = document.getElementById('progress-container');
      this.progressContainer.addEventListener('click', this.setProgress);
    },
    methods: {
      play() {
        this.audioElement.play();
        this.playing = true;
      },
      pause() {
        this.audioElement.pause();
        this.playing = false;
      },
      next() {
        this.index++;
        if (this.index >= this.songs.length) {
          this.index = 0;
        }

        this.playing= false;

      },
      prev() {
        this.index--;
        if (this.index < 0) {
          this.index = this.songs.length - 1;
        }
        this.playing= false;

      },
      updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        this.progress = currentTime / duration * 100;
      },
      setProgress(e) {
        const width = this.progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = this.audioElement.duration;
        this.audioElement.currentTime = (clickX / width) * duration;
      }
    }
}
</script>

<style scoped>
.main {
  background-image: linear-gradient(
    0deg,
    rgba(247, 247, 247, 1) 23.8%,
    rgba(252, 221, 221, 1) 92%
  );
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
}

.music-container {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 20px 20px 0 rgba(252, 169, 169, 0.6);
  display: flex;
  padding: 20px 30px;
  position: relative;
  margin: 100px 0;
  z-index: 10;
}

.img-container {
  position: relative;
  width: 110px;
}

.img-container::after {
  content: '';
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  width: 20px;
  height: 20px;
  transform: translate(-50%, 0%);
}

.img-container img {
  border-radius: 50%;
  object-fit: cover;
  height: 110px;
  width: inherit;
  position: absolute;
  bottom: 0;
  left: 0;
  animation: rotate 3s linear infinite;

  animation-play-state: paused;
}

.music-container.play .img-container img {
  animation-play-state: running;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.action-btn {
  background-color: #fff;
  border: 0;
  color: #dfdbdf;
  font-size: 20px;
  cursor: pointer;
  padding: 10px;
  margin: 0 20px;
}

.action-btn.action-btn-big {
  color: #cdc2d0;
  font-size: 30px;
}

.action-btn:focus {
  outline: 0;
}

.music-info {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 15px 15px 0 0;
  position: absolute;
  top: 0;
  left: 20px;
  width: calc(100% - 40px);
  padding: 10px 10px 10px 150px;
  opacity: 0;
  transform: translateY(0%);
  transition: transform 0.3s ease-in, opacity 0.3s ease-in;
  z-index: 0;
}

.music-container.play .music-info {
  opacity: 1;
  transform: translateY(-100%);
}

.music-info h4 {
  margin: 0;
}

.progress-container {
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
  height: 4px;
  width: 100%;
}

.progress {
  background-color: #fe8daa;
  border-radius: 5px;
  height: 100%;
  transition: width 0.1s linear;
} 
</style>