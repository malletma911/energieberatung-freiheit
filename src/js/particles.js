export function initParticles() {
  const canvas = document.getElementById('hero-canvas')
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let W, H, particles, animationId
  const COUNT = 72
  const MAX_DIST = 140
  const AMBER = 'rgba(232,168,56,'
  const BLUE = 'rgba(58,124,165,'

  function resize() {
    W = canvas.width = canvas.offsetWidth
    H = canvas.height = canvas.offsetHeight
  }

  class Particle {
    constructor() { this.reset(true) }
    reset(init = false) {
      this.x = Math.random() * W
      this.y = init ? Math.random() * H : (Math.random() > 0.5 ? -10 : H + 10)
      this.vx = (Math.random() - 0.5) * 0.4
      this.vy = (Math.random() - 0.5) * 0.4
      this.r = Math.random() * 1.8 + 0.8
      this.amber = Math.random() > 0.6
      this.alpha = Math.random() * 0.5 + 0.3
    }
    update() {
      this.x += this.vx
      this.y += this.vy
      if (this.x < -20 || this.x > W + 20 || this.y < -20 || this.y > H + 20) {
        this.reset()
      }
    }
    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
      ctx.fillStyle = this.amber
        ? AMBER + this.alpha + ')'
        : BLUE + this.alpha + ')'
      ctx.fill()
    }
  }

  function init() {
    resize()
    particles = Array.from({ length: COUNT }, () => new Particle())
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j]
        const dx = a.x - b.x, dy = a.y - b.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.12
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = AMBER + alpha + ')'
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      }
    }
  }

  function frame() {
    ctx.clearRect(0, 0, W, H)
    drawConnections()
    particles.forEach(p => { p.update(); p.draw() })
    animationId = requestAnimationFrame(frame)
  }

  init()
  frame()

  const ro = new ResizeObserver(() => {
    cancelAnimationFrame(animationId)
    resize()
    particles.forEach(p => p.reset(true))
    frame()
  })
  ro.observe(canvas)

  // Reduce motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cancelAnimationFrame(animationId)
    // Draw single static frame
    ctx.clearRect(0, 0, W, H)
    particles.forEach(p => p.draw())
  }
}
