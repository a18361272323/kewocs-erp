<template>
  <canvas ref="canvasRef" class="particle-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let animationId = null
let particles = []
let mouse = { x: 0, y: 0 }
let ctx = null
let w = 0
let h = 0

const PARTICLE_COUNT = 50

function Particle() {
  this.reset(true)
}

Particle.prototype.reset = function(initial) {
  this.x = Math.random() * w
  this.y = initial ? Math.random() * h : h + 20
  this.size = Math.random() * 2 + 0.5
  this.speedY = -(Math.random() * 0.3 + 0.1)
  this.speedX = (Math.random() - 0.5) * 0.2
  this.opacity = Math.random() * 0.25 + 0.04
}

Particle.prototype.update = function() {
  this.y += this.speedY
  this.x += this.speedX + (mouse.x - w / 2) * 0.0002
  if (this.y < -10) this.reset(false)
  if (this.x < -10) this.x = w + 10
  if (this.x > w + 10) this.x = -10
  this.opacity += (Math.random() - 0.5) * 0.003
  if (this.opacity < 0.03) this.opacity = 0.03
  if (this.opacity > 0.3) this.opacity = 0.3
}

Particle.prototype.draw = function() {
  ctx.beginPath()
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(79,70,229,' + this.opacity.toFixed(3) + ')'
  ctx.fill()
}

function resize() {
  var canvas = canvasRef.value
  if (!canvas) return
  w = canvas.width = window.innerWidth
  h = canvas.height = window.innerHeight
  particles = []
  for (var i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle())
  }
}

function animate() {
  if (!ctx) return
  ctx.clearRect(0, 0, w, h)
  for (var i = 0; i < particles.length; i++) {
    particles[i].update()
    particles[i].draw()
  }
  for (var i = 0; i < particles.length; i++) {
    for (var j = i + 1; j < particles.length; j++) {
      var dx = particles[i].x - particles[j].x
      var dy = particles[i].y - particles[j].y
      var dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 100) {
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = 'rgba(79,70,229,' + (0.05 * (1 - dist / 100)).toFixed(3) + ')'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }
  }
  animationId = requestAnimationFrame(animate)
}

onMounted(function() {
  var canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', function(e) { mouse.x = e.clientX; mouse.y = e.clientY })
  animate()
})

onUnmounted(function() {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resize)
})
</script>

<style scoped>
.particle-canvas {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.6;
}
</style>