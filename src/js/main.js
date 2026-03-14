import { initNav } from './nav.js'
import { initReveal } from './reveal.js'
import { initParticles } from './particles.js'
import { initCounters } from './counters.js'
import { initAccordion } from './accordion.js'
import { initContactForm } from './contact-form.js'
import { initMap } from './map.js'

document.addEventListener('DOMContentLoaded', () => {
  initNav()
  initReveal()
  initParticles()
  initCounters()
  initAccordion()
  initContactForm()
})

window.addEventListener('load', initMap)
