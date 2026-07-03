(function () {

    console.log("===== LOGIN INICIADO =====");

    const emailInput = document.getElementById("inp-email");
    const passInput = document.getElementById("inp-pass");
    const loginBtn = document.getElementById("btn-login");
    const err = document.getElementById("login-err");

    console.log("Email:", emailInput);
    console.log("Password:", passInput);
    console.log("Botón:", loginBtn);
    console.log("Error:", err);

    if (!emailInput || !passInput || !loginBtn || !err) {
        console.error("❌ Faltan elementos del HTML.");
        return;
    }

    function tryLogin() {

        console.clear();
        console.log("===== NUEVO LOGIN =====");

        const email = emailInput.value.trim();
        const pass = passInput.value;

        console.log("Correo:", email);
        console.log("Password length:", pass.length);

        if (!email || !pass) {

            err.style.display = "block";
            err.textContent = "Ingresa correo y contraseña";

            console.warn("Campos vacíos");

            return;
        }

        err.style.display = "none";

        loginBtn.disabled = true;
        loginBtn.textContent = "Entrando...";

        let intentos = 0;

        function esperarFirebase() {

            console.log("Intento", intentos);

            console.log("window._auth =", window._auth);
            console.log("window._signIn =", window._signIn);

            if (window._auth && window._signIn) {

                console.log("Firebase encontrado.");

                window._signIn(window._auth, email, pass)

                    .then(function (userCredential) {

                        console.log("LOGIN EXITOSO");
                        console.log(userCredential);

                    })

                    .catch(function (e) {

                        console.error("Firebase Error:");
                        console.error(e);

                        err.style.display = "block";
                        err.textContent =
                            e.code + " | " + e.message;

                        loginBtn.disabled = false;
                        loginBtn.textContent = "Entrar";

                    });

            }

            else {

                intentos++;

                if (intentos < 10) {

                    setTimeout(esperarFirebase, 500);

                }

                else {

                    console.error("Firebase nunca cargó.");

                    err.style.display = "block";
                    err.textContent = "Firebase no cargó.";

                    loginBtn.disabled = false;
                    loginBtn.textContent = "Entrar";

                }

            }

        }

        esperarFirebase();

    }

    loginBtn.addEventListener("click", tryLogin);

    document.addEventListener("keydown", function (e) {

        if (e.key === "Enter") {

            tryLogin();

        }

    });

})();
