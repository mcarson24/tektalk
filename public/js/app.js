document.querySelectorAll('.logout_form').forEach(el => {
  el.addEventListener('submit', async e => {
    e.preventDefault()
    
    await fetch('/logout', {
      method: 'DELETE'
    })
    location.href = '/'
  })
})

const update_form = document.querySelector('.update_form')
if (update_form) {
  update_form.addEventListener('submit', async e => {
    e.preventDefault()
    const action = e.target.action
    const edit_path = action.substring(action.indexOf('/posts'))
    const show_path = action.substring(action.indexOf('/posts/'))
    await fetch(edit_path, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: document.querySelector('input[name="title"]').value,
        body: document.querySelector('textarea[name="body"]').value
      }),
    })
    location.replace(show_path)
  })
}