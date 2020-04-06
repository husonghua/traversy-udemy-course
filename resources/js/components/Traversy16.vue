<template>
  <div class='main'>
    <h1 class="mt-16 text-4xl">Relaxer</h1>

    <div class="container" id="container">
      <div class="circle"></div>

      <p id="text"></p>

      <div class="pointer-container">
        <span class="pointer"></span>
      </div>

      <div class="gradient-circle"></div>
    </div>
  </div>
</template>

<script>
export default {
    mounted() {
        const container = document.getElementById('container');
        const text = document.getElementById('text');

        const totalTime = 7500;
        const breatheTime = (totalTime / 5) * 2;
        const holdTime = totalTime / 5;

        breathAnimation();

        function breathAnimation() {
            text.innerText = 'Breathe In!';
            container.className = 'container grow';

            setTimeout(() => {
                text.innerText = 'Hold';

                setTimeout(() => {
                text.innerText = 'Breathe Out!';
                container.className = 'container shrink';
                }, holdTime);
            }, breatheTime);
        }

        setInterval(breathAnimation, totalTime);
    }

}
</script>



<style scoped>
* {
  box-sizing: border-box;
}

.main {
  background: #224941 url('/images/bg.jpg') no-repeat center center/cover;
  color: #fff;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  height: 300px;
  width: 300px;
  position: relative;
  transform: scale(1);
}


.circle {
  background-color: #010f1c;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.gradient-circle {
  background: conic-gradient(
    #55b7a4 0%,
    #4ca493 40%,
    #fff 40%,
    #fff 60%,
    #336d62 60%,
    #2a5b52 100%
  );
  height: 320px;
  width: 320px;
  z-index: -2;
  border-radius: 50%;
  position: absolute;
  top: -10px;
  left: -10px;
}


.pointer {
  background-color: #fff;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  display: block;
}

.pointer-container {
  position: absolute;
  top: -40px;
  left: 140px;
  width: 20px;
  height: 190px;
  animation: rotate 7.5s linear forwards infinite;
  transform-origin: bottom center;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.container.grow {
  animation: grow 3s linear forwards;
}

@keyframes grow {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.2);
  }
}

.container.shrink {
  animation: shrink 3s linear forwards;
}

@keyframes shrink {
  from {
    transform: scale(1.2);
  }

  to {
    transform: scale(1);
  }
} 
</style>