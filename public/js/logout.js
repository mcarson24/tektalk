document.querySelectorAll('.logout_form').forEach(el => {
  el.addEventListener('submit', async e => {
    e.preventDefault()
    
    await fetch('/logout', {
      method: 'DELETE'
    })
    location.href = '/'
  })
})