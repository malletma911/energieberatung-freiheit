export function initCounters() {
  const counters = document.querySelectorAll('.counter__value[data-target]')
  if (!counters.length) return

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3)
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10)
    const suffix = el.dataset.suffix || ''
    const duration = 1400
    const start = performance.now()

    function update(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const value = Math.round(easeOut(progress) * target)
      el.textContent = value + suffix
      if (progress < 1) requestAnimationFrame(update)
    }

    requestAnimationFrame(update)
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 }
  )

  counters.forEach(el => observer.observe(el))
}
