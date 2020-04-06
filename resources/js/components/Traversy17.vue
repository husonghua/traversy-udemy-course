<template>
  <div class="relative flex flex-col items-center justify-center w-full h-screen text-white bg-blue-500">
    <transition name="slide-fade">
      <div class="absolute top-0 left-0 z-10 h-full max-w-xs pl-4 font-semibold bg-gray-900" v-if="showModal">
        <h2 class="my-8 text-2xl">How To Play:</h2>
        <p class="mb-4">
          Use your right and left keys to move the paddle to bounce the ball up
          and break the blocks.
        </p>
        <p class="mb-4">
          If you miss the ball, your score and the blocks will reset.</p>
        <button class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" @click="showModal = false">
          Close
        </button>
      </div>
    </transition>
    <button class="absolute top-0 left-0 px-4 py-2 m-4 font-bold text-white bg-gray-900 rounded z-1 hover:bg-gray-700" @click="showModal = true">
      Show Rules
    </button>

    <h1 class="my-8 text-4xl">Breakout!</h1>
    <canvas class="bg-white" id="canvas" width="800" height="600"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      ctx: null,
      score: 0,
      brickRowCount: 9,
      brickColumnCount: 5,
      bricks: [],
      ball: null,
      paddle: null,
      speed: 4
    }
  },
  mounted() {
    this.initialize();
    this.draw();
    this.update();
    document.addEventListener('keydown', this.keyDown);
    document.addEventListener('keyup', this.keyUp);
  },
  methods: {
    movePaddle() {
      this.paddle.x += this.paddle.dx;
      if (this.paddle.x + this.paddle.w > canvas.width) {
        this.paddle.x = canvas.width - this.paddle.w;
      }
      if (this.paddle.x < 0) {
        this.paddle.x = 0;
      }
    },
    moveBall() {
      this.ball.x += this.ball.dx;
      this.ball.y += this.ball.dy;

      if (this.ball.x + this.ball.size > canvas.width || this.ball.x - this.ball.size < 0) {
        this.ball.dx *= -1;
      }
      if (this.ball.y + this.ball.size > canvas.height || this.ball.y - this.ball.size < 0) {
        this.ball.dy *= -1;
      }
      if (
        this.ball.x - this.ball.size > this.paddle.x &&
        this.ball.x + this.ball.size < this.paddle.x + this.paddle.w &&
        this.ball.y + this.ball.size > this.paddle.y
      ) {
        this.ball.dy = -this.ball.speed;
      }
      this.bricks.forEach(column => {
        column.forEach(brick => {
          if (brick.visible) {
            if (
              this.ball.x - this.ball.size > brick.x && 
              this.ball.x + this.ball.size < brick.x + brick.w && 
              this.ball.y + this.ball.size > brick.y && 
              this.ball.y - this.ball.size < brick.y + brick.h 
            ) {
              this.ball.dy *= -1;
              brick.visible = false;
              this.incrementScore();
            }
          }
        });
      });
      if (this.ball.y + this.ball.size > canvas.height) {
        alert('you lost. Please try again');
        this.score = 0;
        this.initialize();
        this.draw();
      }
    },
    incrementScore() {
      this.score += 1;
      if (this.score >= this.brickRowCount * this.brickColumnCount) {
        alert('you won. The ball speed will now increase');
        this.score = 0;
        this.speed++;
        this.initialize();
        this.draw();
      }
    },
    initialize() {
      this.ctx = canvas.getContext('2d');
      this.ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: 10,
        speed: this.speed,
        dx: 4,
        dy: -4
      };
      this.paddle = {
        x: canvas.width / 2 - 40,
        y: canvas.height - 20,
        w: 80,
        h: 10,
        speed: 8,
        dx: 0
      };
      const brickInfo = {
        w: 70,
        h: 20,
        padding: 10,
        offsetX: 45,
        offsetY: 60,
        visible: true
      };
      for (let i = 0; i < this.brickRowCount; i++) {
        this.bricks[i] = [];
        for (let j = 0; j < this.brickColumnCount; j++) {
          const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
          const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
          this.bricks[i][j] = { x, y, ...brickInfo };
        }
      } 
    },
    draw() {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.drawBall();
      this.drawPaddle();
      this.drawScore();
      this.drawBricks();
    },
    update() {
      this.movePaddle();
      this.moveBall();
      this.draw();
      requestAnimationFrame(this.update);
    },
    drawBall() {
      this.ctx.beginPath();
      this.ctx.arc(this.ball.x, this.ball.y, this.ball.size, 0, Math.PI * 2);
      this.ctx.fillStyle = '#0095dd';
      this.ctx.fill();
      this.ctx.closePath();
    },
    drawPaddle() {
      this.ctx.beginPath();
      this.ctx.rect(this.paddle.x, this.paddle.y, this.paddle.w, this.paddle.h);
      this.ctx.fillStyle = '#0095dd';
      this.ctx.fill();
      this.ctx.closePath();
    },
    drawScore() {
      this.ctx.font = '20px Arial';
      this.ctx.fillText(`Score: ${this.score}`, canvas.width - 100, 30);
      this.ctx.fillText(`Speed: ${this.speed}`, 20, 30);
    },
    drawBricks() {
      this.bricks.forEach(column => {
        column.forEach(brick => {
          this.ctx.beginPath();
          this.ctx.rect(brick.x, brick.y, brick.w, brick.h);
          this.ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
          this.ctx.fill();
          this.ctx.closePath();
        });
      });
    },
    keyDown(e) {
      if (e.key === 'Right' || e.key === 'ArrowRight') {
        this.paddle.dx = this.paddle.speed;
      } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        this.paddle.dx = -this.paddle.speed;
      }
    },
    keyUp(e) {
      if (
        e.key === 'Right' ||
        e.key === 'ArrowRight' ||
        e.key === 'Left' ||
        e.key === 'ArrowLeft'
      ) {
        this.paddle.dx = 0;
      }
    }

  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all .5s ease-in-out;
}
.slide-fade-leave-active {
  transition: all .5s ease-in-out;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>