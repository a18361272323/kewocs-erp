<template>
  <canvas ref="canvasRef" class="particle-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let animationId = null
let particles = []
let mouse = { x: 0, y: 0 }

const PARTICLE_COUNT = 60

class Particle {
  constructor(w, h) {
    this.reset(w, h, true)
  }
  reset(w, h, initial) {
    this.x = Math.random() * w
    this.y = initial ? Math.random() * h : h + 20
    this.size = Math.random() * 2 + 0.5
    this.speedY = -(Math.random() * 0.3 + 0.1)
    this.speedX = (Math.random() - 0.5) * 0.2
    this.opacity = Math.random() * 0.3 + 0.05
  }
  update(w, h, mx, my) {
    this.y += this.speedY
    this.x += this.speedX + (mx - w/2) * 0.0002
    if (this.y < -10) this.reset(w, h, false)
    if (this.x < -10) this.x = w + 10
    if (this.x > w + 10) this.x = -10
    this.opacity += (Math.random() - 0.5) * 0.003
    this.opacity = Math.max(0.03, Math.min(0.35, this.opacity))
  }
  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = gba(79, 70, 229, )
    ctx.fill()
  }
}

function init() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle(canvas.width, canvas.height))
  }
  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY })

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(p => { p.update(canvas.width, canvas.height, mouse.x, mouse.y); p.draw(ctx) })
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = gba(79, 70, 229, )
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }
    animationId = requestAnimationFrame(animate)
  }
  animate()

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', resize)
    window.removeEventListener('mousemove', () => {})
  })
}

onMounted(init)
</script>

<style scoped>
.particle-canvas {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.7;
}
</style>
