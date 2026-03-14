export function initContactForm() {
  const form = document.getElementById('contactForm')
  if (!form) return

  const submitBtn = document.getElementById('submitBtn')
  const successMsg = document.getElementById('formSuccess')

  form.addEventListener('submit', async e => {
    e.preventDefault()

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    submitBtn.classList.add('loading')
    submitBtn.textContent = 'Wird gesendet...'

    try {
      const data = new FormData(form)
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        form.style.display = 'none'
        successMsg.classList.add('visible')
        successMsg.textContent = '✓ Vielen Dank! Ihre Nachricht wurde gesendet. Ich melde mich schnellstmöglich bei Ihnen.'
      } else {
        throw new Error('Serverfehler')
      }
    } catch {
      submitBtn.classList.remove('loading')
      submitBtn.innerHTML = 'Nachricht senden <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>'
      alert('Es ist ein Fehler aufgetreten. Bitte senden Sie mir eine E-Mail direkt an henning.biebinger@t-online.de')
    }
  })
}
