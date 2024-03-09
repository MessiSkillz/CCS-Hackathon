const authContainer = document.querySelector('.auth-container');

fetch("/api/auth")
  .then((res) => res.text())
  .then((res) => {
    if (res === 'Not authenticated') {
      authContainer.innerHTML = `<button>Login</button>`
    } else {
      authContainer.innerHTML = `<img src="/pfp.png" style="border-radius: 50%; aspect-ratio: 1/1; height: 60px;" />`
    }
  });
