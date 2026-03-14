export function initAccordion() {
  document.querySelectorAll('.service-card__toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true'
      const detailsId = btn.getAttribute('aria-controls')
      const details = document.getElementById(detailsId)
      if (!details) return

      btn.setAttribute('aria-expanded', String(!expanded))
      details.classList.toggle('open', !expanded)
      btn.childNodes[0].textContent = expanded ? 'Mehr erfahren' : 'Weniger anzeigen'
    })
  })
}
