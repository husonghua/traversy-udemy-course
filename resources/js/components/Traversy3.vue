<template>
    <div class="flex flex-col items-center justify-center min-h-screen">
        <video class="w-3/4 md:w-1/2 bg-gray-500 cursor-pointer"
            :src="video.src"
            :poster="video.poster"
            id='video'
            @click='toggle'
            >
        </video>
        <div class="md:w-1/2 bg-gray-800 flex items-center">
            <font-awesome-icon v-if="!playing" :icon="['fas', 'play']" size="3x" class="text-green-400 p-2 cursor-pointer" @click='play'/>
            <font-awesome-icon v-if="playing" :icon="['fas', 'pause']" size="3x" class="text-orange-400 p-2 cursor-pointer" @click='pause'/>
            <font-awesome-icon :icon="['fas', 'stop']" size="3x" class="text-red-400 p-2 cursor-pointer" @click='stop'/>
            <input
                type="range"
                class="w-full mx-2"
                min="0"
                max="100"
                v-model="progress"
                @change="change"
            />
            <span class="text-white mx-2">{{currentTime}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            video: {
                id: 1,
                src: "videos/gone.mp4",
                poster: "images/poster.png" 
            },
            videoElement: null,
            playing: false,
            progress: 0,
            currentTime: "00:00",
        }
    },
    mounted() {
        this.videoElement = document.getElementById('video');
        this.videoElement.addEventListener('timeupdate', this.timeUpdate);
    },
    methods: {
        play() {
            this.videoElement.play();
            this.playing = true;
        },
        stop() {
            this.videoElement.pause();
            this.videoElement.currentTime = 0;
            this.playing = false;
            this.progress = 0;
        },
        pause() {
            this.videoElement.pause();
            this.playing = false;
        },
        toggle() {
            if (this.playing) {
                this.pause()
            } else (
                this.play()
            )
        },
        timeUpdate() {
            this.progress = (this.videoElement.currentTime / this.videoElement.duration) * 100;
            let mins = Math.floor(video.currentTime / 60);
            if (mins < 10) {
                mins = '0' + String(mins);
            }

            let secs = Math.floor(video.currentTime % 60);
            if (secs < 10) {
                secs = '0' + String(secs);
            }
            this.currentTime = `${mins}:${secs}`;
            if (this.progress == 100) {
                this.videoElement.pause();
                this.progress = 0;
                this.playing = false;
            }
        },
        change() {
            this.videoElement.currentTime = (this.videoElement.duration * this.progress / 100);
        }
    }
}
</script>

<style>

</style>