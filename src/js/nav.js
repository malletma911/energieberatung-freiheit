export function initNav() {
  const nav = document.getElementById('nav')
  const toggle = document.getElementById('navToggle')
  const mobile = document.getElementById('navMobile')
  const links = document.querySelectorAll('.nav__links a')
  const sections = document.querySelectorAll('section[id]')

  // Solidify nav on scroll
  const heroObserver = new IntersectionObserver(
    ([entry]) => {
      nav.classList.toggle('scrolled', !entry.isIntersecting)
    },
    { threshold: 0.1 }
  )
  const hero = document.getElementById('hero')
  if (hero) heroObserver.observe(hero)

  // Mobile menu toggle
  toggle?.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('open')
    mobile.classList.toggle('open', isOpen)
    toggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen')
    document.body.style.overflow = isOpen ? 'hidden' : ''
  })

  // Close mobile menu on link click
  document.querySelectorAll('.nav__mobile-link, .nav__mobile .nav__cta').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open')
      mobile.classList.remove('open')
      document.body.style.overflow = ''
    })
  })

  // Active section highlight
  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${entry.target.id}`
            )
          })
        }
      })
    },
    { rootMargin: '-40% 0px -55% 0px' }
  )
  sections.forEach(s => sectionObserver.observe(s))

  // Smooth scroll offset for sticky nav
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'))
      if (!target) return
      e.preventDefault()
      const offset = nav.offsetHeight + 16
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    })
  })
}
