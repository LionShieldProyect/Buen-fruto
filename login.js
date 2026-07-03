(function() {
  function tryLogin() {
    var email = document.getElementById('inp-email').value.trim();
    var pass = document.getElementById('inp-pass').value;
    var err = document.getElementById('login-err');
    var btn = document.getElementById('btn-login');

    if (!email || !pass) {
      err.style.display = 'block';
      err.textContent = 'Ingresa correo y contraseña';
      return;
    }

    err.style.display = 'none';
    btn.textContent = 'Entrando...';
    btn.disabled = true;

    // Esperar hasta 5 segundos a que Firebase cargue
    var intentos = 0;
    function intentar() {
      if (window._signIn && window._auth) {
        window._signIn(window._auth, email, pass)
          .catch(function(e) {
            err.style.display = 'block';
            err.textContent = (e.code === 'auth/invalid-credential' || e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found')
              ? 'Correo o contraseña incorrectos' : 'Error: ' + e.message;
            btn.textContent = 'Entrar';
            btn.disabled = false;
          });
      } else if (intentos < 10) {
        intentos++;
        setTimeout(intentar, 500);
      } else {
        err.style.display = 'block';
        err.textContent = 'No se pudo conectar. Verifica tu internet.';
        btn.textContent = 'Entrar';
        btn.disabled = false;
      }
    }
    intentar();
  }

  document.getElementById('btn-login').addEventListener('click', tryLogin);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') tryLogin();
  });
})();
