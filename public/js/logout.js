document.querySelectorAll('.logout_form').forEach(el => {
  el.addEventListener('submit', async e => {
    console.log('here')
    e.preventDefault()
    await fetch('/logout', {
      method: 'DELETE'
    })
    location.href = '/'
  })
})