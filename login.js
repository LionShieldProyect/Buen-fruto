// Login script — carga después del DOM
(function() {
  var btn = document.getElementById('btn-login');
  if (!btn) return;
  
  btn.addEventListener('click', function() {
    var email = document.getElementById('inp-email').value.trim();
    var pass = document.getElementById('inp-pass').value;
    var err = document.getElementById('login-err');
    
    if (!email || !pass) {
      err.style.display = 'block';
      err.textContent = 'Ingresa correo y contraseña';
      return;
    }
    
    if (!window._signIn || !window._auth) {
      err.style.display = 'block';
      err.textContent = 'Cargando Firebase... intenta en 2 segundos';
      return;
    }
    
    err.style.display = 'none';
    btn.textContent = 'Entrando...';
    btn.disabled = true;
    
    window._signIn(window._auth, email, pass)
      .catch(function(e) {
        err.style.display = 'block';
        err.textContent = (e.code === 'auth/invalid-credential' || 
                          e.code === 'auth/wrong-password' || 
                          e.code === 'auth/user-not-found')
          ? 'Correo o contraseña incorrectos' 
          : 'Error: ' + e.message;
        btn.textContent = 'Entrar';
        btn.disabled = false;
      });
  });
})();
